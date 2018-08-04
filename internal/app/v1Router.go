package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// V1Router sets up routes for the v1 of the api
func V1Router(g *gin.RouterGroup) {
	g.GET("/healthcheck", healthCheck)
}

func healthCheck(c *gin.Context) {
	q := c.Query("q")
	c.String(http.StatusOK, "Hello %s", q)
}
