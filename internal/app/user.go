package main

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var secret = []byte("SECRET")

// User contains the information about a user
type User struct {
	ID       int    `json:"ID"`
	Username string `json:"username"`
}

// JwtCustomClaims are the claims stored in a generated jwt
type JwtCustomClaims struct {
	User *User `json:"user"`
	jwt.StandardClaims
}

// RowToUser converts a scannable row to a User
func RowToUser(r Scannable) (*User, error) {
	user := User{}

	err := r.Scan(&user.ID, &user.Username)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUserByID returns the information about the user parameter
func GetUserByID(userID int) (*User, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT ID, username FROM User WHERE ID = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return RowToUser(stmt.QueryRow(userID))
}

// GetUserByUsername returns the information about the user parameter
func GetUserByUsername(username string) (*User, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT ID, username FROM User WHERE username = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return RowToUser(stmt.QueryRow(username))
}

// GetToken aquires a token for the given username, as long as the password is valid
func GetToken(username string, password string) (*User, string, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT ID, username, password FROM User WHERE username = ?")
	if err != nil {
		return nil, "", err
	}
	defer stmt.Close()

	row := stmt.QueryRow(username)
	user := User{}
	var hashedPw string
	err = row.Scan(&user.ID, &user.Username, &hashedPw)
	if err != nil {
		return nil, "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPw), []byte(password))
	if err != nil {
		return nil, "", err
	}

	// Generate the gwt
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, JwtCustomClaims{
		&user,
		jwt.StandardClaims{
			ExpiresAt: time.Now().AddDate(0, 1, 0).Unix(),
		},
	})

	stringToken, err := token.SignedString(secret)
	if err != nil {
		return nil, "", err
	}

	return &user, stringToken, nil
}

// CreateUser will create the new user and return it if successful
func CreateUser(username string, password string) (*User, error) {
	// Generate the hash of the password
	hashPw, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	db := GetDb()

	stmt, err := db.Prepare("INSERT INTO User (username, password) VALUES (?,?)")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(username, hashPw)
	if err != nil {
		return nil, err
	}

	return GetUserByUsername(username)
}

// DecodeToken takes a jwt and converts it into its user
func DecodeToken(tokenString string) (*User, error) {
	token, err := jwt.ParseWithClaims(tokenString, &JwtCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return secret, nil
	})

	if claims, ok := token.Claims.(*JwtCustomClaims); ok && token.Valid {
		return claims.User, nil
	}

	return nil, err
}
