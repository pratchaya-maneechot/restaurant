package grpc

import (
	cmdDef "apps/reservation-service/internal/application/commands/reservation/definitions"
	queryDef "apps/reservation-service/internal/application/queries/reservation/definitions"
	"apps/reservation-service/internal/domain"
	command_bus "apps/reservation-service/internal/infrastructure/command_bus"
	query_bus "apps/reservation-service/internal/infrastructure/query_bus"
	"context"
	pb "libs/shared-protos/go/generated/reservation_service/proto"
	"time"
)

type ReservationServer struct {
	pb.UnimplementedReservationServiceServer
	cmdBus *command_bus.CommandBus
	qryBus *query_bus.QueryBus
}

func NewReservationServer(cmdBus *command_bus.CommandBus, qryBus *query_bus.QueryBus) *ReservationServer {
	return &ReservationServer{cmdBus: cmdBus, qryBus: qryBus}
}

func (s *ReservationServer) CreateReservation(ctx context.Context, req *pb.CreateReservationRequest) (*pb.CreateReservationResponse, error) {
	dateTime, _ := time.Parse(time.RFC3339, req.DateTime)
	cmd := cmdDef.CreateReservationCommand{
		ReservationID: req.ReservationId,
		CustomerName:  req.CustomerName,
		TableID:       req.TableId,
		DateTime:      dateTime,
	}
	if err := s.cmdBus.Dispatch(ctx, cmd); err != nil {
		return nil, err
	}
	return &pb.CreateReservationResponse{ReservationId: req.ReservationId}, nil
}

func (s *ReservationServer) GetReservation(ctx context.Context, req *pb.GetReservationRequest) (*pb.GetReservationResponse, error) {
	query := queryDef.GetReservationQuery{ReservationID: req.ReservationId}
	result, err := s.qryBus.Dispatch(ctx, query)
	if err != nil {
		return nil, err
	}
	res := result.(*domain.Reservation)
	return &pb.GetReservationResponse{
		ReservationId: res.ID,
		CustomerName:  res.CustomerName,
		TableId:       res.TableID,
		DateTime:      res.DateTime.Format(time.RFC3339),
		Status:        string(res.Status),
	}, nil
}
