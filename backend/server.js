import http from 'http';

const server = http.createServer((req, res) => {
    res.end('voilà la réponse du second serveur !')
});

server.listen(process.env.PORT || 3000)