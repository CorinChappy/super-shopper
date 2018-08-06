package main

// User contains the information about a user
type User struct {
	ID       int    `json:"ID"`
	Username string `json:"username"`
}

func rowToUser(r Scannable) (*User, error) {
	user := User{}

	err := r.Scan(&user.ID, &user.Username)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUser returns the information about the user parameter
func GetUser(userID int) (*User, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT ID, username FROM User WHERE ID = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return rowToUser(stmt.QueryRow(userID))
}
