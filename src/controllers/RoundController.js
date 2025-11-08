const Round = require('../model/round');
console.log('Round model timestamps:', Round.options.timestamps);


// 🟢 Create a new round
exports.createRound = async (req, res) => {
  try {
    const {
      crash_point,
      state,
      start_time,
      end_time,
      server_seed,
      client_seed,
      total_bets,
      total_payout,
    } = req.body;

    const newRound = await Round.create({
      crash_point,
      state,
      start_time,
      end_time,
      server_seed,
      client_seed,
      total_bets,
      total_payout,
    });

    res.status(201).json(newRound);
  } catch (error) {
    console.error('Error creating round:', error);
    res.status(400).json({ message: error.message });
  }
};

// 🟡 Get all rounds
exports.getAllRounds = async (req, res) => {
  try {
    const rounds = await Round.findAll();
    res.status(200).json(rounds);
  } catch (error) {
    console.error('Error fetching rounds:', error);
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Get a single round by ID
exports.getRoundById = async (req, res) => {
  try {
    const { id } = req.params;
    const round = await Round.findByPk(id);

    if (!round) {
      return res.status(404).json({ message: 'Round not found' });
    }

    res.status(200).json(round);
  } catch (error) {
    console.error('Error fetching round:', error);
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Update a round
exports.updateRound = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const round = await Round.findByPk(id);
    if (!round) {
      return res.status(404).json({ message: 'Round not found' });
    }

    await round.update(updates);
    res.status(200).json({ message: 'Round updated successfully', round });
  } catch (error) {
    console.error('Error updating round:', error);
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Delete a round
exports.deleteRound = async (req, res) => {
  try {
    const { id } = req.params;
    const round = await Round.findByPk(id);

    if (!round) {
      return res.status(404).json({ message: 'Round not found' });
    }

    await round.destroy();
    res.status(200).json({ message: 'Round deleted successfully' });
  } catch (error) {
    console.error('Error deleting round:', error);
    res.status(500).json({ message: error.message });
  }
};
