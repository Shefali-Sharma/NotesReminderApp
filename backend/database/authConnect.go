package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// AuthConnect is used for establishing connection with Auth Database
func AuthConnect() {
	dsn := "host=localhost user=root password=root dbname=notesauth port=5434 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Could not connect to authDatabase")
	}

	fmt.Println(db)

}
