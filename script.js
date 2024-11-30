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

    Object.keys(tasks).forEach(date => {
      const taskList = document.createElement('div');
      taskList.innerHTML = `<h3>${formatDate(date)}</h3>`;
      tasks[date].forEach(taskObj => {
        const taskItem = document.createElement('div');
        taskItem.textContent = `${taskObj.task} ${formatTime(taskObj.time)}`;
        taskList.appendChild(taskItem);
      });
      taskContainer.appendChild(taskList);
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