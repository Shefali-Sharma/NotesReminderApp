package models

import "time"

// Note Schema
type Note struct {
	ID          uint      `json:"id"`
	Email       string    `json:"email"`
	Subject     string    `json:"subject"`
	Content     string    `json:"content"`
	LastUpdated time.Time `json:"lastupdated"`
	// NoteBookName string    `json:"notebookname"`
}

// NoteBook Schema consists a list of Notes
type NoteBook struct {
	ID          uint      `json:"id"`
	Email       string    `json:"email"`
	Name        string    `json:"subject"`
	Notes       []string  `json:"notes"`
	LastUpdated time.Time `json:"lastupdated"`
}
