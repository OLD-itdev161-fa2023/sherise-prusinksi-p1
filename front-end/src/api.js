import axios from "axios"

const API_URL = "http://localhost:8081/tasks/"

async function createTask(task) {
    const params = JSON.stringify({
        "taskDescription": task, "completed": false
    });

    try {
        const response = await axios.post(API_URL, params, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            if (response.status === 400 || response.status === 422) {
                alert(response.data.errors[0].msg);
            } else if (response.status !== 200) {
                alert("Dunno what happened ¯\_(ツ)_/¯");
            }
            throw new Error(response);
        }
        else
            return response.data;
    } catch (exception) {
        alert(exception);
    }
    return params;
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