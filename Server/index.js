const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    // console.log(socket)
  socket.on('message', ({ name, message }) => {
    //   console.log(message)
    //   console.log(name)
    io.emit('message', { name, message })
  })
})

// io.on("connection", function(socket) {
//     console.log('socket connected');
// });

http.listen(4000, function() {
  console.log('listening on port 4000')
})