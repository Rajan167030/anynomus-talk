#!/bin/bash

# Anonymous Talk - Startup Script
echo "🚀 Starting Anonymous Talk Application..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "node.*server" 2>/dev/null || true
pkill -f "react-scripts" 2>/dev/null || true
sleep 2

# Check if ports are available
if ! check_port 5000; then
    echo "❌ Backend port 5000 is still in use. Please free it manually."
    exit 1
fi

if ! check_port 3000; then
    echo "❌ Frontend port 3000 is still in use. Please free it manually."
    exit 1
fi

# Start the backend server
echo "🔧 Starting backend server on port 5000..."
cd server
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Check if backend started successfully
if ! ps -p $BACKEND_PID > /dev/null; then
    echo "❌ Backend failed to start"
    exit 1
fi

echo "✅ Backend server started successfully (PID: $BACKEND_PID)"

# Start the frontend development server
echo "🎨 Starting frontend development server on port 3000..."
cd client
npm start &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 5

# Check if frontend started successfully
if ! ps -p $FRONTEND_PID > /dev/null; then
    echo "❌ Frontend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "✅ Frontend server started successfully (PID: $FRONTEND_PID)"
echo ""
echo "🎉 Anonymous Talk is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📡 Socket.IO: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Cleanup complete"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop the script
wait