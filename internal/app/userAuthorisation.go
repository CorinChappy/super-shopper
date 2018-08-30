package main

import "github.com/gin-gonic/gin"

// GetLoggedInUser gets the logged in user from gin context
func GetLoggedInUser(c *gin.Context) *User {
	u, exists := c.Get("user")
	user, ok := u.(*User)
	if !exists || !ok || user == nil {
		return nil
	}

	return user
}

// IsLoggedIn returns true if the user is logged in (not null)
func (user *User) IsLoggedIn() bool {
	return user != nil
}

// IsInGroup returns true if a given user is in the given group
func (user *User) IsInGroup(groupID int) (bool, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT 1 FROM GroupUser WHERE groupID = ? AND userID = ?")
	if err != nil {
		return false, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(groupID, user.ID)
	if err != nil {
		return false, err
	}
	defer rows.Close()

	// rows.Next will return true if there is a result, therefore is a row
	return rows.Next(), nil
}
