export const config = {
  serverPort: process.env.SERVER_PORT || 4000,
  mongoConnectionString:
    process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/yoripe",
  jwtSecret: process.env.JWT_SECRET || "yoripe-assignment-hans-yulian",
};
