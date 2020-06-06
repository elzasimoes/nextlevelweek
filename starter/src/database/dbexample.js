const sqlite3 = require('sqlite3').verbose() 

const db = new sqlite3.Database("./src/database/database.sqlite")

/**
 * Criando a tabela no banco de dados
 */

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
})

/**
 * Inserindo colunas no banco
 */
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
 * Inserindo valores
 */

const values = [
    "https://images.unsplash.com/photo-1481761289552-381112059e05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "Papersider",
    "Rua do Sul, Santa Catarina. Guilherme Sei lá do que, Jardim América",
    "N 522",
    "Amazonas",
    "Manaus",
    "Papeis e Papelão"
]

/**
 * Função de registro que retorna um erro, caso houver
 */

function afterInsertData(err) {   
        if(err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!!!!")
        console.log(this)    
}


/**
 * Rodando função de inserir banco, colunas, valores
 */
db.run(query, values, afterInsertData)


/**
 * Deletando registro do banco
 */

db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    if(err) {
        return console.log(err)
    }

    console.log("Registro deletado com sucesso")
})


/**
 * Selecionando registros
 */

//`SELECT name FROM places`
db.all(`SELECT name FROM places`, function(err, rows) {
    if(err) {
        return console.log(err)
    }

    console.log("Aqui estão seus registros: ")
    console.log(rows)   
})