const express = require('express')
const app = express()
const routes = require('./routes');
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE'
}));
app.use(express.json());
app.use('/', routes);


app.listen(3001, ()=>{
    console.log('Rodando...')
})