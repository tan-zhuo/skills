package main

import (
	"sync"
	"testing"
)

func TestAdd(t *testing.T) {
	store := NewInMemoryStore()

	s := store.Add("Alice", 100)
	if s.ID != 1 {
		t.Errorf("expected ID 1, got %d", s.ID)
	}
	if s.PlayerName != "Alice" {
		t.Errorf("expected Alice, got %s", s.PlayerName)
	}
	if s.Score != 100 {
		t.Errorf("expected 100, got %d", s.Score)
	}

	s2 := store.Add("Bob", 200)
	if s2.ID != 2 {
		t.Errorf("expected ID 2, got %d", s2.ID)
	}
}

func TestTopN(t *testing.T) {
	store := NewInMemoryStore()
	store.Add("Alice", 100)
	store.Add("Bob", 300)
	store.Add("Charlie", 200)

	top := store.TopN(2)
	if len(top) != 2 {
		t.Fatalf("expected 2 results, got %d", len(top))
	}
	if top[0].PlayerName != "Bob" {
		t.Errorf("expected Bob first, got %s", top[0].PlayerName)
	}
	if top[1].PlayerName != "Charlie" {
		t.Errorf("expected Charlie second, got %s", top[1].PlayerName)
	}
}

func TestTopNExceedsCount(t *testing.T) {
	store := NewInMemoryStore()
	store.Add("Alice", 100)

	top := store.TopN(10)
	if len(top) != 1 {
		t.Fatalf("expected 1 result, got %d", len(top))
	}
}

func TestTopNEmpty(t *testing.T) {
	store := NewInMemoryStore()

	top := store.TopN(10)
	if len(top) != 0 {
		t.Fatalf("expected 0 results, got %d", len(top))
	}
}

func TestConcurrentAccess(t *testing.T) {
	store := NewInMemoryStore()
	var wg sync.WaitGroup

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func(score int) {
			defer wg.Done()
			store.Add("player", score)
		}(i)
	}
	wg.Wait()

	top := store.TopN(100)
	if len(top) != 100 {
		t.Errorf("expected 100 scores, got %d", len(top))
	}
}
