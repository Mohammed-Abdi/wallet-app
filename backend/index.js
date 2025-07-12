import express from "express";
import cors from "cors"; // <-- added this
import { getContacts } from "./scripts/getContacts.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // <-- and this
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Wallet backend is running!");
});

app.get("/api/contacts", async (req, res) => {
  try {
    console.log("Received request at /api/contacts");
    const contacts = await getContacts(5);
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to get contacts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
