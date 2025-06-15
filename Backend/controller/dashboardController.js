const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userObjectId = new Types.ObjectId(userId);

    // Aggregations
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Corrected Date Logic
    const today = new Date();
    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: sixtyDaysAgo },
    }).sort({ date: -1 });

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Recent transactions
    const lastTransaction = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(t => ({ ...t.toObject(), type: "income" })),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(t => ({ ...t.toObject(), type: "expense" })),
    ].sort((a, b) => b.date - a.date);

    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransaction,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
