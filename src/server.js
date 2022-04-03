const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs');
const socket = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = socket(server)
const {fetch, fetchAll} = require('./lib/postgres.js')
const { MESSAGE_QUERY } = require('./modules/user/query.js')
const Module = require('./modules/index.js')


app.use( express.json() )
app.use( cookieParser() )
app.use( cors() )

app.use( express.static( path.join( __dirname, '../public/' ) ) )

// load Module
app.use( Module )


app.get('/', (req,res) => {
    if(!req.cookies.userId) res.redirect('/register')
    else res.sendFile(path.join(process.cwd(), 'public', 'views', 'index.html'))
})

app.get('/register', (req,res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'views', 'register.html'))
})



// Socket 

io.on('connection', socket => {
    socket.on('new_message',( {user_id, receiver_id, massage} ) => {
        fetch(MESSAGE_QUERY, user_id, receiver_id, massage).then((user) => {
            socket.broadcast.emit('send_message', user)
        })
    });
})


// server listen port
server.listen(5000, () => {
    console.log(`http://localhost:5000`)
})