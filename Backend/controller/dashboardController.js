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
            date: {$gte: new Date(Date.now() - 60 + 24 + 60 + 60 + 1000)}
        })
    }catch(error){

    }
}