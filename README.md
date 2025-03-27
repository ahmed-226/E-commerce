# E-commerce Microservices Project

## Project Overview

This project is a microservices-based e-commerce platform designed to handle various aspects of an online store. Each service is independently deployable and scalable, enabling a modular architecture. The platform includes the following features:

- **Authentication and Authorization**: Secure user authentication with JWT tokens and role-based access control.
- **Product Catalog**: Manage product listings, including creation, updates, and retrieval.
- **Order Management**: Handle customer orders, including order creation, status updates, and history.
- **Payment Processing**: Simulate payment workflows and integrate with external payment gateways.
- **Shipping Management**: Track shipments and update order statuses upon shipping.
- **User Management**: Manage user profiles, including updates to user information.
- **Analytics**: Collect and analyze data for business insights, such as order statistics.
- **API Gateway**: Centralized entry point for routing requests to the appropriate services.
- **Database Integration**: MongoDB is used for persistent storage across services.
- **Event-Driven Architecture**: Services communicate asynchronously using events for better decoupling.
- **Scalability**: Each service can be scaled independently based on demand.
- **Monitoring**: Includes a visualizer for monitoring service health and performance.

## Project Structure

- `api-gateway/` - API Gateway service
- `auth-service/` - Authentication service  
- `catalog-service/` - Product catalog service
- `order-service/` - Order management service
- `payment-service/` - Payment processing service
- `shipping-service/` - Shipping service
- `user-service/` - User management service
- `analytics-service/` - Analytics service

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Start all services:
```bash
npm run start:all
# or
./run-services.sh start
```

3. Stop all services:
```bash
./run-services.sh stop
```

4. Check the status of services:
```bash
./run-services.sh status
```

## Features by Service

### API Gateway
- Centralized routing for all microservices.
- Load balancing and request forwarding.
- Health check endpoint: `/health`.

### Auth Service
- User registration and login.
- Password hashing with bcrypt.
- JWT-based authentication.
- Token validation.

### Catalog Service
- Manage product listings (CRUD operations).
- Retrieve product details.

### Order Service
- Create and manage customer orders.
- Update order statuses based on payment and shipping events.

### Payment Service
- Simulate payment processing.
- Update order status upon payment completion.

### Shipping Service
- Track shipments and generate tracking numbers.
- Update order status upon shipment.

### User Service
- Manage user profiles.
- Update user information.

### Analytics Service
- Collect and store events from other services.
- Generate order statistics and business insights.

## Environment Variables

The following environment variables are used in the project:

- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for signing JWT tokens.
- `API_RATE_LIMIT`: Maximum number of API requests allowed per minute.

## Testing

A `test-api.http` file is included for testing the API endpoints using tools like [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) in Visual Studio Code.

## Monitoring

A visualizer is included to monitor the health and performance of all services. It runs on port `8080` and can be accessed via `http://localhost:8080`.

## Future Enhancements

- Implement rate limiting for API endpoints.
- Add support for distributed tracing.
- Integrate with external payment gateways.
- Add more advanced analytics and reporting features.