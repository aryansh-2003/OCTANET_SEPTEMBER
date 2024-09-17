const todoform = document.querySelector('form');
const todoinput = document.getElementById('todo-input');
const todolistul = document.getElementById('todo-list');

let alltodos =gettodos();
updatetodolist();

todoform.addEventListener('submit', function(e){
    e.preventDefault();
    addtodo();
})
function addtodo(){
    const todotext = todoinput.value.trim();
    if(todotext.length > 0){
        const todoobject = {
            text: todotext,
            completed: false
        }
        alltodos.push(todoobject);
        updatetodolist();
        savetodos();
        todoinput.value = "";
    }
}
function updatetodolist(){
    todolistul.innerHTML = "";
    alltodos.forEach((todo,todoindex)=>{
        todoitem = createtodoitem(todo,todoindex);
        todolistul.append(todoitem);
    })

}
function createtodoitem(todo, todoindex){
  const todoid = "todo-"+todoindex;
  const todoli = document.createElement("li");
  const todotext = todo.text;
  todoli.className = "todo";
  todoli.innerHTML = `<input type="checkbox" id="${todoid}">
  <label class="custom-checkbox" for="todo-1"><i style="color: transparent;" class="fa-solid fa-check"></i></label>
  <label for="${todoid}" class="todo-text">
  ${todotext}
  </label>
  <button class="delete-button">
      <i style="color:var(--secondary-color)" class="fa-solid fa-trash-can"></i>
  </button>
      `;
    const deletebutton = todoli.querySelector(".delete-button");
    deletebutton.addEventListener("click",()=>{
        deletodoitem(todoindex);
    })
    const checkbox = todoli.querySelector("input");
    checkbox.addEventListener("change",()=>{
        alltodos[todoindex].completed = checkbox.checked;
        savetodos();
    })
   checkbox.checked = todo.completed;
  return todoli;
function deletodoitem(todoindex){
    alltodos = alltodos.filter((_,i)=> i !==todoindex);
    savetodos();
    updatetodolist();
}
}
function savetodos(){
    const todojson = JSON.stringify(alltodos)
    localStorage.setItem("todos",todojson)
}
function gettodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}