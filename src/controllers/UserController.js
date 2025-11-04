const User = require('../model/user');

exports.createUser = async(req, res) => {
    try{
        const { username, phone, email, password } = req.body;
        const newUser = await User.create({username, email, phone, password});
        res.status( 201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.getAllUsers = async(req, res) => {
    try{
    const users = await User.findAll();
    res.status(200).json(users)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// 🟠 UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, phone, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update only provided fields
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (email) user.email = email;
    if (password) user.password = password; // will be auto-hashed via hook

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// 🔴 DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};