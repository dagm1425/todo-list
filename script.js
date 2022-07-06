const taskItems = [];     
const projectList = [];

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
    static loadProject(projectName) {
        const projectContent = document.getElementById('project-content');

        const projectView = document.createElement('div');
        projectView.classList.add('project-view');

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        projectHeader.innerText = `${projectName}`;
        projectView.appendChild(projectHeader);

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
        const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "check";
            checkbox.value = "value";
            checkbox.id = "id";
        check.appendChild(checkbox);

        taskContainer.appendChild(check);

        const taskContent = document.createElement('div'); 
        taskContent.classList.add('task-content');

        const taskMain = document.createElement('div');

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('task-title');
        taskTitle.innerText = `${taskItem.title}`;
        taskMain.appendChild(taskTitle);

        const taskDescription = document.createElement('div');
        taskDescription.classList.add('task-description', 'task-body');
        taskDescription.innerText = `${taskItem.description}`;
        taskMain.appendChild(taskDescription);

        taskContent.appendChild(taskMain);
        
        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info', 'task-body');

        const taskDueDate = document.createElement('input');
        taskDueDate.type = "date";
        taskDueDate.name = "duedate";
        taskDueDate.value = `${taskItem.dueDate}`;
        taskDueDate.id = "date";
        taskDueDate.classList.add('input-fields');
        taskInfo.appendChild(taskDueDate);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerText = 'Edit';
        taskInfo.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = 'Delete';
        taskInfo.appendChild(deleteBtn);
        // const taskPriority = document.createElement('div');
        // taskPriority.innerText = `${taskItem.priority}`;
        // taskInfo.appendChild(taskPriority);

        taskContent.appendChild(taskInfo);
        taskContainer.appendChild(taskContent);

        const li = document.createElement('li');
        li.appendChild(taskContainer);

        ul.insertBefore(li, ul.firstElementChild);
    }

    static setTaskId(index) {
        document.querySelector('.tasks-ul').firstElementChild.firstElementChild.lastElementChild.setAttribute('id', `${index}`);

        // return `${taskItems.length - 1}`;
    }

    static colorPriority(priority, id) {
        const check = document.getElementById(`${id}`).previousElementSibling.firstElementChild;

        if(priority === 'High') check.classList.add('high');
        else if(priority === 'Medium') check.classList.add('medium');
        else if(priority === 'Low') check.classList.add('low');
    }

    static dispAddTaskExp() { // edit css; display none and flex interfere check with 'Inspect'
        const addTask = document.querySelector('.add-task');
        const addTaskExp = document.querySelector('.add-task-exp')

        addTaskExp.classList.add('add-active');
        if(addTask.classList.contains('add-active')) addTask.classList.remove('add-active');
    }

    static dispAddTask() {
        const addTask = document.querySelector('.add-task');
        const addTaskExp = document.querySelector('.add-task-exp');

        addTask.classList.add('add-active');
        if(addTaskExp.classList.contains('add-active')) addTaskExp.classList.remove('add-active');
    }

    static dispAddProject() {
        const addProject = document.querySelector('.add-project');
        const addProjectExp = document.querySelector('.add-project-exp');

        addProject.classList.add('add-active');
        if(addProjectExp.classList.contains('add-active')) addProjectExp.classList.remove('add-active');
    }

    static dispAddProjectExp() { 
        const addProject = document.querySelector('.add-project');
        const addProjectExp = document.querySelector('.add-project-exp');

        addProjectExp.classList.add('add-active');
        if(addProject.classList.contains('add-active')) addProject.classList.remove('add-active');
    }

    static getModalFields() {
        var modalTitle = document.getElementById('title');
        var modalDescription = document.getElementById('description');
        var dueDate = document.getElementById('dueDate');
        var modalSelectedPriority = document.getElementById('priority');
        var modalPriority = modalSelectedPriority.options[modalSelectedPriority.selectedIndex];
        var modalSelectedProject = document.getElementById('project');
        var modalProject = modalSelectedProject.options[modalSelectedProject.selectedIndex];
        var modalId = document.getElementById('modalId');

        return [modalTitle,
                modalDescription,
                dueDate,
                modalSelectedPriority,
                modalPriority,
                modalSelectedProject,
                modalProject,
                modalId,
                ]
    }

    static populateModal(index) {
        const modalFields = displayController.getModalFields();

        modalFields[0].value = taskItems[index].title;
        modalFields[1].value = taskItems[index].description;
        modalFields[2].value = taskItems[index].dueDate;
        modalFields[3].value = taskItems[index].priority;
        modalFields[5].value = taskItems[index].project;
        modalFields[7].value = index;
    }

    static updateTaskInUI(index) {
        const task = document.getElementById(`${index}`); 

        task.firstElementChild.firstElementChild.innerText = taskItems[index].title;
        task.firstElementChild.lastElementChild.innerText = taskItems[index].description;
        task.lastElementChild.children[0].value = taskItems[index].dueDate;
        displayController.colorPriority(`${taskItems[index].priority}`, index);        
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
        // const project = document.getElementById('project-exp');

        title.value = '';
        description.value = '';
        dueDate.value = '';
        // project.selectedIndex = 0;
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

    static addProjectToList(projectName) {
        const list = document.querySelector('.project-list');
        const project = document.createElement('li');
        
        project.setAttribute('id', `${projectList.length - 1}`);
        project.innerText = `${projectName}`;
        list.appendChild(project);
    }

    static clearProjectField() {
        document.getElementById('projectName').value = '';
    }

    static addProjectToOption(project) {
        const addSelect = document.getElementById('project-exp');
        const modalSelect = document.getElementById('project');
        const opt1 = document.createElement('option');
        const opt2 = document.createElement('option');

        opt1.text = project;
        opt1.value = project.toLowerCase();
        opt2.text = project;
        opt2.value = project.toLowerCase();

        addSelect.add(opt1);
        modalSelect.add(opt2);
    }

    static dispNewProject(projectName) {
        document.querySelector('.project-view').remove();
        displayController.loadProject(projectName)
    }

    static setProjectOption(projectName) {
        const addSelect = document.getElementById('project-exp');
        addSelect.value = projectName.toLowerCase();
    }

    static displayProjectTasks(projectName, taskList) {
        const project = projectName.toLowerCase();

        taskList.forEach((task, i) => {
            if(task.project === project) {
                displayController.addTaskToList(taskList[i]);
                displayController.setTaskId(i);
            }
        })
    }
}

