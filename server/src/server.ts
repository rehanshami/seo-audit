import express from "express";

const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
