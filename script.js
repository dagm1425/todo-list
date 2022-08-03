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
        editBtn.classList.add('task-edit-btn');
        editBtn.innerText = 'Edit';
        taskInfo.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('task-delete-btn');
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
        const taskItems = store.getTasks();

        modalFields[0].value = taskItems[index].title;
        modalFields[1].value = taskItems[index].description;
        modalFields[2].value = taskItems[index].dueDate;
        modalFields[3].value = taskItems[index].priority;
        modalFields[5].value = taskItems[index].project;
        modalFields[7].value = index;
    }

    static updateTaskInUI(index) {
        const task = document.getElementById(`${index}`); 
        const taskItems = store.getTasks();

        task.firstElementChild.firstElementChild.innerText = taskItems[index].title;
        task.firstElementChild.lastElementChild.innerText = taskItems[index].description;
        task.lastElementChild.children[0].value = taskItems[index].dueDate;
        displayController.colorPriority(`${taskItems[index].priority}`, index);        
    }

    static openModal(modal) {
        const overlay = document.getElementById('overlay');
        if(modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }
    
    static closeModal(modal) {
        const overlay = document.getElementById('overlay');
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
        const projectContainer = document.createElement('li');
        const projectItem = document.createElement('div');
        const project = document.createElement('p');
        const projectBtnContainer = document.createElement('div');
        const projectEditBtn = document.createElement('button');
        const projectDelBtn = document.createElement('button');
        const projectEditField = document.createElement('input');
            projectEditField.type = "text";
            projectEditField.name = "projectEdit";
            projectEditField.value = "(add class for this edit field)";
            projectEditField.id = "projectEdit";

        projectItem.classList.add('project-item');
        project.innerText = `${projectName}`;
        projectEditBtn.classList.add('project-edit-btn');
        projectEditBtn.innerText = 'Edit';
        projectDelBtn.classList.add('project-del-btn')
        projectDelBtn.innerText = 'Del';
        projectEditField.classList.add('display-none', 'project-edit-field');

        projectBtnContainer.appendChild(projectEditBtn);
        projectBtnContainer.appendChild(projectDelBtn);

        projectItem.appendChild(project);
        projectItem.appendChild(projectBtnContainer);

        projectContainer.appendChild(projectItem);
        projectContainer.appendChild(projectEditField);

        list.appendChild(projectContainer);
    }

    static setProjectId(index) {
        document.querySelector('.project-list').lastElementChild.setAttribute('id', index);
    }

    static clearProjectField() {
        document.getElementById('projectName').value = '';
    }

    static addProjectToSelect(projectName) {
        const addSelect = document.getElementById('project-exp');
        const modalSelect = document.getElementById('project');
        const opt1 = document.createElement('option');
        const opt2 = document.createElement('option');

        opt1.text = projectName;
        opt1.value = projectName.toLowerCase();
        opt2.text = projectName;
        opt2.value = projectName.toLowerCase();

        addSelect.add(opt1);
        modalSelect.add(opt2);
    }

    static addAllProjectsToSelect(projects) {
        projects.forEach(project => {
            displayController.addProjectToSelect(project);
        })
    }

    static dispNewProject(projectName) {
        document.querySelector('.project-view').remove();
        displayController.loadProject(projectName)
    }

    static setProjectSelect(projectName) {
        const addSelect = document.getElementById('project-exp');
        addSelect.value = projectName.toLowerCase();
    }

    static dispProjects() {
        const projects = store.getProjects();

        projects.forEach((project, i) => {
            displayController.addProjectToList(project);
            displayController.setProjectId(i);
        })
    }

    static displayProjectTasks(projectName, taskList) {
        // const project = projectName.toLowerCase();
        const project = projectName;

        taskList.forEach((task, i) => {
            if(task.project === project) {
                displayController.addTaskToList(taskList[i]); 
                displayController.setTaskId(i);
            }
        })
    }

    static loadProjectAndTasks(projectName, taskList) {
        displayController.loadProject(projectName);
        displayController.dispProjects()
        displayController.displayProjectTasks(projectName, taskList);
    }

    static populateAddProject(index, prevProject) {
        const projects = store.getProjects();
        const projectName = document.getElementById('projectName');
        const projectId = document.getElementById('projectId');
        const previousProject = document.getElementById('prevProject')

        projectName.value = projects[index];
        projectId.value = index;
        previousProject.value = prevProject;
    }

    // static toggleProjectSubmitBtn() {
    //     const saveProject = document.getElementById('saveProject');
    //     const saveEdit = document.getElementById('saveProjectEdit');

    //     if(saveEdit.classList.contains('display-none')) {
    //         saveEdit.classList.remove('display-none');
    //         saveProject.classList.add('display-none');
    //     }
    //     else {
    //         saveEdit.classList.add('display-none');
    //         saveProject.classList.remove('display-none');
    //     }
    // }

    static toggleEditField(projectItem, projectEditField) {
        projectItem.classList.toggle('display-none');
        projectEditField.classList.toggle('display-none');    
    }

    // static updateProject(origProject, editProject) {
    //     origProject = editProject;
    // }

    static updateProjectSelect(origProject, editProject) {
        const addSelect = document.getElementById('project-exp');
        const modalSelect = document.getElementById('project');

        for( let i = 0; i < addSelect.length; i++) {
            if(addSelect.options[i].text === origProject) {
                addSelect.options[i].text = editProject;
                addSelect.options[i].value = editProject.toLowerCase();
            }
        }

        for( let i = 0; i < modalSelect.length; i++) {
            if(modalSelect.options[i].text === origProject) {
                modalSelect.options[i].text = editProject;
                modalSelect.options[i].value = editProject.toLowerCase();
            }
        }

    }
}

