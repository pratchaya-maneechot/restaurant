package handlers

import (
	cmdDefs "apps/reservation-service/internal/application/commands/reservation/defs"
	qryDefs "apps/reservation-service/internal/application/queries/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"apps/reservation-service/internal/infrastructure/querybus"
	"context"
	pb "libs/shared-protos/go/generated/reservation_service/proto"
	"time"

	"github.com/google/uuid"
)

type ReservationServer struct {
	pb.UnimplementedReservationServiceServer
	cmdBus *commandbus.CommandBus
	qryBus *querybus.QueryBus
}

func NewReservationServer(cmdBus *commandbus.CommandBus, qryBus *querybus.QueryBus) *ReservationServer {
	return &ReservationServer{cmdBus: cmdBus, qryBus: qryBus}
}

func (s *ReservationServer) CreateReservation(ctx context.Context, req *pb.CreateReservationRequest) (*pb.CreateReservationResponse, error) {
	dateTime, _ := time.Parse(time.RFC3339, req.DateTime)
	reservationId, err := uuid.Parse(req.ReservationId)
	if err != nil {
		return nil, err
	}
	cmd := cmdDefs.CreateReservationCommand{
		ReservationID: reservationId,
		CustomerName:  req.CustomerName,
		TableID:       req.TableId,
		DateTime:      dateTime,
	}
	_, err = s.cmdBus.Dispatch(ctx, cmd)
	if err != nil {
		return nil, err
	}
	return &pb.CreateReservationResponse{ReservationId: req.ReservationId}, nil
}

func (s *ReservationServer) GetReservation(ctx context.Context, req *pb.GetReservationRequest) (*pb.GetReservationResponse, error) {
	reservationId, err := uuid.Parse(req.ReservationId)
	if err != nil {
		return nil, err
	}
	query := qryDefs.GetReservationQuery{ReservationID: reservationId}
	result, err := s.qryBus.Dispatch(ctx, query)
	if err != nil {
		return nil, err
	}
	res := result.(*domain.Reservation)
	return &pb.GetReservationResponse{
		ReservationId: res.ID.String(),
		CustomerName:  res.CustomerName,
		TableId:       res.TableID,
		DateTime:      res.DateTime.Format(time.RFC3339),
		Status:        string(res.Status),
	}, nil
}
