let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let currentTheme = localStorage.getItem('theme') || 'light';

const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const themeToggle = document.getElementById('themeToggle');
const filterPriority = document.getElementById('filterPriority');

const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));
const saveTheme = () => localStorage.setItem('theme', currentTheme);

const renderTasks = () => {
	const filter = filterPriority.value || 'All';
	taskList.innerHTML = '';
	tasks
		.filter(t => filter === 'All' || t.priority === filter)
		.forEach((task, idx) => {
			const li = document.createElement('li');
			li.className = task.priority.toLowerCase();
			li.innerHTML = `
				<input value="${task.title}" class="edit-title" data-idx="${idx}" />
				<input value="${task.desc}" class="edit-desc" data-idx="${idx}" />
				<select class="edit-priority" data-idx="${idx}">
					<option ${task.priority === "High" ? "selected" : ""}>High</option>
					<option ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
					<option ${task.priority === "Low" ? "selected" : ""}>Low</option>
				</select>
				<button class="delete-btn" data-idx="${idx}">Delete</button>
			`;
			taskList.appendChild(li);
		});
};

taskForm.addEventListener('submit', e => {
	e.preventDefault();
	const title = document.getElementById('taskTitle').value.trim();
	const desc = document.getElementById('taskDesc').value.trim();
	const priority = document.getElementById('taskPriority').value;
	if (!title || !desc) return;
	tasks.push({ title, desc, priority });
	saveTasks();
	renderTasks();
	taskForm.reset();
});

taskList.addEventListener('change', e => {
	if (!e.target.dataset || typeof e.target.dataset.idx === 'undefined') return;
	const idx = Number(e.target.dataset.idx);
	if (e.target.classList.contains('edit-title')) tasks[idx].title = e.target.value;
	if (e.target.classList.contains('edit-desc')) tasks[idx].desc = e.target.value;
	if (e.target.classList.contains('edit-priority')) tasks[idx].priority = e.target.value;
	saveTasks();
	renderTasks();
});

taskList.addEventListener('click', e => {
	if (e.target.classList.contains('delete-btn')) {
		const idx = Number(e.target.dataset.idx);
		if (!Number.isNaN(idx) && confirm('Are you sure you want to delete this task?')) {
			tasks.splice(idx, 1);
			saveTasks();
			renderTasks();
		}
		return;
	}
	if (e.target.classList.contains('edit-btn')) {
		const li = e.target.closest('li');
		const input = li?.querySelector('.edit-title');
		if (input) input.focus();
	}
});

themeToggle.addEventListener('click', () => {
	currentTheme = document.body.classList.toggle('dark-theme') ? 'dark' : 'light';
	saveTheme();
});

filterPriority.addEventListener('change', renderTasks);

if (currentTheme === 'dark') document.body.classList.add('dark-theme');
renderTasks();





if (e.target.classList.contains('delete-btn')) {
	const idx = Number(e.target.dataset.idx);
	if (!Number.isNaN(idx) && confirm('Are you sure you want to delete this task?')) {
		tasks.splice(idx, 1);
		saveTasks();
		renderTasks();
	}
}