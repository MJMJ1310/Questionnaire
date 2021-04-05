const express = require('express');
const mongoose = require('mongoose');
const app = express();

const questionSchema = new mongoose.Schema({
    content: String,
    type: String
});

const questionnaireSchema = new mongoose.Schema({
    name: String,
    isDefault: Boolean,
    questions: [questionSchema]
});

const userInfoSchema = new mongoose.Schema({
    userName: String,
    password: String,
    isAdmin: Boolean
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);
const UserInfo = mongoose.model('UserInfo', userInfoSchema);

// Connects mongoDB
mongoose.connect('mongodb://localhost/questionnaire')
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch(() => console.log('Could not connect to MongoDB.'));

app.use(express.json());
app.use((req, res, next) => {
    console.log('HTTP Log:- ', req.method, req.url);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Receives request from UI for validating user
app.get('/api/userInfo/:userName/:password', (req, res) => {
    validateUser(req.params.userName, req.params.password, res);
});

// Receives request from UI for getting Question layouts
app.get('/api/questionnaire', (req, res) => {
    getQuestionnaire(res);
});

// Receives request from UI for inserting new layout
app.post('/api/questionnaire', (req, res) => {
    const newLayout = req.body.newLayout;
    const layout = new Questionnaire({
        name: newLayout.name,
        isDefault: false,
        questions: [...newLayout.questions]
    });
    insertQuestionnaire(layout, res);
});

// Receives request from UI for Updating a layout
app.put('/api/questionnaire', (req, res) => {
    const updatedLayout = req.body.updatedLayout;
    updateQuestionnaire(updatedLayout, res);
});

// Async method to get user details corresponding to user id,
// and sends back user flags specifying if the user is valid and is the user id admin
async function validateUser(userName, password, res) {
    UserInfo.find({ userName: userName }).then((result) => {
        console.log(result, password);
        const userFlags = {
            isAdmin: result[0].isAdmin,
            isValidUser: result[0].password === password
        }
        res.send(userFlags);
    }).catch((err) => res.send(err));
}

// Async method to get and send back the questionnaire with all layouts
async function getQuestionnaire(res) {
    const questionnaire = await Questionnaire.find();
    res.send(questionnaire);
}

// Async method to update a question layout
async function updateQuestionnaire(layout, res) {
    const result = await Questionnaire.updateOne({ _id: layout._id }, {
        $set: {
            name: layout.name,
            isDefault: false,
            questions: layout.questions,
        }
    });
    res.send(result);
}

// async method to insert a question layout
async function insertQuestionnaire(layout, res) {
    const result = await layout.save();
    res.send(result._id);
}

const port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));