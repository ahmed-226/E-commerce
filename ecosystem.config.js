module.exports = {
    apps: [
      {
        name: "api-gateway",
        script: "./api-gateway/index.js",
        watch: true,
        env: {
          PORT: 3000
        }
      },
      {
        name: "auth-service",
        script: "./auth-service/index.js",
        watch: true,
        env: {
          PORT: 3001
        }
      },
      {
        name: "catalog-service",
        script: "./catalog-service/index.js",
        watch: true,
        env: {
          PORT: 3002
        }
      },
      {
        name: "order-service",
        script: "./order-service/index.js",
        watch: true,
        env: {
          PORT: 3003
        }
      },
      {
        name: "payment-service",
        script: "./payment-service/index.js",
        watch: true,
        env: {
          PORT: 3004
        }
      },
      {
        name: "shipping-service",
        script: "./shipping-service/index.js",
        watch: true,
        env: {
          PORT: 3005
        }
      },
      {
        name: "user-service",
        script: "./user-service/index.js",
        watch: true,
        env: {
          PORT: 3006
        }
      },
      {
        name: "analytics-service",
        script: "./analytics-service/index.js",
        watch: true,
        env: {
          PORT: 3007
        }
      }
    ]
  };