let express = require('express');

let app = express();


app.get('/welcome', (req, res) => {
    res.send('WELCOME!!!!!!!!!!!!!!!!!!!')
});




const PORT = 5100;

app.listen(PORT, () => {
    console.log(`the server has started on port ${PORT}`);
});