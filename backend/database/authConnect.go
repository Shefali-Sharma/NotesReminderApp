package database

import (
	"notes-reminder-app/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// AuthConnect is used for establishing connection with Auth Database
func AuthConnect() {
	dsn := "host=localhost user=root password=root dbname=notesauth port=5434 sslmode=disable"
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Could not connect to authDatabase")
	}

	DB = connection

	connection.AutoMigrate(&models.User{}, &models.PasswordReset{})

}
