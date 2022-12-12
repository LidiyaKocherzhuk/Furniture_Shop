import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import { Server } from 'socket.io';
import cors from 'cors';
import * as http from 'http';

import { apiRouter } from './router/apiRouter';
import { config } from './config';
import { CronWelcomeEmail } from './cron/welcomeEmail';
import { socketCommentController } from './controllers';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: config.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(apiRouter);

const { PORT } = config;
const dbConnection = async () => {
    try {
        console.log(`Server has started on port ${PORT}`);

        const connection = await createConnection();
        if (connection) {
            console.log('database connected');
            CronWelcomeEmail();

            io.on('connection', (socket: any) => {
                socket.on('send_productId', async (data: {productId:number}) => {
                    await socketCommentController.getById(socket, data);
                });

                socket.on('new_messages', async (data: any) => {
                    await socketCommentController.saveMessages(io, data);
                });

                socket.on('delete_comment', async (data: any) => {
                    await socketCommentController.delete(io, data);
                });
            });
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
};

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

server.listen(PORT, dbConnection);
