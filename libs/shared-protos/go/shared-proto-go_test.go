package sharedprotogo

import (
	"testing"
)

func TestSharedProtoGo(t *testing.T) {
	result := SharedProtoGo("works")
	if result != "SharedProtoGo works" {
		t.Error("Expected SharedProtoGo to append 'works'")
	}
}
