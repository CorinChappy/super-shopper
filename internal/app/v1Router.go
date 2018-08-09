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
	g.POST("/login", login)
	g.POST("/signup", signup)
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

	user, err := GetUserByID(userID)
	if err != nil {
		c.String(http.StatusBadRequest, "Error getting user %s", err.Error())
	}

	c.JSON(http.StatusOK, user)
}

type loginParams struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

func login(c *gin.Context) {
	var json loginParams

	err := c.ShouldBind(&json)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Try to obtain a token
	user, token, err := GetToken(json.Username, json.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  user,
	})
}

func signup(c *gin.Context) {
	// We can reuse login for signup
	var json loginParams

	err := c.ShouldBind(&json)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := CreateUser(json.Username, json.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, user)
}
