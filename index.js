const cn = document.getElementById('container');
const form = document.getElementById('form');
const expense = document.getElementById('expense');
const desc = document.getElementById('desc');
const type = document.getElementById('type');
const submit = document.getElementById('submit');
const details = document.getElementById('details');
const ul = document.getElementById('ul');

render();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(expense.value == '' || desc.value=='' || type.value=='') {
        alert("Enter the fields to add expense");
        return;
    }
    
    const newExpense = {
        expense: expense.value,
        desc: desc.value,
        type: type.value
    }

    const arrEx = JSON.parse(localStorage.getItem('db')) || [];
    arrEx.push(newExpense);
    localStorage.setItem('db', JSON.stringify(arrEx));

    form.reset();
    render();
});

function onDeleteClick(dt) {
    dt.addEventListener('click', (e) => {
        const id = e.target.parentNode.id;
        const arrEx = JSON.parse(localStorage.getItem('db'));
        arrEx.splice(Number(id), 1);
        localStorage.setItem('db', JSON.stringify(arrEx));

        render();
    });
}

function onEditClick(edit) {
    edit.addEventListener('click', (e) => {
        const id = e.target.parentNode.id;
        const arrEx = JSON.parse(localStorage.getItem('db'));
        const curr = arrEx[Number(id)];
        expense.value = curr.expense;
        desc.value = curr.desc;
        type.value = curr.type;
        arrEx.splice(Number(id), 1);
        localStorage.setItem('db', JSON.stringify(arrEx));

        render();
    });
}

function render() {
    const ul = document.getElementById('ul');
    ul.innerHTML = '';

    const arrEx = JSON.parse(localStorage.getItem('db'));
    for(let i=0;i<arrEx.length;i++) {
        const obj = arrEx[i];

        const li = document.createElement('li');
        const p = document.createElement('p');
        const dt = document.createElement('button');
        const edit = document.createElement('button');
        p.className = 'd-inline-block';
        p.innerText = `${obj.expense}-${obj.type}-${obj.desc}`;
        dt.innerHTML='Delete Expense';
        edit.innerHTML='Edit Expense';

        li.id = i.toString();
        dt.id = 'Delete';
        edit.id = 'Edit';

        li.className = 'row mb-3 gx-5 bg-info';
        p.className = 'd-inline-block col-sm-8 text-lg-start text-center pt-lg-2';
        dt.className = 'btn btn-sm btn-secondary col-sm-2';
        edit.className = 'btn btn-sm btn-secondary col-sm-2';

        onDeleteClick(dt);
        onEditClick(edit);

        li.appendChild(p);
        li.appendChild(dt); 
        li.appendChild(edit);
        ul.appendChild(li);
    }
    details.appendChild(ul);
}   