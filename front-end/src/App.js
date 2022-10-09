import React, { useState, useEffect } from "react"
import './App.css';
import api from "./api"

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState("")

  useEffect(() => {
    const fetchTaskAndSetTasks = async () => {
      const tasks = await api.getTasks()
      setTasks(tasks)
    }
    fetchTaskAndSetTasks()
  }, [])

  const createTask = async e => {
    e.preventDefault()
    const newTask = await api.createTask(task)
    setTasks([...tasks, newTask])
  }

  return (
    <div className="App" >
      <header className="App-header">
        TaskKeeper
      </header>
      <div>
        <input
          id="task-input"
          type="text"
          value={task}
          onChange={({ target }) => setTask(target.value)}
        />
        <button type="button" onClick={createTask}>
          Add
        </button>
        <ul>
          {tasks.map(({ _id, taskDescription, completed }, i) => (
            <li key={i}>
              {taskDescription}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
