// import express from 'express'
// import { router } from './routes'
// import cors from 'cors'

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use(router)

// app.listen(3030, () => console.log('🚀 Server listening'))

import express from 'express';
import { router } from './routes';
import cors from 'cors';

const app = express();

// Configurando CORS para aceitar requisições apenas do frontend no localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Permita o frontend fazer requisições
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Defina os métodos HTTP permitidos
  allowedHeaders: ['Authorization', 'Content-Type'], // Permita cabeçalhos específicos
}));

app.use(express.json());
app.use(router);

app.listen(3030, () => console.log('🚀 Server listening on port 3030'));
