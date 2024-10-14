import express from 'express';
import { router } from './routes';
import cors from 'cors';
// import { verifyToken } from './middlewares/authMiddleware'; 

const app = express();

// Configurando CORS para aceitar requisições apenas do frontend no localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Permita o frontend fazer requisições
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Cache-Control'],
  exposedHeaders: ['Authorization']
}));


app.use(express.json());
// app.use(verifyToken); 
app.use(router);

app.listen(3030, () => console.log('🚀 Server listening on port 3030'));
