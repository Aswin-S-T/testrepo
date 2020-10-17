import mongoose from 'mongoose';
import { logger as Logger } from '@utils';

const DB_URL = String(process.env.DB_URL);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// When successfully connected
mongoose.connection.on('connected', function () {
    Logger.info('Mongoose default connection open to ' + DB_URL);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    Logger.info('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    Logger.info('Mongoose default connection disconnected');
});

export default mongoose;