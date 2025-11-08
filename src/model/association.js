const User = require('./user');
const Round = require('./round');
const Bet = require('./bets');
const Account = require('./account');
const Transaction = require('./transactions');

// 🧠 USER → ACCOUNT
User.hasOne(Account, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Account.belongsTo(User, {
  foreignKey: 'user_id',
});

// 🎯 USER → BET
User.hasMany(Bet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Bet.belongsTo(User, {
  foreignKey: 'user_id',
});

// 🔁 ROUND → BET
Round.hasMany(Bet, {
  foreignKey: 'round_id',
  onDelete: 'CASCADE',
});
Bet.belongsTo(Round, {
  foreignKey: 'round_id',
});

// 💰 ACCOUNT → TRANSACTION
Account.hasMany(Transaction, {
  foreignKey: 'account_id',
  onDelete: 'CASCADE',
});
Transaction.belongsTo(Account, {
  foreignKey: 'account_id',
});

// 🕹 ROUND → TRANSACTION
Round.hasMany(Transaction, {
  foreignKey: 'round_id',
  onDelete: 'CASCADE',
});
Transaction.belongsTo(Round, {
  foreignKey: 'round_id',
});

module.exports = { User, Round, Bet, Account, Transaction };