function updateTaskInStore(index) {
    const modalFields = displayController.getModalFields();

    taskItems[index].title = modalFields[0].value; 
    taskItems[index].description = modalFields[1].value;
    taskItems[index].dueDate = modalFields[2].value;
    taskItems[index].priority = modalFields[3].value;
    taskItems[index].project = modalFields[5].value;
}

function removeTaskFromStore(index) {
    taskItems.splice(index, 1);
}

window.addEventListener('load', () => {
    displayController.loadProject();
    displayController.dispAddTask();
    displayController.dispAddProject();
})

document.querySelector('.add-task').addEventListener('click', () => {
    displayController.dispAddTaskExp()
})

document.querySelector('.btn-container-exp').addEventListener('click', () => {
    displayController.clearAddTaskFields();
    displayController.dispAddTask();
})

document.querySelector('.add-project').addEventListener('click', () => {
    displayController.dispAddProjectExp()
})

document.querySelector('.project-btn-container').addEventListener('click', () => {
    displayController.dispAddProject();
    displayController.clearProjectField();
})

document.getElementById('saveProject').addEventListener('click', () => { 
    const projectName = document.getElementById('projectName').value;
    projectList.push(projectName);
    displayController.addProjectToList(projectName);
    displayController.dispNewProject(projectName);
    displayController.addProjectToOption(projectName);
    displayController.setProjectOption(projectName);
})

document.getElementById('save').addEventListener('click', () => {
    const title = document.getElementById('title-exp').value;
    const description = document.getElementById('description-exp').value;
    const dueDate = document.getElementById('dueDate-exp').value;
    const selectedPriority = document.getElementById('priority-exp');
    const priority = selectedPriority.options[selectedPriority.selectedIndex].value;
    const selectedProject = document.getElementById('project-exp');
    const project = selectedProject.options[selectedProject.selectedIndex].value;
    const check = '';

    const newTask = new task(title, description, dueDate, priority, project, check);
    taskItems.push(newTask);
    displayController.addTaskToList(newTask);
    displayController.setTaskId(taskItems.length - 1);
    displayController.clearAddTaskFields();
    // displayController.colorPriority(priority, setTaskId());        

})

document.getElementById('project-content').addEventListener('click', (e) => {
    if(e.target.classList.contains('edit-btn')) {
        const modal = document.getElementById('todo-modal');
        const i = e.target.parentElement.parentElement.id;

        displayController.populateModal(i); 
        displayController.openModal(modal);
    }
})

document.getElementById('project-content').addEventListener('click', e => {
    if(e.target.classList.contains('delete-btn')) {
        const index = e.target.parentElement.parentElement.id;
        removeTaskFromStore(index);
        e.target.parentElement.parentElement.parentElement.remove();
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
    }
})

document.querySelector('.project-list').addEventListener('click', e => {
    displayController.dispNewProject(e.target.innerText);
    displayController.setProjectOption(e.target.innerText);
    displayController.displayProjectTasks(e.target.innerText, taskItems);
})

