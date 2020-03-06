const { bd_config } = require("./config.json");
const Pool = require("pg").Pool;
const pool = new Pool(bd_config);

//======================================== configuração banco de dados ========================================================================================

console.log("Inicio do projeto");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

/*app.use(bodyParser.json());
//============================================= Tabela Comercios ==============================================================================================
app.get('/comercios', (req, res) => {
    return res.json([{ id: 1, tipo: "loja", nome: "jaguar", data: "05/07/2020" }, { id: 2, tipo: "farmacia", nome: "Doente Dengue", data: "05/07/2020" }])
});

app.get("/comercios/:id", (req, res) => { return res.json({ id: 1, tipo: "loja", nome: "jaguar", data: "05/07/2020" }) });

app.delete("/comercios/:id", (req, res) => { return res.json({ menssage: "Excluido" }) });

app.put("/comercios/:id", (req, res) => { return res.json(req.body) });

app.post("/comercios", (req, res) => { return res.json(req.body) });

//============================================= Tabela tipo ==============================================================================================

app.get('/tipos', (req, res) => { return res.json([{ id: 1, tipo: "mercantil", nome: "escravos do amanhã", endereço: "rua raimundo queimado,centro", seg_ab: "", seg_cd: "", seg_fg: "", seg_gh: "", }, { id: 2, tipo: "farmacia", nome: "remdios piratas", data: "05/07/2019" }]) });

app.get("/tipos/:id", (req, res) => { return res.json({ id: 1, tipo: "loja", nome: "roupas mofadas", data: "05/07/2020" }) });

app.delete("/tipos/:id", (req, res) => { return res.json({ menssage: "Excluido" }) });

app.put("/tipos/:id", (req, res) => { return res.json(req.body) });

app.post("/tipos", (req, res) => { return res.json(req.body) })
*/



//================================== API CONECTADA COM O BANCO DE DADOS, JÁ EM FUNCIONAMENTO =====================================================================


app.get("/usuarios", (req, res) => {
    pool.query("select * from usuarios", (error, results) => {
        if (error) {
            throw error;

        }
        res.json(results.rows);
    });
});


app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("select * from usuarios where id = $1", [id], (error, results) => {
        if (error) {
            throw error;

        }
        res.json(results.rows);
    });
});

app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("delete from usuarios where id = $1", [id], (error, results) => {
        if (error) {
            throw error;

        }
        res.send(`Usuario deletado: ${id}`);
    });
});


app.post("/usuarios", (req, res) => {
    const {
        id, nome, idade
    } = req.body;

    pool.query(
        "insert into usuarios (id,nome,idade) values($1,$2,$3)",
        [id, nome, idade],
        (error, results) => {
            if (error) {
                throw error;

            }
            res.status(201).send(`usuario added with Id:${results.insertid}`)
        }
    );

});


app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {
        nome, idade
    } = req.body;

    pool.query(
        "update usuarios SET nome = $2, idade = $3 where id =$1",
        [id, nome, idade],
        (error, results) => {
            if (error) {
                throw error;

            }
            res.status(201).send(`Usuario aletrado com ID: ${id}`);
        }


    )

});





app.listen(3333, () => {
    console.log("App running on port 3333.")
});