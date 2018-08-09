package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

const file = "./shopper.db"

// Scannable is something that can scan
type Scannable interface {
	Scan(dest ...interface{}) error
}

var globalDB *sql.DB

// InitDb adds the schema to the db if required
func InitDb() error {
	db, err := sql.Open("sqlite3", file)
	if err != nil {
		return err
	}

	// Execute each item in schemas
	for _, s := range GetSchemas() {
		_, err = db.Exec(s)
		if err != nil {
			return err
		}
	}

	// Assign to the global version
	globalDB = db

	return nil
}

// GetDb gets the open db connection
// it is assumed that InitDb has been called
func GetDb() *sql.DB {
	return globalDB
}
