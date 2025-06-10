const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Validação dos parâmetros para prevenir injection
const validateParams = [
  check('empresa').isString().trim().escape(),
  check('inicio').isISO8601().toDate()
];

// Endpoint para buscar contratos (apenas admin)
router.get('/', validateParams, (req, res) => {
  if (req.user.perfil !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Requer perfil de administrador.' });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { empresa, inicio } = req.query;
  const result = getContracts(empresa, inicio);
  
  if (result.length === 0) {
    return res.status(404).json({ message: 'Nenhum contrato encontrado' });
  }
  
  res.json({ data: result });
});

// Função segura para buscar contratos
function getContracts(empresa, inicio) {
  // Simulação de consulta segura ao banco de dados
  // Em um sistema real, usaríamos um ORM ou prepared statements
  const repository = new Repository();
  const query = 'SELECT * FROM contracts WHERE empresa = ? AND data_inicio = ?';
  const result = repository.execute(query, [empresa, inicio]);
  
  return result;
}

class Repository {
  execute(query, params) {
    // Simulação de consulta segura com parâmetros
    console.log(`Executando query segura: ${query} com parâmetros:`, params);
    return []; // Retorno simulado
  }
}

module.exports = router;
