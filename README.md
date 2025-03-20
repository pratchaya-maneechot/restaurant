**Restaurant System**

This project is a microservices-based system designed for restaurant management, point-of-sale (POS), and e-commerce operations. It follows Domain-Driven Design (DDD) principles with Bounded Contexts to ensure modularity, scalability, and maintainability. The system uses an Event-Driven Architecture with Kafka as the message broker for asynchronous communication between services.

## **Overview**

This system integrates restaurant reservation, in-store POS, and e-commerce functionalities into a cohesive platform. Each Bounded Context represents a distinct domain with its own aggregates, commands, events, and policies. The interactions between contexts are managed through domain events, ensuring loose coupling and eventual consistency.

The project is structured as an Nx monorepo with individual Go-based microservices for each context and a Node.js-based GraphQL Gateway for client interaction. Shared libraries handle types, utilities, and protocol buffers for gRPC communication.

## **Key Technologies**

- Backend: Go (microservices), Node.js (GraphQL Gateway)
- Event Bus: Kafka
- Monorepo: Nx
- Communication: gRPC, RESTful API and GraphQL

## **Bounded Contexts**

- User Context: [./apps/user-service/README.md](./apps/user-service/README.md)
- Reservation Context: [./apps/reservation-service/README.md](./apps/reservation-service/README.md)
- Product Catalog Context: `TODO`
- Inventory Context: `TODO`
- Order Context: `TODO`
- Payment Context: `TODO`
- Notification Context: `TODO`

## **Setup Instructions**

1. **Prerequisites:**
   - Go (>= 1.20)
   - Node.js (>= 18)
   - Docker
   - Kafka (via Docker Compose)
2. **Clone the Repository:**
   ```
   git clone <repository-url>
   cd restaurant-pos-ecommerce
   ```
3. **Install Dependencies:**
   ```
   npm install
   ```
4. **Run Services:**
   - Start Kafka and dependencies:
     ```
     docker-compose -f docker-compose.yml up -d
     ```
   - Build and run all services:
     ```
     nx run-many --target=serve --all
     ```
5. **Access GraphQL Gateway:**
   - URL: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## **Contributing**

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "feat(scope): add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.
