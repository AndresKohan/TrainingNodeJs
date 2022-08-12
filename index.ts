import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from './routes';
import { default as mongoose } from 'mongoose';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

Routes.configure(app);

app.get('/', (req, res, next) => {
    res.status(500).send('Hello World!!');
})

app.post('/', (req, res, next)=> {
    console.log(req.body);
    res.send({"hello": 'world'});
})

const start = async () => {
    await mongoose.connect('mongodb://localhost');

    app.listen(3000, () => {
        console.log('server is listening on por 3000');
    });
}

start();