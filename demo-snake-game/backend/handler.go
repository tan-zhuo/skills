package main

import (
	"encoding/json"
	"net/http"
	"strconv"
)

type APIResponse struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

type SubmitScoreRequest struct {
	PlayerName string `json:"player_name"`
	Score      int    `json:"score"`
}

type Handler struct {
	store ScoreStore
}

func NewHandler(store ScoreStore) *Handler {
	return &Handler{store: store}
}

func (h *Handler) SubmitScore(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SubmitScoreRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{
			Code:    40001,
			Message: "invalid request: malformed JSON",
		})
		return
	}

	if req.PlayerName == "" || len(req.PlayerName) > 20 {
		writeJSON(w, http.StatusBadRequest, APIResponse{
			Code:    40001,
			Message: "invalid request: player_name is required and must be 1-20 chars",
		})
		return
	}

	if req.Score < 0 {
		writeJSON(w, http.StatusBadRequest, APIResponse{
			Code:    40001,
			Message: "invalid request: score must be >= 0",
		})
		return
	}

	entry := h.store.Add(req.PlayerName, req.Score)
	writeJSON(w, http.StatusCreated, APIResponse{
		Code:    0,
		Data:    entry,
		Message: "ok",
	})
}

func (h *Handler) GetScores(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	limit := 10
	if l := r.URL.Query().Get("limit"); l != "" {
		parsed, err := strconv.Atoi(l)
		if err != nil || parsed < 1 || parsed > 50 {
			writeJSON(w, http.StatusBadRequest, APIResponse{
				Code:    40002,
				Message: "invalid request: limit must be between 1 and 50",
			})
			return
		}
		limit = parsed
	}

	scores := h.store.TopN(limit)
	writeJSON(w, http.StatusOK, APIResponse{
		Code:    0,
		Data:    scores,
		Message: "ok",
	})
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(v)
}
