const io = require('socket.io')(8900,{
    cors:{
        origin: 'http://localhost:3000'
    }
})

let gameSessions = {}

const addUser = (userName, socketId, gameSessionId) => {
    gameSessions = {
        ...gameSessions,
        [gameSessionId]: {
            ...gameSessions.gameSessionId,
            users : [...gameSessions[gameSessionId].users, {userName, socketId}]
        }
    }
}

io.on('connection', socket=>{
    console.log('a user connected')

    socket.on('numberOfPlayers',(data)=>{
          numberOfPlayers = data.quantity
          gameSessions[data.gameSessionId] = {
              numberOfPlayers : data.quantity,
              users: []
          }
          console.log(gameSessions)
          io.emit('getNumberOfPlayers', data.quantity)
      })

    socket.on('addUser', ({userName, gameSessionId})=>{
        addUser(userName, socket.id, gameSessionId)
        io.emit("getUsers", gameSessions[gameSessionId].users)
    })

    socket.on('requestUsers', (gameSessionId)=>{
        io.emit("getUsers", gameSessions[gameSessionId].users)
    })

    socket.on('requestNumberOfPlayers', ()=>{
        io.emit("getNumberOfPlayers", numberOfPlayers)
    })

    socket.on('joiningSession', ({gameSessionId})=>{
        io.emit("getSession", gameSessionId)
    })



/*     socket.on('disconnect', ()=>{
        console.log('A user has disconnected')
        removeUser(socket.id)
        io.emit("getUsers", users)
    }) */
})


/* const removeUser = (socketId) =>{
    users = users.filter(user=> user.socketId !== socketId)
}
 */