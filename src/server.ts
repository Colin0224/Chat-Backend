import express, {type Application, type Request, type Response} from "express"
import { createServer } from 'node:http';
import cors from 'cors';
import {dirname, join} from 'node:path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'node:url';
import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';


type Message = {

    chatID: string; 
    UserID: string; 
    msg: string; 
    timestamp: string; 
    userName: string; 

}



const filePath = path.join(import.meta.dirname, 'chat.json');

const data : Message[] = JSON.parse(
    await readFile(filePath, 'utf8').catch(async (err: any) => {
        if (err?.code !== 'ENOENT') throw err;
        await writeFile(filePath, '[]', 'utf8');
        return '[]';
    })
);
const app = express();

const port = 3000;

const corsOptions = {
    origin: '*'

};

const rooms = new Set();


// a few things to do, 1) make rooms a real feature, Done

// 2) fix the code thingy where you can generate a code, 
// 3) Standardize the Codes that are allowed (6 digit codes only), 
// 4)  make an error if code inputed is invalid, 
// wont load, and takes you to a blank page,
// 5) also i want to store the chats, probably in a sql table, 
// 6) fix the ui for the input button, 
// 7) maybe create a few objects lol




const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"],
        credentials: false
    }
}

);


const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cors(corsOptions));



app.get('/', (req:Request, res:Response) => {
    res.sendFile(join(__dirname, 'index.html'));
})


io.on('connection', (socket) => {

    socket.on('join-room', (roomId: string) => {

        const filteredData = data.filter((msg) => msg.chatID === roomId);
        socket.join(roomId);
        filteredData.map((data) => {
            socket.emit('message', data)
        })
        

    })

    socket.on("leave-room", (roomName) => {
        socket.leave(roomName); 
        
    })
    socket.on('message', (msg) => {
        console.log(msg)
        console.log('received message from', socket.id, ':', msg)

        msg['timestamp'] = new Date().toISOString();
        data.push(msg);
        writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(msg.chatID);
        io.to(msg.chatID).emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});