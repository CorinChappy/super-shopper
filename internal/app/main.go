package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	if err := InitDb(); err != nil {
		println(err.Error())
		return
	}

	router := gin.Default()

	// Query string parameters are parsed using the existing underlying request object.
	// The request responds to a url matching:  /?firstname=Jane&lastname=Doe
	router.GET("/", func(c *gin.Context) {
		firstname := c.DefaultQuery("firstname", "Guest")
		lastname := c.Query("lastname") // shortcut for c.Request.URL.Query().Get("lastname")

		c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
	})

	apiGroup := router.Group("/api")
	APIRouter(apiGroup)

	router.Run(":8080")
}
