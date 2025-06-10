const express = require('express');
const router = express.Router();
const users = require('../data/users');

// Endpoint para listar todos os usuários (apenas admin)
router.get('/', (req, res) => {
  if (req.user.perfil !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Requer perfil de administrador.' });
  }
  
  res.json({ data: users });
});

// Endpoint para obter dados do usuário logado
router.get('/me', (req, res) => {
  res.json({ 
    data: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      perfil: req.user.perfil
    }
  });
});

module.exports = router;
