const connectDatabase = require("./config/db") //database server
const express = require("express") // express application server
const app = express() // generate an app object
const expressValidator = require('express-validator') //to validate incoming requests
const Task = require("./models/task");
const bodyParser = require("body-parser") // requiring the body-parser
const PORT = process.env.PORT || 8081 // port that the server is running on => localhost:8081
app.use(bodyParser.json()); // telling the app that we are going to use json to handle incoming payload

//Configure Middleware
const cors = require('cors');
app.use(express.json({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:8080'
    })
);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

connectDatabase(); //Connect to mongoDB database

function success(res, payload) {
    return res.status(200).json(payload)
}

//API endpoints
app.get('/', (req, res) =>
    /**
     * @route GET /
     * @desc Test endpoint
     */
    res.send('TaskKeeper back-end up-and-running!')
);

/**
* @route POST /tasks
* @desc Add a new task
*/
app.post(
    "/tasks",
    [
        expressValidator.check('taskDescription', 'Please enter task description')
            .not()
            .isEmpty(),
        expressValidator.check('completed', 'Please enter is task completed')
            .not()
            .isEmpty(),
    ],
    async (req, res, next) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            try {
                const { taskDescription, completed } = req.body;
                //Check if task exists
                let task = await Task.findOne({ taskDescription: taskDescription });
                if (task) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Task already exists' }] });
                }
                task = Task.create(req.body);
                return success(res, task);
            } catch (error) {
                next({ status: 400, message: "Failed to create task" })
            }
        }
    }
);

app.listen(PORT, () => {
    // listening on port 3000
    console.log(`listening on port ${PORT}`) // print this when the server starts
})