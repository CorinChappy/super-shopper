package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

const file = "./shopper.db"

// InitDb adds the schema to the db if required
func InitDb() error {
	db, err := GetDb()
	if err != nil {
		return err
	}
	defer db.Close()

	// Execute each item in schemas
	for _, s := range GetSchemas() {
		_, err = db.Exec(s)
		if err != nil {
			return err
		}
	}

	return nil
}

// GetDb opens a database connection
func GetDb() (*sql.DB, error) {
	return sql.Open("sqlite3", file)
}
