const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

router.post('/', receitaController.criarReceita);
router.get('/', receitaController.obterReceitas);

module.exports = router;
