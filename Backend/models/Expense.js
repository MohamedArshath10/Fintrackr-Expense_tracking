const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    icon: {type: String},
    category: {type: String, required: true}, //Example : food, health etc
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Expense", ExpenseSchema)