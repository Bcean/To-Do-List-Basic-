let submitInput = document.querySelector("#taskInput");
const buttonSubmit = document.querySelector("#sumbitButton");
let toDoContainer = document.querySelector("#taskList");
let clearBtn = document.querySelector("#clearButton")
let submitTaskData;
let newTaskItemContainer;
let newTaskCheckBox;
let newTaskText;
let newDeleteButton;
let taskCounter = 0;
let taskID;
let taskcreated = false;
let groupDeleteButton;
let groupDeleteButtonArray;
let newEditButton;
let newInputEditTask;
let editTaskData;
let deleteIcon;
let editIcon;
clearBtn.addEventListener("click", clearToDo)
submitInput.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        addToDo();
    }
})
buttonSubmit.addEventListener("click", addToDo)
toDoContainer.addEventListener("click", deleteCheckEditToDo)
function addToDo(event){
    
        //to make tasks unique add counter
    taskCounter++;
    taskcreated = true;
    //STORE INPUT VALUE IN VARIABLE
    submitTaskData = submitInput.value;
    taskID = `task-${submitTaskData}-${taskCounter}`;
    //create div with task item = to input and button that looks like a delete button
    newTaskItemContainer = document.createElement('div');
    newTaskItemContainer.classList.add("taskItemContainer");
    toDoContainer.appendChild(newTaskItemContainer);
    

    newTaskCheckBox = newTaskItemContainer.appendChild(document.createElement("input"));
    newTaskCheckBox.type = "checkbox";
    newTaskCheckBox.id = `checkbox-${taskID}`;
    newTaskCheckBox.classList.add("taskcheck");

    newTaskText = newTaskItemContainer.appendChild(document.createElement("label"));
    newTaskText.innerText = submitInput.value;
    newTaskText.setAttribute("for", `checkbox-${taskID}`);

    newEditButton = newTaskItemContainer.appendChild(document.createElement("button"));
    newEditButton.classList.add("editButton");

    editIcon = newEditButton.appendChild(document.createElement("i"));
    editIcon.classList.add("fa-solid","fa-pen-to-square");
    editIcon.style.color ="#ffffff";


    newDeleteButton = newTaskItemContainer.appendChild(document.createElement("button"));
    newDeleteButton.classList.add("deleteButton");

    deleteIcon = newDeleteButton.appendChild(document.createElement("i"));
    deleteIcon.classList.add("fa-solid", "fa-trash");
    
   
}
//event target adds uniqueness to element
function deleteCheckEditToDo(event){
    //event.target is basically listening to all clicks on the todo container and you can access the element with the specific class
    let item = event.target; //anything we click
    if (item.className == "deleteButton" ){
        item = item.parentElement; //access clicked elements parents
        item.remove();
    }else if(item.className == "fa-solid fa-trash"){
        let iconBtnParent = item.parentElement;
        let properContainer = iconBtnParent.parentElement;

        properContainer.remove();

    }else if (item.className == 'taskcheck'){
        if(item.checked){
            item = item.parentElement; //access clicked elements parents
            item.classList.add("taskItemAnimation");
            //add animation and then remove it after its done
            item.addEventListener("animationend", function(){
                item.remove();
                
            })
        }
    }else if (item.className == "editButton"){
       //access prev sibling
       prevSib = item.previousSibling;
       prevSib.style.display = "none";
       //puts input before edit button so
       newInputEditTask = document.createElement('input')
       newInputEditTask.classList.add('editInput')
       let itemParent = item.parentElement;
       itemParent.insertBefore(newInputEditTask, item);
       newInputEditTask.addEventListener('keydown', function(event){
            if (event.key == "Enter"){
                editTaskData = newInputEditTask.value;
                //CHANGE TEXT
                prevSib.innerText = editTaskData;
                prevSib.style.display = "inline";
                newInputEditTask.remove();
                
            }
       })  
    }else if(item.className == "fa-solid fa-pen-to-square"){
        item = item.parentElement;
        //access prev sibling
       prevSib = item.previousSibling;
       prevSib.style.display = "none";
       //puts input before edit button so
       newInputEditTask = document.createElement('input')
       newInputEditTask.classList.add('editInput')
       let itemParent = item.parentElement;
       itemParent.insertBefore(newInputEditTask, item);
       newInputEditTask.addEventListener('keydown', function(event){
            if (event.key == "Enter"){
                editTaskData = newInputEditTask.value;
                //CHANGE TEXT
                prevSib.innerText = editTaskData;
                prevSib.style.display = "inline";
                newInputEditTask.remove();
                
            }
       }) 

    

    }else{
        console.log("not trash")
    }
    
}

function clearToDo(){
    //remove children of container
    toDoContainer.replaceChildren();
}






