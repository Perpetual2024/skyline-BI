const express = require('express');
const router = express.Router();
const roundController = require('../controllers/RoundController');

router.post('/', roundController.createRound);
router.get('/', roundController.getAllRounds);
router.get('/:id', roundController.getRoundById);
router.patch('/:id', roundController.updateRound);
router.delete('/:id', roundController.deleteRound);

module.exports = router;
