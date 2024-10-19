import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
const port = 3000;

// Configurar rota estática para servir os arquivos da build do React
app.use('/', express.static(path.resolve(path.join(".", 'dist'))));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.join(".", 'dist', 'index.html')));
});  

// Outras rotas e configurações do seu servidor Express podem ser adicionadas aqui

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Aplicativo React rodando em http://localhost:${port}`);
});
