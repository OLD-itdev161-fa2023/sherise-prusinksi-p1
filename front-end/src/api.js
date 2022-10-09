import axios from "axios"

const API_URL = "http://localhost:8081/tasks/"

async function createTask(task) {
    const params = JSON.stringify({
        "taskDescription": task, "completed": false
    });
    const { data: newTask } = await axios.post(API_URL, params, {
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
        }
    });
    return newTask
}

async function deleteTask(id) {
    const message = await axios.delete(`${API_URL}${id}`)
    return message
}

async function updateTask(id, payload) {
    const { data: newTask } = await axios.put(`${API_URL}${id}`, payload)
    return newTask
}

async function getTasks() {
    const { data: todos } = await axios.get(API_URL)
    return todos
}


export default { createTask, deleteTask, updateTask, getTasks }