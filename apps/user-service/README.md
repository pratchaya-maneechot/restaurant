## **User Service**

The User Service is responsible for managing user registration, updates, and deletion within the Restaurant POS & E-commerce System.

### **Overview**

This service handles all user-related operations, ensuring proper authentication and profile management. It is implemented as a Node.js-based microservice with gRPC for communication and Kafka for event publishing. Upon user registration, it triggers a notification to confirm the action.

### **Responsibilities**

- Register new users (customers and staff).
- Login users (customers and staff).
- Update user details (e.g., name, contact info).
- Delete user accounts when requested.

### **Key Components**

- **Commands:** LoginUser, RegisterUser, UpdateUser, DeleteUser
- **Aggregate:** User - Represents the user entity.
- **Events:** UserRegistered, UserUpdated, UserDeleted

### **Dependencies**

- **Notification Context:** Subscribes to UserRegistered to send confirmation notifications via Email/SMS.

### **Setup**

1. **Build:**
   ```
   cd apps/user-service
   go build -o user-service cmd/main.go
   ```
2. **Run:**
   ```
   ./user-service
   ```

### **Contributing**

Submit pull requests to enhance user management features, improve error handling, or optimize event publishing.
