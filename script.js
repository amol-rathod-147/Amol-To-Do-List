// let searchQuery = "";

// document.getElementById('searchBar').addEventListener('input', (e) => {
//     searchQuery = e.target.value.toLowerCase();
//     displayTasks();
//   });

// document.getElementById('addTaskButton').addEventListener('click', ()=> {
//     const task = document.getElementById('taskInput').value.trim();
//     const date = document.getElementById('taskDate').value;
//     const time = document.getElementById('taskTime').value;

//     if (!task || !date || !time) {
//         showAlert('Please fill in all fields.');
//         return; 
//     }
//     if (task && date && time) {
//       const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
//       if (!tasks[date]) tasks[date] = [];
//       tasks[date].push({ task, time });

//       localStorage.setItem('tasks', JSON.stringify(tasks));
//       displayTasks();
//       clearFields();
//     }
//   });

//   function showAlert(message) {
//     const alertMessage = document.getElementById('alertMessage');
//     const alertText = document.getElementById('alertText');
//     alertText.textContent = message;
//     alertMessage.classList.remove('hidden');
//   }
  
//   function closeAlert() {
//     const alertMessage = document.getElementById('alertMessage');
//     alertMessage.classList.add('hidden');
//   }
//   const clearFields=()=> {
//     document.getElementById('taskInput').value = '';
//     document.getElementById('taskDate').value = '';
//     document.getElementById('taskTime').value = '';
//   }

//   const displayTasks = () => {
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
//     const taskContainer = document.getElementById('taskContainer');
//     taskContainer.innerHTML = '';

//     const today = new Date().toISOString().split('T')[0];

//     let filteredTasks = [];
//     Object.keys(tasks).forEach(date => {
//       tasks[date].forEach(taskObj => {
//         if (taskObj.task.toLowerCase().includes(searchQuery)) {
//           filteredTasks.push({ date, taskObj });
//         }
//       });
//     });

//     if (filteredTasks.length === 0) {
//       taskContainer.innerHTML = '<div>No tasks found.</div>';
//       return;
//     }

//     const todayTasks = filteredTasks.filter(task => task.date === today);
//     if (todayTasks.length > 0) {
//       taskContainer.innerHTML += '<div class="section-title">Today</div>';
//       todayTasks.forEach(task => {
//         taskContainer.innerHTML += `
//           <div class="task-item">
//             <span class="task-text">${task.taskObj.task} at <span class="task-time"> ${formatTime(task.taskObj.time)}</span></span>
//             <div class="task-buttons">
//               <button class="edit-btn" onclick="editTask('${task.date}', ${task.index})">Edit</button>
//               <button class="delete-btn" onclick="deleteTask('${task.date}', ${task.index})">Delete</button>
//             </div>
//           </div>`;
//       });
//     }

//     const dueTasks = filteredTasks.filter(task => task.date < today);
//     if (dueTasks.length > 0) {
//       taskContainer.innerHTML += '<div class="section-title">Due Tasks</div>';
//       dueTasks.forEach(task => {
//         taskContainer.innerHTML += `
//           <div class="task-item">
//             <span class="task-text">${task.taskObj.task} at <span class="task-time"> ${formatTime(task.taskObj.time)}</span></span>
//             <div class="task-buttons">
//               <button class="edit-btn" onclick="editTask('${task.date}', ${task.index})">Edit</button>
//               <button class="delete-btn" onclick="deleteTask('${task.date}', ${task.index})">Delete</button>
//             </div>
//           </div>`;
//       });
//     }

//     const upcomingTasks = filteredTasks.filter(task => task.date > today);
//     if (upcomingTasks.length > 0) {
//       taskContainer.innerHTML += '<div class="section-title">Upcoming Tasks</div>';
//       upcomingTasks.forEach(task => {
//         taskContainer.innerHTML += `
//           <div class="task-item">
//             <span class="task-text">${task.taskObj.task} at <span class="task-time"> ${formatTime(task.taskObj.time)}</span></span>
//             <div class="task-buttons">
//               <button class="edit-btn" onclick="editTask('${task.date}', ${task.index})">Edit</button>
//               <button class="delete-btn" onclick="deleteTask('${task.date}', ${task.index})">Delete</button>
//             </div>
//           </div>`;
//       });
//     }
//   }
//   const editTask = (date, index) => {
//     const tasks = JSON.parse(localStorage.getItem('tasks'));
//     const task = tasks[date][index];
//     document.getElementById('taskInput').value = task.task;
//     document.getElementById('taskDate').value = date;
//     document.getElementById('taskTime').value = task.time;
//     deleteTask(date, index);
//   }
 

