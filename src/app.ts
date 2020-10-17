import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';

import { logger as Logger } from '@utils';
import { Request, Response } from 'express';
import cors from 'cors';
import BaseRouter from './routes';
import './database/db';

import path from 'path';
import fs from 'fs';
const cert = fs.readFileSync('./src/cert/cert.pem');
const key = fs.readFileSync('./src/cert/key.pem');
import https from 'https';
// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", process.env.FRONT_END_APP_ADDR);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");
        next();
    });
}
app.use(express.static(path.join(__dirname, 'public')));
app.use('/v1.0/', BaseRouter);

app.get('/health', (req: Request, res: Response) => {
    res.json({
        code: 200,
        status: "success",
        message: "ok",
        service: 'Envitus Sensor API V1.0',
        version: 'v1.0',
        serverTime: new Date()
    })
});

const port = Number(process.env.PORT || 3000);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = https.createServer({
    key: key,
    cert: cert
}, app).listen(port, () => {
    Logger.info('Express server started on port: ' + port);
});

// Export express instance
export default app;
