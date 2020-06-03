import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors'

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.get('/', (request, response) =>{
    return response.json({ message: 'Hello World' });
});

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.listen(3333);