//   const deleteTask = (date, index) => {
//     const tasks = JSON.parse(localStorage.getItem('tasks'));
//     tasks[date].splice(index, 1);
//     if (tasks[date].length === 0) {
//       delete tasks[date];
//     }
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     displayTasks();
//   }

//   const formatDate=(date)=> {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(date).toLocaleDateString(undefined, options);
//   }

//   const formatTime=(time)=> {
//     const [hour, minute] = time.split(':');
//     const date = new Date();
//     date.setHours(hour, minute);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   }


//   window.onload = displayTasks;


let searchQuery = "";

document.getElementById('searchBar').addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  displayTasks();
});

document.getElementById('addTaskButton').addEventListener('click', () => {
  const task = document.getElementById('taskInput').value.trim();
  const date = document.getElementById('taskDate').value;
  const time = document.getElementById('taskTime').value;

  if (!task || !date || !time) {
    showAlert('Please fill in all fields.');
    return;
  }
  const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
  if (!tasks[date]) tasks[date] = [];
  tasks[date].push({ task, time });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
  clearFields();
});

function showAlert(message) {
  const alertMessage = document.getElementById('alertMessage');
  const alertText = document.getElementById('alertText');
  alertText.textContent = message;
  alertMessage.classList.remove('hidden');
}

function closeAlert() {
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.classList.add('hidden');
}

const clearFields = () => {
  document.getElementById('taskInput').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';
};

const displayTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';

  const today = new Date().toISOString().split('T')[0];

  let filteredTasks = [];
  Object.keys(tasks).forEach(date => {
    tasks[date].forEach((taskObj, index) => {
      if (taskObj.task.toLowerCase().includes(searchQuery)) {
        filteredTasks.push({ date, index, taskObj });
      }
    });
  });

  if (filteredTasks.length === 0) {
    taskContainer.innerHTML = '<div>No tasks found.</div>';
    return;
  }

  const todayTasks = filteredTasks.filter(task => task.date === today);
  if (todayTasks.length > 0) {
    taskContainer.innerHTML += '<div class="section-title">Today</div>';
    todayTasks.forEach(task => {
      taskContainer.innerHTML += `
        <div class="task-item">
          <span class="task-text">${task.taskObj.task} at <span class="task-time"> ${formatTime(task.taskObj.time)}</span></span>
          <div class="task-buttons">
            <button class="edit-btn" onclick="editTask('${task.date}', ${task.index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${task.date}', ${task.index})">Delete</button>
          </div>
        </div>`;
    });
  }

  const dueTasks = filteredTasks.filter(task => task.date < today);
  if (dueTasks.length > 0) {
    taskContainer.innerHTML += '<div class="section-title">Due Tasks</div>';
    dueTasks.forEach(task => {
      taskContainer.innerHTML += `
        <div class="task-item">
          <span class="task-text">${task.taskObj.task} at <span class="task-time"> ${formatTime(task.taskObj.time)}</span></span>
          <div class="task-buttons">
            <button class="edit-btn" onclick="editTask('${task.date}', ${task.index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${task.date}', ${task.index})">Delete</button>
          </div>
        </div>`;
    });
  }

  const upcomingTasks = filteredTasks.filter(task => task.date > today);
  if (upcomingTasks.length > 0) {
    taskContainer.innerHTML += '<div class="section-title">Upcoming Tasks</div>';
    upcomingTasks.forEach(task => {
      taskContainer.innerHTML += `
        <div class="task-item">
          <span class="task-text">${task.taskObj.task} at <span class="task-time"> ${formatTime(task.taskObj.time)}</span></span>
          <div class="task-buttons">
            <button class="edit-btn" onclick="editTask('${task.date}', ${task.index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask('${task.date}', ${task.index})">Delete</button>
          </div>
        </div>`;
    });
  }
};

