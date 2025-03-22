package handlers

import (
	cmdDefs "apps/reservation-service/internal/application/commands/reservation/defs"
	qryDefs "apps/reservation-service/internal/application/queries/reservation/defs"
	"apps/reservation-service/internal/domain"
	"apps/reservation-service/internal/infrastructure/commandbus"
	"apps/reservation-service/internal/infrastructure/querybus"
	"context"
	pb "libs/shared-protos/go/generated/reservation/proto"
	"time"

	"github.com/google/uuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type ReservationServer struct {
	pb.UnimplementedReservationServiceServer
	cmdBus *commandbus.CommandBus
	qryBus *querybus.QueryBus
}

func NewReservationServer(cmdBus *commandbus.CommandBus, qryBus *querybus.QueryBus) *ReservationServer {
	return &ReservationServer{cmdBus: cmdBus, qryBus: qryBus}
}

func (s *ReservationServer) CreateReservation(ctx context.Context, req *pb.CreateReservationRequest) (*pb.ReservationResponse, error) {
	dateTime := req.DateTime.AsTime()

	cmd := cmdDefs.CreateReservationCommand{
		CustomerName: req.CustomerName,
		TableID:      req.TableId,
		DateTime:     dateTime,
	}

	result, err := s.cmdBus.Dispatch(ctx, cmd)
	if err != nil {
		return nil, err
	}

	res := result.(*domain.Reservation)

	return toReservationResponse(res), nil
}

func (s *ReservationServer) GetReservation(ctx context.Context, req *pb.GetReservationRequest) (*pb.ReservationResponse, error) {
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

	return toReservationResponse(res), nil
}

func (s *ReservationServer) CancelReservation(ctx context.Context, req *pb.CancelReservationRequest) (*emptypb.Empty, error) {
	reservationId, err := uuid.Parse(req.ReservationId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "Invalid field reservationId")
	}

	cmd := cmdDefs.CancelReservationCommand{ReservationID: reservationId}
	_, err = s.cmdBus.Dispatch(ctx, cmd)
	if err != nil {
		return nil, err
	}

	return &emptypb.Empty{}, nil
}

func (s *ReservationServer) UpdateReservation(ctx context.Context, req *pb.UpdateReservationRequest) (*pb.ReservationResponse, error) {
	reservationId, err := uuid.Parse(req.ReservationId)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid reservation ID format")
	}

	dateTime := req.DateTime.AsTime()
	if dateTime.Before(time.Now()) {
		return nil, status.Error(codes.InvalidArgument, "new date must be in the future")
	}

	cmd := cmdDefs.UpdateReservationCommand{
		ReservationID: reservationId,
		DateTime:      dateTime,
	}

	updatedResult, err := s.cmdBus.Dispatch(ctx, cmd)
	if err != nil {
		return nil, status.Error(codes.Internal, "failed to update reservation: "+err.Error())
	}

	res := updatedResult.(*domain.Reservation)
	return toReservationResponse(res), nil
}

func (s *ReservationServer) ListReservations(ctx context.Context, req *pb.ListReservationsRequest) (*pb.ListReservationsResponse, error) {
	query := qryDefs.GetReservationsQuery{}
	result, err := s.qryBus.Dispatch(ctx, query)
	if err != nil {
		return nil, status.Error(codes.Internal, "failed to fetch reservations: "+err.Error())
	}

	reservations := result.([]*domain.Reservation)
	response := &pb.ListReservationsResponse{
		Reservations: make([]*pb.ReservationResponse, len(reservations)),
	}

	for i, res := range reservations {
		response.Reservations[i] = toReservationResponse(res)
	}

	return response, nil
}

func (s *ReservationServer) GetAvailableTables(ctx context.Context, req *pb.GetAvailableTablesRequest) (*pb.GetAvailableTablesResponse, error) {
	dateTime := req.DateTime.AsTime()
	if dateTime.Before(time.Now()) {
		return nil, status.Error(codes.InvalidArgument, "date must be in the future")
	}

	query := qryDefs.GetAvailableTablesQuery{
		DateTime: dateTime,
	}

	result, err := s.qryBus.Dispatch(ctx, query)
	if err != nil {
		return nil, status.Error(codes.Internal, "failed to fetch available tables: "+err.Error())
	}

	tableIDs := result.([]string)
	return &pb.GetAvailableTablesResponse{
		TableIds: tableIDs,
	}, nil
}

func toReservationResponse(res *domain.Reservation) *pb.ReservationResponse {
	var status pb.ReservationStatus
	switch res.Status {
	case domain.StatusPending:
		status = pb.ReservationStatus_PENDING
	case domain.StatusConfirmed:
		status = pb.ReservationStatus_CONFIRMED
	case domain.StatusCanceled:
		status = pb.ReservationStatus_CANCELED
	default:
		status = pb.ReservationStatus_PENDING
	}

	return &pb.ReservationResponse{
		Id:           res.ID.String(),
		CustomerName: res.CustomerName,
		TableId:      res.TableID,
		DateTime:     timestamppb.New(res.DateTime),
		Status:       status,
		CreatedAt:    timestamppb.New(res.CreatedAt),
	}
}
