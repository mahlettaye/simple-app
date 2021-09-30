import React, {useState, useRef, useEffect } from "react";
import Todolist from "./Todolist"
import {v4 as uuidv4} from 'uuid'
// import uuidv4 from 'uuid/v4'



const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, settodos]= useState([])
  const todoNameRef = useRef ()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    
    if (storedTodos) settodos (storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    
  }, [todos])


  function toggleTodo (id) {
      const newTodos = [...todos]
      const todo = newTodos.find(todo => todo.id === id)
      todo.complete = !todo.complete
      settodos (newTodos)

  }

  function handleAddTodo (e) {
      const name = todoNameRef.current.value
      if (name === '') return 
      settodos(prevTodos => {
        return [...prevTodos, {id:uuidv4, name:name, complete:false}]
      })
      console.log(name)
      todoNameRef.current.value = null
  }

  function handleClearTodos (){
      const newtodos = todos.filter (todo => !todo.complete)
      settodos(newtodos)
  }

  return (
    <>
    <Todolist todos = {todos} toggleTodo = {toggleTodo}/>

    <input ref = {todoNameRef}type = "text" />
    <button onClick =  {handleAddTodo}> Add Todo </button>
    <button onClick = {handleClearTodos}> Clear Todo </button>
    <div> {todos.filter(todo => !todo.complete).length} left to do </div> 
    </>
  )
}

export default App;
