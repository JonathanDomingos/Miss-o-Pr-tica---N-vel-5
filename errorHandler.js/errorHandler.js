module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  
  res.status(500).json({ message: 'Ocorreu um erro no servidor' });
};