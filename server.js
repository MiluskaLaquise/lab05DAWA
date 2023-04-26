// Importar las dependencias
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Ruta para el archivo HTML
app.get('/', function(req, res){
    res.render(__dirname + '/views/fomr.ejs');
});

app.post('/chat', (req, res) => {
    const username = req.body.username

    res.render(__dirname + '/views/chat.ejs', {username:username});
    
});


// Escuchar la conexión de Socket.IO
io.on('connection', function(socket){
    console.log('Usuario conectado');


    // Escuchar el evento 'chat message 1' para el chat 1
    socket.on('chat message 1', function(msg){
        console.log('Mensaje del chat 1: ' + msg);
        io.emit('chat message 1', msg);
    });


    // Escuchar el evento 'chat message 2' para el chat 2
    socket.on('chat message 2', function(msg){
        console.log('Mensaje del chat 2: ' + msg);
        io.emit('chat message 2', msg);
    });


    // Escuchar la desconexión del usuario
    socket.on('disconnect', function(){
        console.log('Usuario desconectado');
    });
});


// Iniciar el servidor HTTP en el puerto 3000
http.listen(3000, function(){
    console.log('Servidor escuchando en http://localhost:3000');
});
