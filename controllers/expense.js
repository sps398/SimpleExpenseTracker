const Expense = require('../models/expense');

// getExpenses

module.exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.json(expenses);
        })
        .catch(err => console.log(err));
}

// postAddExpense

module.exports.postAddExpense = (req, res, next) => {
    Expense.create({
        expense: req.body.expense,
        description: req.body.description,
        category: req.body.category
    })
    .then(result => {
        console.log('result');
        res.json({ created: true });
    })
    .catch(err => console.log(err));
}

// postEditExpense

module.exports.postEditExpense = (req, res, next) => {
    Expense.findByPk(req.params.expenseId)
        .then(expense => {
            expense.expense = req.body.expense;
            expense.description = req.body.description;
            expense.category = req.body.category;

            return expense.save();
        })
        .then(result => {
            console.log('UPDATED');
            res.json({ updated: true });
        })
        .catch(err => console.log(err));
}

// postDeleteExpense

module.exports.postDeleteExpense = (req, res, next) => {
    Expense.findByPk(req.params.expenseId)
        .then(expense => {
            return expense.destroy();
        })
        .then(result => {
            res.json({ deleted: true })
        })
        .catch(err => console.log(err));
}