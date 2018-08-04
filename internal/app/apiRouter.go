package main

import (
	"github.com/gin-gonic/gin"
)

// APIRouter sets up routes for the api portion of the application
func APIRouter(g *gin.RouterGroup) {
	v1 := g.Group("/v1")
	V1Router(v1)
}
