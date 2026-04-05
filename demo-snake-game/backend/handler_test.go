package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSubmitScoreSuccess(t *testing.T) {
	store := NewInMemoryStore()
	h := NewHandler(store)

	body := `{"player_name":"Alice","score":100}`
	req := httptest.NewRequest(http.MethodPost, "/api/scores", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	h.SubmitScore(w, req)

	if w.Code != http.StatusCreated {
		t.Errorf("expected 201, got %d", w.Code)
	}

	var resp APIResponse
	json.NewDecoder(w.Body).Decode(&resp)
	if resp.Code != 0 {
		t.Errorf("expected code 0, got %d", resp.Code)
	}
}

func TestSubmitScoreEmptyName(t *testing.T) {
	store := NewInMemoryStore()
	h := NewHandler(store)

	body := `{"player_name":"","score":100}`
	req := httptest.NewRequest(http.MethodPost, "/api/scores", bytes.NewBufferString(body))
	w := httptest.NewRecorder()

	h.SubmitScore(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", w.Code)
	}
}

func TestSubmitScoreNegative(t *testing.T) {
	store := NewInMemoryStore()
	h := NewHandler(store)

	body := `{"player_name":"Alice","score":-1}`
	req := httptest.NewRequest(http.MethodPost, "/api/scores", bytes.NewBufferString(body))
	w := httptest.NewRecorder()

	h.SubmitScore(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", w.Code)
	}
}

func TestSubmitScoreNameTooLong(t *testing.T) {
	store := NewInMemoryStore()
	h := NewHandler(store)

	body := `{"player_name":"123456789012345678901","score":100}`
	req := httptest.NewRequest(http.MethodPost, "/api/scores", bytes.NewBufferString(body))
	w := httptest.NewRecorder()

	h.SubmitScore(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", w.Code)
	}
}

func TestSubmitScoreMalformedJSON(t *testing.T) {
	store := NewInMemoryStore()
	h := NewHandler(store)

	req := httptest.NewRequest(http.MethodPost, "/api/scores", bytes.NewBufferString("{invalid"))
	w := httptest.NewRecorder()

	h.SubmitScore(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected 400, got %d", w.Code)
	}
}

func TestGetScoresSuccess(t *testing.T) {
	store := NewInMemoryStore()
	store.Add("Alice", 100)
	store.Add("Bob", 200)
	h := NewHandler(store)

	req := httptest.NewRequest(http.MethodGet, "/api/scores", nil)
	w := httptest.NewRecorder()

	h.GetScores(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	var resp APIResponse
	json.NewDecoder(w.Body).Decode(&resp)
	if resp.Code != 0 {
		t.Errorf("expected code 0, got %d", resp.Code)
	}
}

func TestGetScoresWithLimit(t *testing.T) {
	store := NewInMemoryStore()
	store.Add("Alice", 100)
	store.Add("Bob", 200)
	store.Add("Charlie", 300)
	h := NewHandler(store)

	req := httptest.NewRequest(http.MethodGet, "/api/scores?limit=2", nil)
	w := httptest.NewRecorder()

	h.GetScores(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w.Code)
	}

	var resp APIResponse
	json.NewDecoder(w.Body).Decode(&resp)
	data := resp.Data.([]interface{})
	if len(data) != 2 {
		t.Errorf("expected 2 scores, got %d", len(data))
	}
}

func TestGetScoresInvalidLimit(t *testing.T) {
	store := NewInMemoryStore()
	h := NewHandler(store)

	tests := []struct {
		name  string
		query string
	}{
		{"zero", "?limit=0"},
		{"negative", "?limit=-1"},
		{"too high", "?limit=51"},
		{"non-numeric", "?limit=abc"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/api/scores"+tt.query, nil)
			w := httptest.NewRecorder()

			h.GetScores(w, req)

			if w.Code != http.StatusBadRequest {
				t.Errorf("expected 400, got %d", w.Code)
			}
		})
	}
}

func TestSubmitScoreWrongMethod(t *testing.T) {
	h := NewHandler(NewInMemoryStore())
	req := httptest.NewRequest(http.MethodGet, "/api/scores", nil)
	w := httptest.NewRecorder()

	h.SubmitScore(w, req)

	if w.Code != http.StatusMethodNotAllowed {
		t.Errorf("expected 405, got %d", w.Code)
	}
}
