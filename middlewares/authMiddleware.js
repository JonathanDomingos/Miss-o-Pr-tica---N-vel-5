const jwt = require('jsonwebtoken');
const users = require('../data/users');

module.exports = (req, res, next) => {
  try {
    // Verifica se o token está no header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token de acesso não fornecido' });
    }

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verifica se o usuário ainda existe
    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Adiciona o usuário à requisição para uso posterior
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
};