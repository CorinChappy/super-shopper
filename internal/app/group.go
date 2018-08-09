package main

// Group represents a group
type Group struct {
	ID   int    `json:"ID"`
	Name string `json:"name"`
}

func rowToGroup(r Scannable) (*Group, error) {
	group := Group{}

	err := r.Scan(&group.ID, &group.Name)
	if err != nil {
		return nil, err
	}

	return &group, nil
}

// GetGroupByID returns the group for the given ID
func GetGroupByID(groupID int) (*Group, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT ID, name FROM Group WHERE ID = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	return rowToGroup(stmt.QueryRow(groupID))
}

// GetUsersForGroupID gets the users asscoiated with this group ID
func GetUsersForGroupID(groupID int) ([]*User, error) {
	db := GetDb()

	stmt, err := db.Prepare("SELECT u.ID, u.username FROM User u INNER JOIN GroupUser g ON g.userID = u.ID WHERE g.groupID = ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(groupID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := make([]*User, 0)
	for rows.Next() {
		user, err := RowToUser(rows)
		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil
}

// GetUsersForGroup gets the users asscoiated with this group
func (group *Group) GetUsersForGroup() ([]*User, error) {
	return GetUsersForGroupID(group.ID)
}

// CreateGroup creates a new group with the given user
func CreateGroup(ownerID int, name string) (*Group, error) {
	db := GetDb()

	stmt, err := db.Prepare("INSERT INTO Group (name) VALUES (?)")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	result, err := stmt.Exec(name)
	if err != nil {
		return nil, err
	}

	groupID, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	stmt, err = db.Prepare("INSERT INTO GroupUser (groupID, userID) VALUES (?, ?)")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	_, err = stmt.Exec(groupID, ownerID)
	if err != nil {
		return nil, err
	}

	return GetGroupByID(int(groupID))
}
