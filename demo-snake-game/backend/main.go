package main

import (
	"fmt"
	"log"
	"net/http"
)

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next(w, r)
	}
}

func main() {
	store := NewInMemoryStore()
	handler := NewHandler(store)

	mux := http.NewServeMux()
	mux.HandleFunc("/api/scores", corsMiddleware(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			handler.GetScores(w, r)
		case http.MethodPost:
			handler.SubmitScore(w, r)
		case http.MethodOptions:
			w.WriteHeader(http.StatusNoContent)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		}
	}))

	addr := ":8080"
	fmt.Printf("Snake Leaderboard API running on %s\n", addr)
	log.Fatal(http.ListenAndServe(addr, mux))
}
