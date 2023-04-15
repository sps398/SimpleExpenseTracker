const cn = document.getElementById('container');
const form = document.getElementById('form');
const expense = document.getElementById('expense');
const desc = document.getElementById('desc');
const type = document.getElementById('type');
const submit = document.getElementById('submit');
const details = document.getElementById('details');
const ul = document.getElementById('ul');
const expenseId = document.getElementById('id');

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

window.addEventListener('DOMContentLoaded', () => {
    render();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(expense.value == '' || desc.value=='' || type.value=='') {
        alert("Enter the fields to add expense");
        return;
    }
    
    const newExpense = {
        expense: expense.value,
        description: desc.value,
        category: type.value
    }

    console.log(newExpense);

    if(submit.innerText == 'Update Expense') {
        await axiosInstance.post(`/update-expense/${expenseId.value}`, newExpense);
        submit.innerText = 'Add Expense';
    }

    else {
        try {
            await axiosInstance.post('/add-expense', newExpense);
        } catch(err) {
            console.log(err);
        }
    }

    form.reset();
    render();
});

async function render() {
    const ul = document.getElementById('ul');
    ul.innerHTML = '';

    const result = await axiosInstance.get('/expenses');
    const expenses = result.data;

    for(let i=0;i<expenses.length;i++) {
        const curr = expenses[i];

        const li = document.createElement('li');
        const p = document.createElement('p');
        const dt = document.createElement('button');
        const edit = document.createElement('button');
        p.className = 'd-inline-block';
        p.innerText = `${curr.expense}-${curr.category}-${curr.description}`;
        dt.innerHTML='Delete Expense';
        edit.innerHTML='Edit Expense';

        li.id = curr.id;
        dt.id = 'Delete';
        edit.id = 'Edit';

        li.className = 'row mb-3 gx-5 bg-info';
        p.className = 'd-inline-block col-sm-8 text-lg-start text-center pt-lg-2';
        dt.className = 'btn btn-sm btn-secondary col-sm-2';
        edit.className = 'btn btn-sm btn-secondary col-sm-2';

        edit.addEventListener('click', (e) => {
            editExpense(curr);
        });

        dt.addEventListener('click', (e) => {
            deleteExpense(curr.id);
        });

        li.appendChild(p);
        li.appendChild(dt); 
        li.appendChild(edit);
        ul.appendChild(li);
    }
    details.appendChild(ul);
}

function editExpense(curr) {
    expense.value = curr.expense;
    desc.value = curr.description;
    type.value = curr.category;
    expenseId.value = curr.id;
    submit.innerText = 'Update Expense';
}

async function deleteExpense(id) {
    await axiosInstance.post(`/delete-expense/${id}`);
    render();
}