export default async function getAllToDo(api) {
    return fetch(api)
        .then(response => response.json())
        .then(todos => {
            let todoList = todos.map(function (todo) {
                return `<li data="${todo.id}"><input type="checkbox" ${todo.work === 1 ? "checked" : ''} id=""> <span>${todo.name}</span>
                <button class="btn-delete"><i class="fas fa-trash-alt"></i>
                </button>
                <p>Deadline: ${todo.deadline}</p>
                </li>
                `;
            })
            let appListTask = document.querySelector('.app-list-task');
            appListTask.innerHTML = todoList.join(' ');
        });
}


export async function fetchData(api, method, data = {}) {
    const response = await fetch(api, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response;
}
