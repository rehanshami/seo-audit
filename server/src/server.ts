import express from "express";
import { auditPage } from "./services/auditService.js";
import auditRoute from "./routes/auditRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";

const app = express();
app.use(express.json());

app.use(requestLogger);

app.use("/api/audit", auditRoute);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Placeholder route for audit endpoint
app.get("/audit", (req, res) => {
  res.status(501).json({ message: "Audit endpoint not implemented yet" });
});

app.get("/test-audit", async (req, res) => {
  try {
    const result = await auditPage("https://sparkhealth.nz");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to audit page" });
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
