document.getElementById('addTaskButton').addEventListener('click', ()=> {
    const task = document.getElementById('taskInput').value.trim();
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;

    if (task && date && time) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
      if (!tasks[date]) tasks[date] = [];
      tasks[date].push({ task, time });

      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
      clearFields();
    }
  });

  const clearFields=()=> {
    document.getElementById('taskInput').value = '';
    document.getElementById('taskDate').value = '';
    document.getElementById('taskTime').value = '';
  }

  const displayTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    const today = new Date().toISOString().split('T')[0];

    taskContainer.innerHTML += '<div class="section-title">Today</div>';
    if (tasks[today]) {
      tasks[today].forEach((taskObj, index) => {
        taskContainer.innerHTML += `
          <div class="task-item">
            <span class="task-text">${taskObj.task} ${formatTime(taskObj.time)}</span>
            <div class="task-buttons">
              <button onclick="editTask('${today}', ${index})">Edit</button>
              <button onclick="deleteTask('${today}', ${index})">Delete</button>
            </div>
          </div>`;
      });
    } else {
      taskContainer.innerHTML += `<div>No tasks for today.</div>`;
    }

    taskContainer.innerHTML += '<div class="section-title">Due Tasks</div>';
    Object.keys(tasks).forEach(date => {
      if (date <= today && date !== today) {
        taskContainer.innerHTML += `<h4>${formatDate(date)}</h4>`;
        tasks[date].forEach((taskObj, index) => {
          taskContainer.innerHTML += `
            <div class="task-item">
              <span class="task-text">${taskObj.task} ${formatTime(taskObj.time)}</span>
                <button onclick="editTask('${date}', ${index})">Edit</button>
                <button onclick="deleteTask('${date}', ${index})">Delete</button>
            </div>`;
        });
      }
    });

    taskContainer.innerHTML += '<div class="section-title">Upcoming Tasks</div>';
    Object.keys(tasks).forEach(date => {
      if (date > today) {
        taskContainer.innerHTML += `<h4>${formatDate(date)}</h4>`;
        tasks[date].forEach((taskObj, index) => {
          taskContainer.innerHTML += `
            <div class="task-item">
              <span class="task-text">${taskObj.task} ${formatTime(taskObj.time)}</span>
                <button onclick="editTask('${date}', ${index})">Edit</button>
                <button onclick="deleteTask('${date}', ${index})">Delete</button>
            </div>`;
        });
      }
    });
  }

  const formatDate=(date)=> {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const formatTime=(time)=> {
    const [hour, minute] = time.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  window.onload = displayTasks;