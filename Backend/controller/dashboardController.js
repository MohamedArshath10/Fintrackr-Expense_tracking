const Income = require('../models/Income')
const Expense = require('../models/Expense')

const {isValidObject, Types} = require('mongoose')

// Dashboard data
exports.getDashboardData = async (req, res) =>{
    try{
        const userId = req.user.id
        const userObjectId = new Types.ObjectId(String(userId))

        // Fetch total income and expense
        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId} },
            {$group: {_id: null, total: {$sum: "$amount"} } },
        ])

        console.log("totalIncome: " , {totalIncome, userId: isValidObject(userId)});

        const totalExpense = await Expense.aggregate([
            {$match: {userId: userObjectId} },
            {$group: {_id: null, total: {$sum: "$amount"} } },
        ])

        // get Income for last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 60 + 24 + 60 + 60 + 1000)},
        }).sort({date: -1})

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0            
        )

        // Get expense transaction
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30 + 24 + 60 + 60 + 1000)},
        }).sort({date: -1})

        // Get total Expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0            
        )

        // Get last 5 transaction (income and expense)
        const lastTransaction = [
            ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
                (tan) => ({
                    ...tan.toObject(),
                    type: "income"
                })
            ),
            ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (tan) => ({
                    ...tan.toObject(),
                    type: "expense"
                })
            )
            ].sort((a, b) => b.date - a.date) // Sort latest first

            // final responnse
            res.json({
                totalBalance:
                    (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
                totalIncome: totalIncome[0]?.total || 0,
                totalExpense: totalExpense[0]?.total || 0,
                last30DaysExpense: {
                    total: expenseLast30Days,
                    transaction: last30DaysExpenseTransactions
                },
                last60DaysIncome: {
                    total: incomeLast60Days,
                    transaction: last60DaysIncomeTransactions
                },
                recentTransaction: lastTransaction
            })
    }catch(error){
        res.status(500).json({message: "Server error", error})
    }
}