import express from 'express';

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/welcome', (req, res) => {
    res.json('WELCOMEeeeeeeeeeeee');
});




const PORT = 5100;

app.listen(PORT, () => {
    console.log(`the server has started on port ${PORT}`);
});