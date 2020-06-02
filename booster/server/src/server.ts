import express, { response } from 'express';

const app = express();

app.get('/users', (request, response) =>{
    console.log('Listagem de usuário');


    response.json([
        'Diego',
        'Cleiton',
        'Robson',
        'Elza'
    ]);
});


app.listen(3333);