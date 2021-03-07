package models

// Note Schema
type Note struct {
	ID      uint   `json:"id"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Content string `json:"content"`
}

// NoteBook Schema consists a list of Notes
type NoteBook struct {
	ID    uint   `json:"id"`
	Email string `json:"email"`
	Name  string `json:"subject"`
	Notes []Note `json:"notes"`
}
