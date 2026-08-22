// src/server.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" })); // allow any origin for dev; tighten in prod
app.use(express.json());

// ------------------- MongoDB connection -------------------
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌ MONGODB_URI is not set – aborting");
  process.exit(1);
}
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ------------------- Generic data model -------------------
const genericSchema = new mongoose.Schema(
  {
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);
const Generic = mongoose.model("Generic", genericSchema);

// ------------------- CRUD API -------------------
app.get("/api/items", async (_req, res) => {
  const items = await Generic.find().sort({ createdAt: -1 });
  res.json(items);
});

app.post("/api/items", async (req, res) => {
  const { data } = req.body;
  const doc = await Generic.create({ data });
  res.status(201).json(doc);
});

app.put("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const doc = await Generic.findByIdAndUpdate(id, { data }, { new: true });
  if (!doc) return res.sendStatus(404);
  res.json(doc);
});

app.delete("/api/items/:id", async (req, res) => {
  const { id } = req.params;
  await Generic.findByIdAndDelete(id);
  res.sendStatus(204);
});

// ------------------- Start server -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