class store {
    static getProjects() {
        let projects;
        if(localStorage.getItem('projects') === null) {
            projects = ['myProject'];
        } else {
            projects = JSON.parse(localStorage.getItem('projects'));
        }
    
        return projects;
    }

    static addProject(project) {
        let projects = store.getProjects();
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static updateProject(projectEdit, index) {
        let projects = store.getProjects();

        projects[index] = projectEdit;
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static removeProject(index) {
        let projects = store.getProjects();

        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    static getTasks() {
        let taskItems;
        if(localStorage.getItem('taskItems') === null) {
            taskItems = [];
        } else {
            taskItems = JSON.parse(localStorage.getItem('taskItems'));
        }
    
        return taskItems;
      }
    
    static addTask(task) {
        let taskItems = store.getTasks();
        taskItems.push(task);
        localStorage.setItem('taskItems', JSON.stringify(taskItems));
    }

    static updateTaskInStore(index) {
        let taskItems = store.getTasks();
        const modalFields = displayController.getModalFields();
    
        taskItems[index].title = modalFields[0].value; 
        taskItems[index].description = modalFields[1].value;
        taskItems[index].dueDate = modalFields[2].value;
        taskItems[index].priority = modalFields[3].value;
        taskItems[index].project = modalFields[5].value;

        localStorage.setItem('taskItems', JSON.stringify(taskItems));
    }
    
    static updateProjectinTasks(origProject, editProject) {
        let taskItems = store.getTasks();

        taskItems.forEach(task => {
            if(task.project === origProject) task.project = editProject;
        })

        localStorage.setItem('taskItems', JSON.stringify(taskItems));
    }

    static removeTaskFromStore(index) {
        let taskItems = store.getTasks();

        taskItems.splice(index, 1);
        localStorage.setItem('taskItems', JSON.stringify(taskItems));
    }

    static updateDueDate(index, date) {
        let taskItems = store.getTasks();

        taskItems[index].dueDate = date;
        localStorage.setItem('taskItems', JSON.stringify(taskItems));
    }
}

window.addEventListener('load', () => {
    const projects = store.getProjects();
    const projectName = store.getProjects()[0];
    const taskList = store.getTasks();

    displayController.dispAddTask();
    displayController.dispAddProject();
    displayController.loadProjectAndTasks(projectName, taskList);
    displayController.addAllProjectsToSelect(projects);
    displayController.setProjectSelect(projectName);
})

document.querySelector('.add-task').addEventListener('click', () => {
    displayController.dispAddTaskExp()
})

document.querySelector('.btn-container-exp').addEventListener('click', () => {
    displayController.clearAddTaskFields();
    displayController.dispAddTask();
})

document.querySelector('.add-project').addEventListener('click', () => {
    displayController.dispAddProjectExp();
})

document.querySelector('.project-btn-container').addEventListener('click', () => {
    displayController.dispAddProject();
    displayController.clearProjectField();
})

document.getElementById('saveProject').addEventListener('click', () => { 
    const projectName = document.getElementById('projectName').value;
    store.addProject(projectName);
    displayController.addProjectToList(projectName);
    displayController.dispNewProject(projectName);
    displayController.addProjectToSelect(projectName);
    displayController.setProjectSelect(projectName);
})

document.getElementById('project-content').addEventListener('input', e => {
    if(e.target.name === 'duedate') {
        const index = e.target.parentElement.parentElement.id;
        store.updateDueDate(index, e.target.value);
    }
})

document.querySelector('.project-list').addEventListener('click', e => {
    if(e.target.tagName === 'P') {
        const taskItems = store.getTasks();

        displayController.dispNewProject(e.target.innerText);
        displayController.displayProjectTasks(e.target.innerText, taskItems);
        displayController.setProjectSelect(e.target.innerText);
    }
})

document.querySelector('.project-list').addEventListener('click', e => {
    if(e.target.classList.contains('project-del-btn')) {
        e.target.parentElement.parentElement.remove();
        store.removeProject(e.target.parentElement.parentElement.id);
    }
})

document.querySelector('.project-list').addEventListener('click', e => {
    if(e.target.classList.contains('project-edit-btn')) {
        const projectItem = e.target.parentElement.parentElement;
        const projectEditField = e.target.parentElement.parentElement.nextElementSibling;

        displayController.toggleEditField(projectItem, projectEditField);
        projectEditField.value = projectItem.firstElementChild.innerText;
        projectEditField.focus();
    }
})

document.querySelector('.project-list').addEventListener('focusout', e => {
    if(e.target.tagName === 'INPUT') {
        const projectItem = e.target.previousElementSibling;
        const projectEditField = e.target;
        const origProject = projectItem.firstElementChild.innerText;
        const editProject = projectEditField.value;
        const index = projectEditField.parentElement.id;

        if(origProject !== editProject) {
            store.updateProject(editProject, index);
            projectItem.firstElementChild.innerText = projectEditField.value;
            store.updateProjectinTasks(origProject, editProject);
            displayController.dispNewProject(editProject);
            displayController.displayProjectTasks(editProject, store.getTasks());
            displayController.updateProjectSelect(origProject, editProject);
            displayController.setProjectSelect(editProject);
        }

        displayController.toggleEditField(projectItem, projectEditField);
    }
})

document.getElementById('save').addEventListener('click', () => {
    const title = document.getElementById('title-exp').value;
    const description = document.getElementById('description-exp').value;
    const dueDate = document.getElementById('dueDate-exp').value;
    const priority = document.getElementById('priority-exp').value;
    const project = document.getElementById('project-exp').value;
    const check = '';
    const addSelect = document.getElementById('project-exp');
    const projectName = document.querySelector('.project-header').innerText;
    const taskItems = store.getTasks();

    const newTask = new task(title, description, dueDate, priority, project, check);
    store.addTask(newTask);
    displayController.addTaskToList(newTask);
    displayController.setTaskId(taskItems.length - 1);
    displayController.clearAddTaskFields();
    // displayController.colorPriority(priority, setTaskId());  

    if(addSelect.value !== projectName.toLowerCase()) {
        displayController.dispNewProject(projectName)
        displayController.displayProjectTasks(projectName, taskItems)
    }
})

document.getElementById('project-content').addEventListener('click', (e) => {
    if(e.target.classList.contains('task-edit-btn')) {
        const modal = document.getElementById('todo-modal');
        const i = e.target.parentElement.parentElement.id;

        displayController.populateModal(i); 
        displayController.openModal(modal);
    }
})

document.getElementById('project-content').addEventListener('click', e => {
    if(e.target.classList.contains('task-delete-btn')) {
        const index = e.target.parentElement.parentElement.id;
        store.removeTaskFromStore(index);
        e.target.parentElement.parentElement.parentElement.remove();
    }
})

document.getElementById('saveModal').addEventListener('click', e => {
    const modal = document.querySelector('#todo-modal');
    const index = modal.querySelector('#modalId').value;
    const modalSelect = document.getElementById('project');
    const projectName = document.querySelector('.project-header').innerText;
    const taskItems = store.getTasks();

    store.updateTaskInStore(index);
    displayController.updateTaskInUI(index);
    displayController.closeModal(modal);

    if(modalSelect.value !== projectName.toLowerCase()) {
        displayController.dispNewProject(projectName)
        displayController.displayProjectTasks(projectName, taskItems)
    }
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
    const taskItems = store.getTasks();

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

