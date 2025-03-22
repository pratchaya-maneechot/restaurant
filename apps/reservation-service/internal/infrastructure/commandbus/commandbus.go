package commandbus

import (
	"context"
	"fmt"
)

type Command interface {
	Type() string
}

type CommandHandler interface {
	Handle(ctx context.Context, cmd Command) error
}

type CommandBus struct {
	handlers map[string]CommandHandler
}

func NewCommandBus() *CommandBus {
	return &CommandBus{
		handlers: make(map[string]CommandHandler),
	}
}

func (b *CommandBus) Register(cmdType string, handler CommandHandler) {
	b.handlers[cmdType] = handler
}

func (b *CommandBus) Dispatch(ctx context.Context, cmd Command) error {
	handler, exists := b.handlers[cmd.Type()]
	if !exists {
		return fmt.Errorf("no handler for command: %s", cmd.Type())
	}
	return handler.Handle(ctx, cmd)
}
