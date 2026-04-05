package main

import (
	"sort"
	"sync"
	"time"
)

type Score struct {
	ID         int       `json:"id"`
	PlayerName string    `json:"player_name"`
	Score      int       `json:"score"`
	CreatedAt  time.Time `json:"created_at"`
}

type ScoreStore interface {
	Add(playerName string, score int) Score
	TopN(n int) []Score
}

type InMemoryStore struct {
	mu     sync.RWMutex
	scores []Score
	nextID int
}

func NewInMemoryStore() *InMemoryStore {
	return &InMemoryStore{nextID: 1}
}

func (s *InMemoryStore) Add(playerName string, score int) Score {
	s.mu.Lock()
	defer s.mu.Unlock()

	entry := Score{
		ID:         s.nextID,
		PlayerName: playerName,
		Score:      score,
		CreatedAt:  time.Now(),
	}
	s.nextID++
	s.scores = append(s.scores, entry)
	return entry
}

func (s *InMemoryStore) TopN(n int) []Score {
	s.mu.RLock()
	defer s.mu.RUnlock()

	sorted := make([]Score, len(s.scores))
	copy(sorted, s.scores)
	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].Score > sorted[j].Score
	})

	if n > len(sorted) {
		n = len(sorted)
	}
	return sorted[:n]
}
