package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware auth
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user *User
		tokenString := c.GetHeader("Authorization")

		if tokenString != "" {
			var err error
			user, err = DecodeToken(tokenString)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
				return
			}
		}

		c.Set("user", user)
		c.Next()
	}
}
