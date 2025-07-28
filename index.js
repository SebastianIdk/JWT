require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    const payload = { sub: username, role: "admin" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return res.json({ token });
  }
  res.status(401).json({ message: "Credenciales inválidas" });
});

// Middleware (Verificar JWT)
function auth(req, res, next) {
  const h = req.headers.authorization;
  if (!h || !h.startsWith('Bearer ')) return res.status(401).end();
  const token = h.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
}

// Ruta protegida
app.get('/protegido', auth, (req, res) => {
  res.json({ message: `Hola ${req.user.sub}, accediste correctamente` });
});

app.listen(3000, () => console.log('Server en http://localhost:3000'));
