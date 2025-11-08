const express = require('express');
const router = express.Router();
const betController = require('../controllers/BetController');

router.post('/', betController.createBet);
router.get('/', betController.getAllBets);
router.get('/:id', betController.getBetById);
router.put('/:id', betController.updateBet);
router.delete('/:id', betController.deleteBet);

module.exports = router;
