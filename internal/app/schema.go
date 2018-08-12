package main

// GetSchemas GetSchemas
func GetSchemas() []string {
	return []string{
		`CREATE TABLE IF NOT EXISTS User (
			ID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			username	TEXT NOT NULL UNIQUE,
			password	TEXT NOT NULL
		);`,
		`CREATE TABLE IF NOT EXISTS 'Group' (
			ID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name	TEXT NOT NULL
		);`,
		`CREATE TABLE IF NOT EXISTS GroupUser (
			groupID	INTEGER NOT NULL,
			userID	INTEGER NOT NULL,
			FOREIGN KEY(groupID) REFERENCES 'Group'(ID) ON DELETE CASCADE,
			PRIMARY KEY(groupID,userID),
			FOREIGN KEY(userID) REFERENCES 'User'(ID) ON DELETE CASCADE
		);`,
	}
}
