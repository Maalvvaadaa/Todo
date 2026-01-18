const todocontainer = document.querySelector('.todocontainer')
const basebutton = document.querySelector('#baseButton')
const baseInput = document.querySelector('#baseInput')
const listcontainer = document.querySelector('#listcontainer')
const filtertodo = document.querySelector('#filtertodo')

basebutton.addEventListener('click', addTodo)
//array that stores all new todos
let todoArray = []

function addTodo () {
  //check if input is emty and throw alert
  if (baseInput.value === '') {
    alert('Input text!')
    return
  }
  let singleTodo = {}

  //   //style the listcontainer
  //   listcontainer.setAttribute('id', 'listcontainer')

  //create text element
  let text = document.createElement('p')
  text.innerText = baseInput.value
  text.setAttribute('class', 'input')
  text.style.color = "white"


  let checkbtn = document.createElement('span')
  checkbtn.innerText = '✅'
  checkbtn.setAttribute('class', 'btn')
  let delbtn = document.createElement('span')
  delbtn.innerText = '🗑️'
  delbtn.setAttribute('class', 'btn')

  //listen to checkbtn click
  checkbtn.addEventListener('click', function () {
    text.classList.add('marked')
    singleTodo.marked = true
    console.log('todos', todoArray)
  })

  //listen to checkbtn click
  delbtn.addEventListener('click', function (e) {
    e.target.parentElement.remove()

    singleTodo.element.remove()
    //filter out the deleted todo from the array
    todoArray = todoArray.filter(function (todo) {
      return todo !== singleTodo
    })
    console.log('todos', todoArray)
  })

  //create todo container
  const nwetodo = document.createElement('div')
  nwetodo.setAttribute('class', 'listdiv')

  //append text inside the new todo before appending the todo inside the listcontainer
  nwetodo.appendChild(text)
  nwetodo.appendChild(checkbtn)
  nwetodo.appendChild(delbtn)

  //adding properties to single todo object
  singleTodo.element = nwetodo
  singleTodo.marked = false
  //   listcontainer.appendChild(nwetodo)
  todoArray.push(singleTodo)
  console.log('todos', todoArray)

  //render the todos
  renderTodos(todoArray)
  localStorage.setItem('todos', JSON.stringify(todoArray))

  //clear input value
  baseInput.value = ''
}

//filtering the todo when user  select from dropdown
filtertodo.addEventListener('change', function (e) {
  const value = e.target.value

  if (value === 'marked') {
    renderTodos(todoArray.filter(todo => todo.marked))
  } else if (value === 'unmarked') {
    renderTodos(todoArray.filter(todo => !todo.marked))
  } else {
    renderTodos(todoArray)
  }
})


//this is a function that rerenders each time you filter todos or add new todo
function renderTodos (todos) {

    console.log("ttt", todos);
    
  listcontainer.innerHTML = ''
  todos.forEach(todo => {
    listcontainer.appendChild(todo.element)
  })
}







