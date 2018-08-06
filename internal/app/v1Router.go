package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// V1Router sets up routes for the v1 of the api
func V1Router(g *gin.RouterGroup) {
	g.GET("/healthcheck", healthCheck)
	g.GET("/user/:userId", getUser)
}

func healthCheck(c *gin.Context) {
	q := c.Query("q")
	c.String(http.StatusOK, "Hello %s", q)
}

func getUser(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		c.String(http.StatusBadRequest, "Cannot parse userId")
	}

	user, err := GetUser(userID)
	if err != nil {
		c.String(http.StatusBadRequest, "Error getting user %s", err.Error())
	}

	c.JSON(http.StatusOK, user)
}
