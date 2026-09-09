import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "..", "database", "db.json");

app.use(cors());
app.use(express.json());

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET todos os usuários
app.get("/users", (req, res) => {
  const db = readDB();

  let users = db.users;

  if (req.query.email) {
    users = users.filter((user) => user.email === req.query.email);
  }

  res.json(users);
});

// GET usuário por ID
app.get("/users/:id", (req, res) => {
  const db = readDB();

  const user = db.users.find((user) => user.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado",
    });
  }

  res.json(user);
});

// POST criar usuário
app.post("/users", (req, res) => {
  const db = readDB();

  const newUser = {
    ...req.body,
  };

  db.users.push(newUser);

  writeDB(db);

  res.status(201).json(newUser);
});

// PATCH atualizar usuário
app.patch("/users/:id", (req, res) => {
  const db = readDB();

  const userIndex = db.users.findIndex((user) => user.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "Usuário não encontrado",
    });
  }

  db.users[userIndex] = {
    ...db.users[userIndex],
    ...req.body,
  };

  writeDB(db);

  res.json(db.users[userIndex]);
});

// DELETE usuário
app.delete("/users/:id", (req, res) => {
  const db = readDB();

  const userIndex = db.users.findIndex((user) => user.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "Usuário não encontrado",
    });
  }

  const deletedUser = db.users[userIndex];

  db.users.splice(userIndex, 1);

  writeDB(db);

  res.json(deletedUser);
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
