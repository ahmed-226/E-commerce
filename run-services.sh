#!/bin/bash
ls node_modules/http-proxy-middleware
export NODE_PATH=$(pwd)/node_modules
# Define services and their ports
services=(
  "api-gateway:3000"
  "auth-service:3001"
  "catalog-service:3002"
  "order-service:3003"
  "payment-service:3004"
  "shipping-service:3005"
  "user-service:3006"
  "analytics-service:3007"
)

# Function to start services
start_services() {
  echo "Starting all microservices..."
  for service in "${services[@]}"; do
    folder="${service%%:*}"
    port="${service##*:}"
    echo "Starting $folder on port $port"
    (cd "$folder" && nohup node index.js > "$folder.log" 2>&1 &)
  done
  echo "All services started. Check individual .log files in each folder."
}

# Function to stop services
stop_services() {
  echo "Stopping all microservices..."
  taskkill -f -im node.exe
  echo "All services stopped."
}

# Windows-compatible status check
status_services() {
  echo "Service status:"
  for service in "${services[@]}"; do
    folder="${service%%:*}"
    port="${service##*:}"
    if netstat -ano | grep "LISTENING" | grep ":$port " > /dev/null; then
      echo "✅ $folder (port $port) is running"
    else
      echo "❌ $folder (port $port) is not running"
    fi
  done
}

# Function to restart services
restart_services() {
  stop_services
  start_services
}

# Main control
case "$1" in
  start)
    start_services
    ;;
  stop)
    stop_services
    ;;
  restart)
    restart_services
    ;;
  status)
    status_services
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status}"
    exit 1
esac

exit 0