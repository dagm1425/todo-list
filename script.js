const taskItems = [];

class task {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;      
    } 
}

class displayController {
    static loadProject() {
        const projectContent = document.getElementById('project-content')

        const projectView = document.createElement('div');
        projectView.classList.add('project-view');

        // const projectHeader = document.createElement('div');
        // projectHeader.classList.add('project-header');
        // projectHeader.innerText = 'Test project';
        // projectView.appendChild(projectHeader);

        const tasksView = document.createElement('div');
        tasksView.classList.add('tasks-view');

        const tasksList = document.createElement('ul');
        tasksList.classList.add('tasks-ul');
        tasksView.appendChild(tasksList);

        projectView.appendChild(tasksView);
        projectContent.insertBefore(projectView, projectContent.firstElementChild);

        // displayController.addTaskToList(taskItems); << displayProjectTasks() should be here
    }

    static addTaskToList(taskItem) {
        const ul = document.querySelector('.tasks-ul');

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const check = document.createElement('div');
        check.classList.add('task-checkbox');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.value = "value";
        checkbox.id = "id";
        check.appendChild(checkbox);

        taskContainer.appendChild(check);

        const taskContent = document.createElement('div'); 
        taskContent.classList.add('task-content');
        taskContent.setAttribute('id', `${taskItems.length - 1}`);

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('task-title');
        taskTitle.innerText = `${taskItem.title}`;
        taskContent.appendChild(taskTitle);

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-description', 'task-body');
        taskDescription.innerText = `${taskItem.description}`;
        taskContent.appendChild(taskDescription);

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info', 'task-body');

        const taskDueDate = document.createElement('div');
        taskDueDate.innerText = `${taskItem.dueDate}`;
        taskInfo.appendChild(taskDueDate);

        // const taskDueDate = document.createElement('input');
        // taskDueDate.type = "date";
        // taskDueDate.name = "name";
        // taskDueDate.value = "value";
        // taskDueDate.id = "id";

        const taskPriority = document.createElement('div');
        taskPriority.innerText = `${taskItem.priority}`;
        taskInfo.appendChild(taskPriority);

        taskContent.appendChild(taskInfo);
        taskContainer.appendChild(taskContent);

        const li = document.createElement('li');
        li.appendChild(taskContainer);

        ul.insertBefore(li, ul.firstElementChild);
        
    }

    static dispAddTaskExp() { // edit css; display none and flex interfere check with 'Inspect'
        const addTaskDiv = document.querySelector('.add-task');
        const addTaskDivExp = document.querySelector('.add-task-exp')

        addTaskDivExp.classList.add('add-active');
        if(addTaskDiv.classList.contains('add-active')) addTaskDiv.classList.remove('add-active');
    }

    static dispAddTask() {
        const addTaskDiv = document.querySelector('.add-task');
        const addTaskDivExp = document.querySelector('.add-task-exp')

        addTaskDiv.classList.add('add-active');
        if(addTaskDivExp.classList.contains('add-active')) addTaskDivExp.classList.remove('add-active');
    }

    static openModal(modal) {
      if(modal == null) return;
      modal.classList.add('active');
      overlay.classList.add('active');
    }
    
    static closeModal(modal) {
      if(modal == null) return;
      modal.classList.remove('active');
      overlay.classList.remove('active');
    }

    static clearAddTaskFields() {
        const title = document.getElementById('title-exp');
        const description = document.getElementById('description-exp');
        const dueDate = document.getElementById('dueDate-exp');
        const priority = document.getElementById('priority-exp');
        const project = document.getElementById('priority-exp');

        title.value = '';
        description.value = '';
        dueDate.value = '';
        project.selectedIndex = 0;
        priority.selectedIndex = 0;
    }
}

window.addEventListener('load', () => {
    displayController.loadProject();
    displayController.dispAddTask();
})

document.querySelector('.add-task').addEventListener('click', () => {
    displayController.dispAddTaskExp()
})

document.querySelector('.btn-container-exp').addEventListener('click', () => {
    displayController.dispAddTask();
})

document.getElementById('save').addEventListener('click', () => {
    const title = document.getElementById('title-exp').value;
    const description = document.getElementById('description-exp').value;
    const dueDate = document.getElementById('dueDate-exp').value;
    const selectedPriority = document.getElementById('priority-exp');
    const priority = selectedPriority.options[selectedPriority.selectedIndex].text;
    const selectedProject = document.getElementById('project-exp');
    const project = selectedProject.options[selectedProject.selectedIndex].text;

    const newTask = new task(title, description, dueDate, priority, project);
    taskItems.push(newTask);
    displayController. clearAddTaskFields();
    displayController.addTaskToList(newTask);
})


