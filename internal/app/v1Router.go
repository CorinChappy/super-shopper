package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// V1Router sets up routes for the v1 of the api
func V1Router(g *gin.RouterGroup) {
	g.Use(AuthMiddleware())
	g.GET("/healthcheck", healthCheck)

	// User functions
	g.GET("/user/:userId", getUser)
	g.POST("/login", login)
	g.POST("/signup", signup)

	// Group functions
	g.GET("/group/:groupId", getGroup)
	g.GET("/group/:groupId/users", getGroupUsers)
	g.POST("/group/create", createGroup)
	g.PUT("/group/:groupId/users", addGroupUsers)
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

func getGroup(c *gin.Context) {
	groupID, err := strconv.Atoi(c.Param("groupId"))
	if err != nil {
		c.String(http.StatusBadRequest, "Cannot parse groupId")
		return
	}

	group, err := GetGroupByID(groupID)
	if err != nil {
		c.String(http.StatusBadRequest, "Error getting group %s", err.Error())
		return
	}

	c.JSON(http.StatusOK, group)
}

func getGroupUsers(c *gin.Context) {
	groupID, err := strconv.Atoi(c.Param("groupId"))
	if err != nil {
		c.String(http.StatusBadRequest, "Cannot parse groupId")
		return
	}

	users, err := GetUsersForGroupID(groupID)
	if err != nil {
		c.String(http.StatusBadRequest, "Error getting users for group %s", err.Error())
	}

	c.JSON(http.StatusOK, users)
}

type createGroupParams struct {
	Name string `form:"name" json:"name" binding:"required"`
}

func createGroup(c *gin.Context) {
	u, exists := c.Get("user")
	user := u.(*User)
	if !exists || user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "you must be logged in to do that"})
		return
	}

	var json createGroupParams

	err := c.ShouldBind(&json)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	group, err := CreateGroup(user.ID, json.Name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, group)
}

type addUsersToGroupParams struct {
	UserIDs []int `form:"userIDs" json:"userIDs" binding:"required"`
}

func addGroupUsers(c *gin.Context) {
	u, exists := c.Get("user")
	user := u.(*User)
	if !exists || user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "you must be logged in to do that"})
		return
	}

	groupID, err := strconv.Atoi(c.Param("groupId"))
	if err != nil {
		c.String(http.StatusBadRequest, "Cannot parse groupId")
	}

	var json addUsersToGroupParams

	err = c.ShouldBind(&json)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = AddUsersByGroupID(groupID, json.UserIDs)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
