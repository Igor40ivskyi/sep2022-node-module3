let express = require('express');

let app = express();

const users = [
    {
        name: 'Andriy',
        age: 34,
        gender: 'male',
    },
    {
        name: 'Ivan',
        age: 24,
        gender: 'male',
    },
    {
        name: 'Artem',
        age: 23,
        gender: 'male',
    },
    {
        name: 'Anna',
        age: 19,
        gender: 'female',
    },
    {
        name: 'Lilya',
        age: 14,
        gender: 'female',
    },
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    let user = users[+userId - 1];

    res.json(user);
});

app.get('/welcome', (req, res) => {
    res.send('WELCOME!!!!!!!!!!!!!!!!!!!')
});




const PORT = 5100;

app.listen(PORT, () => {
    console.log(`the server has started on port ${PORT}`);
});