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

  const displayTasks=()=> {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';

    const today = new Date().toISOString().split('T')[0];

    taskContainer.innerHTML += '<div class="section-title">Today</div>';
    if (tasks[today]) {
      tasks[today].forEach(taskObj => {
        taskContainer.innerHTML += `<div>${taskObj.task} ${formatTime(taskObj.time)}</div>`;
      });
    } else {
      taskContainer.innerHTML += `<div>No tasks for today.</div>`;
    }

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