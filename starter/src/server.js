const express = require("express");
const server = express()


/**
 * Habilitando o uso do req.body
 */
server.use(express.urlencoded({ extended: true }))

/**
 * Buscando banco de dados
 */
const db = require('./database/db')


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

    // req.query Query String

    return response.render("create-point.html")
})

server.post("/savepoint", (request, response) => {

    // req.query Query String
    const query = `
        INSERT INTO places (
            image,
            name,
            adress, 
            adress2, 
            state,
            city,
            items
            ) VALUES (?,?,?,?,?,?,?);
    `

    /**
     * Inserindo no banco de dados
     */

    const values = [
        request.body.image,
        request.body.name,
        request.body.adress,
        request.body.adress2,
        request.body.state,
        request.body.city,
        request.body.items

    ]

    /**
     * Função de registro que retorna um erro, caso houver
     */

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return response.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso!!!!")
        console.log(this)

        return response.render("create-point.html", { saved: true })
    }

    /**
     * Rodando função de inserir banco, colunas, valores
     */
    db.run(query, values, afterInsertData)

})


server.get("/search", (request, response) => {

    const search = request.query.search

    if(search == "") {
        return response.render("search-results.html", { total: 0 })
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        return response.render("search-results.html", { places: rows, total: total })
    })
})


server.listen(3000, (request, response) => {
    console.log(`Servivor rodando na porta http://localhost:${3000}`)
})


//Full MVC