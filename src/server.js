const app = require("express")()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const path = require("path")

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"))
})

io.on("connection", (socket) => {
    io.emit("chat message", "--> Um novo usuário se conectou...")

    socket.on("typing", (msg) => {
        io.emit("typing", msg)
    })

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })

    socket.on("disconnect", () => {
        io.emit("chat message", "Um usuário abandonou o chat...")
    })
})

http.listen(3000, () => {
    console.log("Listening on *:3000")
})