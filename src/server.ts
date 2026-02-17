import express, {type Application, type Request, type Response} from "express"
import cors from 'cors';

const app: Application = express();
const port = 3000;

const corsOptions = {
    origin: 'localhost:5173'
}

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cors(corsOptions));

app.get('/', (req:Request, res:Response) => {
    res.json('Hello, Typescript + Express');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});