const editTask = (date, index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks[date][index];
  
    const editPopup = document.createElement('div');
    editPopup.classList.add('edit-popup');
  
    const popupContent = `
      <div class="popup-content">
        <h3>Edit Task</h3>
        <label for="editTaskInput">Task:</label>
        <input id="editTaskInput" type="text" value="${task.task}" />
        <label for="editTaskDate">Date:</label>
        <input id="editTaskDate" type="date" value="${date}" />
        <label for="editTaskTime">Time:</label>
        <input id="editTaskTime" type="time" value="${task.time}" />
        <div class="popup-buttons">
          <button id="updateTaskBtn">Update</button>
          <button id="cancelTaskBtn">Cancel</button>
        </div>
      </div>
    `;
  
    editPopup.innerHTML = popupContent;
    document.body.appendChild(editPopup);
  
    document.getElementById('updateTaskBtn').addEventListener('click', () => {
      const updatedTask = document.getElementById('editTaskInput').value.trim();
      const updatedDate = document.getElementById('editTaskDate').value;
      const updatedTime = document.getElementById('editTaskTime').value;
  
      if (!updatedTask || !updatedDate || !updatedTime) {
        showAlert('Please fill in all fields.');
        return;
      }
  
      tasks[date].splice(index, 1);
      if (tasks[date].length === 0) {
        delete tasks[date];
      }
  
      if (!tasks[updatedDate]) tasks[updatedDate] = [];
      tasks[updatedDate].push({ task: updatedTask, time: updatedTime });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
      document.body.removeChild(editPopup);
    });
  
    document.getElementById('cancelTaskBtn').addEventListener('click', () => {
      document.body.removeChild(editPopup);
    });
  };
// const editTask = (date, index) => {
//   const tasks = JSON.parse(localStorage.getItem('tasks'));
//   const task = tasks[date][index];
//   const taskContainer = document.getElementById('taskContainer');

//   const editTaskWindow = document.createElement('div');
//   editTaskWindow.classList.add('edit-task-window');
//   taskContainer.appendChild(editTaskWindow);

//   const inputForTask = document.createElement('input');
//   inputForTask.type = 'text';
//   inputForTask.value = task.task;
//   editTaskWindow.appendChild(inputForTask);

//   const inputForDate = document.createElement('input');
//   inputForDate.type = 'date';
//   inputForDate.value = date;
//   editTaskWindow.appendChild(inputForDate);

//   const inputForTime = document.createElement('input');
//   inputForTime.type = 'time';
//   inputForTime.value = task.time;
//   editTaskWindow.appendChild(inputForTime);

//   const updateBtn = document.createElement('button');
//   updateBtn.innerText = 'Update';
//   editTaskWindow.appendChild(updateBtn);

//   const cancelBtn = document.createElement('button');
//   cancelBtn.innerText = 'Cancel';
//   editTaskWindow.appendChild(cancelBtn);

//   updateBtn.addEventListener('click', () => {
//     const updatedTask = inputForTask.value.trim();
//     const updatedDate = inputForDate.value;
//     const updatedTime = inputForTime.value;

//     if (!updatedTask || !updatedDate || !updatedTime) {
//       showAlert('Please fill in all fields.');
//       return;
//     }

//     tasks[date].splice(index, 1);
//     if (tasks[date].length === 0) {
//       delete tasks[date];
//     }

//     if (!tasks[updatedDate]) tasks[updatedDate] = [];
//     tasks[updatedDate].push({ task: updatedTask, time: updatedTime });

//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     displayTasks();
//     editTaskWindow.remove();
//   });

//   cancelBtn.addEventListener('click', () => {
//     editTaskWindow.remove();
//   });
// };

const deleteTask = (date, index) => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[date].splice(index, 1);
  if (tasks[date].length === 0) {
    delete tasks[date];
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const formatTime = (time) => {
  const [hour, minute] = time.split(':');
  const date = new Date();
  date.setHours(hour, minute);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

window.onload = displayTasks;
