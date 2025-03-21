package sharedgo

import (
	"testing"
)

func TestSharedGo(t *testing.T) {
	result := SharedGo("works")
	if result != "SharedGo works" {
		t.Error("Expected SharedGo to append 'works'")
	}
}
