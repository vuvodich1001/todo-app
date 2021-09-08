import getAllToDo from './main.js';
import { fetchData } from './main.js';
let numberExtinct = document.querySelector('.number');
let btnDeleteAll = document.querySelector('.btn-clear');
let datatimeLocal = document.querySelector('input[type="datetime-local');
let api = 'http://localhost:3000/todos';
function handle() {
    let btnAdd = document.querySelector('.btn-add');
    let inputElement = document.querySelector('.app-form input');
    let appListTask = document.querySelector('.app-list-task');
    inputElement.oninput = (e) => {
        if (e.target.value.trim()) {
            // console.log(typeof (datatimeLocal.value));
        }
    }
    btnAdd.onclick = (e) => {
        e.preventDefault();
        if (inputElement.value.trim() === '') {

        }
        else {
            // let liElement = document.createElement('li');
            // liElement.innerHTML = `<input type="checkbox" id=""> <span>${inputElement.value.trim()}</span>
            //                         <button class="btn-delete"><i class="fas fa-trash-alt"></i>
            //                         </button>
            //                         `;
            // appListTask.append(liElement);
            const data = {
                name: inputElement.value.trim(),
                deadline: datatimeLocal.value.toString(),
                work: 0
            }
            fetchData(api, 'POST', data)
                .then(function () {
                    getAllToDo(api)
                        .then(function () {
                            deleteToDo();
                            deleteAllToDo();
                            modifyStatus();
                        })

                })
            inputElement.value = '';
        }
    }
}


function deleteToDo() {
    let btnDeletes = document.querySelectorAll('.btn-delete');
    numberExtinct.textContent = btnDeletes.length;
    btnDeletes.forEach((btnDetele) => {
        btnDetele.onclick = (e) => {
            btnDetele.parentElement.remove();
            numberExtinct.textContent = Number(numberExtinct.textContent) - 1;
            let query = btnDetele.parentElement.getAttribute('data');
            fetchData(api + '/' + query, 'DELETE');
        }
    })
}


function deleteAllToDo() {
    let btnDeletes = document.querySelectorAll('.btn-delete');
    btnDeleteAll.onclick = (e) => {
        btnDeletes.forEach((btnDetele) => {
            btnDetele.parentElement.remove();
            numberExtinct.textContent = 0;
            let query = btnDetele.parentElement.getAttribute('data');
            fetchData(api + '/' + query, 'DELETE');
        })
    }
}

function modifyStatus() {
    let inputCheckboxs = document.querySelectorAll('input[type="checkbox"');
    inputCheckboxs.forEach(check => {
        check.onclick = (e) => {
            let query = check.parentElement.getAttribute('data');
            let deadLine = check.parentElement.querySelector('p');
            const data = {
                name: check.nextElementSibling.innerText,
                deadline: deadLine.innerText.slice(10, deadLine.length),
                work: check.checked == true ? 1 : 0
            }
            fetchData(api + '/' + query, 'PUT', data);
        }
    })
}
function start() {
    let date = new Date();
    datatimeLocal.value = date.toDateString();
    getAllToDo(api)
        .then(function () {
            handle();
            deleteToDo();
            deleteAllToDo();
            modifyStatus();
        });
}

start();