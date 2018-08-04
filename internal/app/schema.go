package main

// GetSchemas GetSchemas
func GetSchemas() []string {
	return []string{
		`CREATE TABLE IF NOT EXISTS User (
			ID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			username	TEXT NOT NULL UNIQUE,
			password	TEXT NOT NULL
		);`,
	}
}
