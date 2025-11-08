const Bet = require('../model/bets');

// CREATE
exports.createBet = async (req, res) => {
  try {
    const bet = await Bet.create(req.body);
    res.status(201).json(bet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ ALL
exports.getAllBets = async (req, res) => {
  try {
    const bets = await Bet.findAll();
    res.status(200).json(bets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ONE
exports.getBetById = async (req, res) => {
  try {
    const bet = await Bet.findByPk(req.params.id);
    if (!bet) return res.status(404).json({ message: 'Bet not found' });
    res.status(200).json(bet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateBet = async (req, res) => {
  try {
    const bet = await Bet.findByPk(req.params.id);
    if (!bet) return res.status(404).json({ message: 'Bet not found' });
    await bet.update(req.body);
    res.status(200).json(bet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteBet = async (req, res) => {
  try {
    const bet = await Bet.findByPk(req.params.id);
    if (!bet) return res.status(404).json({ message: 'Bet not found' });
    await bet.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
