const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const users = require('../data/users');

// Endpoint para login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
  }

  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Cria token JWT
  const token = jwt.sign(
    { 
      userId: user.id,
      sessionId: uuidv4() // ID único para a sessão
    }, 
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;
