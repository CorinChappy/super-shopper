package main

import "time"

// List represents a ist
type List struct {
	ID       int       `json:"ID"`
	GroupID  int       `json:"groupID"`
	Name     string    `json:"name"`
	Created  time.Time `json:"created"`
	Modified time.Time `json:"modified"`
}

func rowToList(r Scannable) (*List, error) {
	list := List{}
	var createdStr string
	var modifiedStr string

	err := r.Scan(&list.ID, &list.GroupID, &list.Name, &createdStr, &modifiedStr)
	if err != nil {
		return nil, err
	}

	created, err := time.Parse(time.RFC3339, createdStr)
	if err != nil {
		return nil, err
	}
	modified, err := time.Parse(time.RFC3339, modifiedStr)
	if err != nil {
		return nil, err
	}

	list.Created = created
	list.Modified = modified

	return &list, nil
}

// GetListByID returns the list for the given ID
func GetListByID(listID int) (*List, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT ID, groupID, name, created, modified FROM List WHERE ID = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return rowToList(stmt.QueryRow(listID))
}

// CreateList creates a new list within the given  group and with the given name
func CreateList(groupID int, name string) (*List, error) {
	db := GetDb()
	now := time.Now().Format(time.RFC3339)

	stmt, err := db.Prepare("INSERT INTO List (groupID, name, created, modified) VALUES (?, ?, ?, ?)")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	result, err := stmt.Exec(groupID, name, now, now)
	if err != nil {
		return nil, err
	}

	listID, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	return GetListByID(int(listID))
}
