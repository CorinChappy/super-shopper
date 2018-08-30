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
