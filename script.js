const taskItems = [];

class task {
    constructor(title, description, dueDate, priority, project, check) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project; 
        this.check = check;     
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
        checkbox.name = "check";
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

        const taskDueDate = document.createElement('input');
        taskDueDate.type = "date";
        taskDueDate.name = "duedate";
        taskDueDate.value = `${taskItem.dueDate}`;
        taskDueDate.id = "date";
        taskDueDate.classList.add('input-fields');
        taskInfo.appendChild(taskDueDate);

        // const taskPriority = document.createElement('div');
        // taskPriority.innerText = `${taskItem.priority}`;
        // taskInfo.appendChild(taskPriority);

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

    static getModalFields() {
        var modalTitle = document.getElementById('title');
        var modalDescription = document.getElementById('description');
        var dueDate = document.getElementById('dueDate');
        var modalSelectedProject = document.getElementById('project');
        var modalProject = modalSelectedProject.options[modalSelectedProject.selectedIndex];
        var modalSelectedPriority = document.getElementById('priority');
        var modalPriority = modalSelectedPriority.options[modalSelectedPriority.selectedIndex];
        var modalId = document.getElementById('modalId');

        return [modalTitle,
                modalDescription,
                dueDate,
                modalPriority,
                modalProject,
                modalId,
                ]
    }

    static populateModal(index) {
        const modalFields = displayController.getModalFields();

        modalFields[0].value = taskItems[index].title;
        modalFields[1].value = taskItems[index].description;
        modalFields[2].value = taskItems[index].dueDate;
        modalFields[3].text = taskItems[index].priority;
        modalFields[4].text = taskItems[index].project;
        modalFields[5].value = index;
    }

    static updateTaskInUI(index) {
        const task = document.getElementById(`${index}`); 

        task.children[0].innerText = taskItems[index].title;
        task.children[1].innerText = taskItems[index].description;
        task.children[2].firstElementChild.innerText = taskItems[index].dueDate;
        task.children[2].lastElementChild.innerText = taskItems[index].priority;
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

    static clearModalFields() {
        const modalFields = displayController.getModalFields();
        const project = document.getElementById('project');
        const priority = document.getElementById('priority');
        
        modalFields[0].value = '';
        modalFields[1].value = '';
        modalFields[2].value = '';
        project.selectedIndex = 0;
        priority.selectedIndex = 0;
      }
}

function updateTaskInStore(index) {
    const modalFields = displayController.getModalFields();

    taskItems[index].title = modalFields[0].value; 
    taskItems[index].description = modalFields[1].value;
    taskItems[index].dueDate = modalFields[2].value;
    taskItems[index].priority = modalFields[3].text;
    taskItems[index].project = modalFields[4].text;
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
    const check = '';

    const newTask = new task(title, description, dueDate, priority, project, check);
    taskItems.push(newTask);
    displayController. clearAddTaskFields();
    displayController.addTaskToList(newTask);
})


document.getElementById('project-content').addEventListener('click', (e) => {
    const modal = document.getElementById('todo-modal');
    const i = e.target.parentElement.id;
  
    if(e.target.classList.contains('task-title') || e.target.classList.contains('task-description')) {
      displayController.populateModal(i); 
      displayController.openModal(modal);
    }
})

document.getElementById('saveModal').addEventListener('click', e => {
    const modal = document.querySelector('#todo-modal');
    const index = modal.querySelector('#modalId').value;

    updateTaskInStore(index);
    displayController.updateTaskInUI(index);
    displayController.closeModal(modal);
})

document.getElementsByClassName('btn close')[0].addEventListener('click', (event) => {
    event.preventDefault();
    const modal = document.querySelector('#todo-modal.active'); 
    displayController.closeModal(modal);
})

document.getElementById('overlay').addEventListener('click', () => {
    const modal = document.querySelector('#todo-modal.active'); 
    displayController.closeModal(modal);
})

document.getElementById('project-content').addEventListener('change', e => {
    if(e.target.name === 'check') {
        const index = e.target.parentElement.nextElementSibling.id;
        const task = e.target.parentElement.parentElement;
    
        if(e.target.checked) {
            task.classList.add('checked');
            taskItems[index].check = 'checked';
        }
        else if(task.classList.contains('checked')) {
            task.classList.remove('checked');
            taskItems[index].check = 'not checked';
        }
    }
})

document.getElementById('project-content').addEventListener('input', e => {
    if(e.target.name === 'duedate') {
        const index = e.target.parentElement.parentElement.id;

        taskItems[index].dueDate = e.target.value;
        console.log(taskItems[index].dueDate)
    }
})

