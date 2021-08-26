import express from "express";
import bodyParser from "body-parser";

import vehicleRoutes from "./routes/vehicles.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/vehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from("<h1>🚗Welcome to Vehicle directory!🚘</h1>"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});

export default app;
