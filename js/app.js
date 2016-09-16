//PROBLEM: User Interatction doesn't provide desired results

//Solution: Add Interactivity fo that the user can manage daily tasks.

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkbox = document.createElement("input");
    //label
  var label = document.createElement("label");
    //input (text)
  var editInput = document.createElement("input");

  var editButton = document.createElement("button");
   
  var deleteButton = document.createElement("button");
  
  //each element needs modifying
  checkbox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;


  //each element needs appending
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask = function(){

console.log("Add Task")
  //Create list items
  var listItem = createNewTaskElement(taskInput.value);
  //append listitem to incompletetasksholder
  incompleteTasksHolder.appendChild(listItem)
  bindTaskEvents(listItem, taskCompleted);
}  
  
  
//Edit an existing task
var editTask = function(){
  console.log("Edit task")

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label")

  var containsClass=listItem.classList.contains("editMode");
  //if class has parent is .editmode
  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  // Toggle .editmode on the parent
  listItem.classList.toggle("editMode");
}  

//Delete an existing task
var deleteTask = function(){
    console.log("Delete task")
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
}


//Mark a task as complete
var taskCompleted = function(){
  console.log("task completed")

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);    
  bindTaskEvents(listItem, taskIncomplete);

}


//Mark a task as incomplete
var taskIncomplete = function(){
  console.log("task incomplete")
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}





var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
   console.log("Bind list item events");
   //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

   //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button 
  deleteButton.onclick = deleteTask;
  //bind checkboxEventHandler to checkbox
  checkBox.onchange = checkboxEventHandler;
}


//set the click handler to the addTask function
addButton.onclick = addTask;

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for(var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


  











