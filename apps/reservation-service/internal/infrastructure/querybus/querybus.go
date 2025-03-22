package querybus

import (
	"context"
	"fmt"
)

type Query interface {
	Type() string
}

type QueryHandler interface {
	Handle(ctx context.Context, query Query) (interface{}, error)
}

type QueryBus struct {
	handlers map[string]QueryHandler
}

func NewQueryBus() *QueryBus {
	return &QueryBus{
		handlers: make(map[string]QueryHandler),
	}
}

func (b *QueryBus) Register(queryType string, handler QueryHandler) {
	b.handlers[queryType] = handler
}

func (b *QueryBus) Dispatch(ctx context.Context, query Query) (interface{}, error) {
	handler, exists := b.handlers[query.Type()]
	if !exists {
		return nil, fmt.Errorf("no handler for query: %s", query.Type())
	}
	return handler.Handle(ctx, query)
}
