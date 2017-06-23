import 'colors';
import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api';
import {config} from './config/config.js';
import path from 'path';
import mongoose from 'mongoose';
import {Article} from './models/Articles';

mongoose.Promise = Promise;
let db = mongoose.connection;

db.on('error', (err) => {
	cnosole.log(err);
});

db.once('open', () => {
	console.log('Connected Successfully');
});

let app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));

app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

api(app);

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.server.listen(config.port);

console.log(`NODE_ENV=${config.env}`.blue);
console.log(`Started on port ${config.port}`.blue);

export default app;