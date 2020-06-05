const express = require("express");
const server = express()

//Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.use(express.static("public"))

server.get("/", (request, response) => {
    return response.render("index.html", { title: "Seu marketplace de coleta de resíduos" })
})

server.get("/create-point", (request, response) => {
    return response.render("create-point.html")
})

server.get("/search-results", (request, response) => {
    return response.render("search-results.html")
})

server.listen(3000, (request, response) => {
    console.log(`Servivor rodando na porta http://localhost:${3000}`)
})


//Full MVC