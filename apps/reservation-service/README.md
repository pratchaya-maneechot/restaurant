## **Reservation Service**

The Reservation Service manages table reservations for the Restaurant POS & E-commerce System.

### **Overview**

This Go-based microservice handles table bookings, updates, and cancellations. It syncs reservation details with the Order Context and sends notifications via the Notification Context. It uses gRPC for communication and Kafka for event-driven interactions.

### **Responsibilities**

- Create table reservations for customers.
- Update reservation details (e.g., time, party size).
- Cancel reservations when requested.
- Link reservations to orders where applicable.

### **Key Components**

- **Commands:** CreateReservation, UpdateReservation, CancelReservation
- **Aggregate:** Reservation - Represents the reservation entity.
- **Events:** ReservationCreated, ReservationUpdated, ReservationCanceled, ReservationFailed

### **Dependencies**

- **Notification Context:** Subscribes to ReservationCreated and ReservationCanceled for customer notifications via Email/SMS.
- **Order Context:** Subscribes to ReservationCreated to associate reservations with orders.

### **Setup**

1. **Build:**
   ```
   pnpm exec nx run reservation-service:build
   ```
2. **Run:**
   ```
   ./dist/apps/reservation-service
   ```
