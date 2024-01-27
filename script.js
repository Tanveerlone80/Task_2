const form = document.querySelector('form');
const input = document.querySelector('input');
const list = document.querySelector('.list');

let tasks = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const task = input.value.trim();
  if (task) {
    tasks.push({ name: task, priority: false, completed: false });
    input.value = '';
    renderTasks();
  }
});

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
      <div>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="delete" data-index="${index}">Delete</button>
        <button class="priority ${task.priority ? 'active' : ''}" data-index="${index}">Priority</button>
        <button class="completed ${task.completed ? 'active' : ''}" data-index="${index}">Completed</button>
      </div>
    `;
    list.appendChild(li);
  });
}

list.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('delete')) {
    const index = target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
  } else if (target.classList.contains('edit')) {
    const index = target.dataset.index;
    const task = tasks[index];
    const newTask = prompt('Edit task:', task.name);
    if (newTask) {
      task.name = newTask;
      renderTasks();
    }
  } else if (target.classList.contains('priority')) {
    const index = target.dataset.index;
    tasks[index].priority = !tasks[index].priority;
    renderTasks();
  } else if (target.classList.contains('completed')) {
    const index = target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }
});

renderTasks();