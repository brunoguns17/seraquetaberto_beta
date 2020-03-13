const { bd_config } = require("./config.json");
const Pool = require("pg").Pool;
const pool = new Pool(bd_config);

//======================================== configuração banco de dados 

console.log("Inicio do projeto");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//============================================= Tabela Comercios 
app.get('/comercios', (req, res) => {
    pool.query("select * from comercios", (error, results) => {
        if (error) {
            throw error;

        }
        res.json(results.rows);
    });
});


app.get("/comercios/:id",  (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("select * from comercios where id = $1", [id], (error, results) => {
        if (error) {
            throw error;

        }
        res.json(results.rows);
    });
});



app.delete("/comercios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    pool.query("delete from comercios where id = $1", [id], (error, results) => {
        if (error) {
            throw error;

        }
        res.send(`Usuario deletado: ${id}`);
    });
});


app.post("/comercios", (req, res) => {
    const {
        nome,tipo,endereço,telefone,seg_ab,seg_cd,seg_ef,seg_gh,ter_ab,ter_cd,ter_ef,ter_gh,qua_ab,qua_cd,qua_ef,qua_gh,qui_ab,qui_cd,qui_ef,qui_gh,sex_ab,sex_cd,sex_ef,sex_gh,sab_ab,sab_cd,sab_ef,sab_gh,dom_ab,dom_cd,dom_ef,dom_gh 
    } = req.body;

    pool.query(
        "insert into comercios (nome,tipo,endereço,telefone,seg_ab,seg_cd,seg_ef,seg_gh,ter_ab,ter_cd,ter_ef,ter_gh,qua_ab,qua_cd,qua_ef,qua_gh,qui_ab,qui_cd,qui_ef,qui_gh,sex_ab,sex_cd,sex_ef,sex_gh,sab_ab,sab_cd,sab_ef,sab_gh,dom_ab,dom_cd,dom_ef,dom_gh) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32)",
        [nome,tipo,endereço,telefone,seg_ab,seg_cd,seg_ef,seg_gh,ter_ab,ter_cd,ter_ef,ter_gh,qua_ab,qua_cd,qua_ef,qua_gh,qui_ab,qui_cd,qui_ef,qui_gh,sex_ab,sex_cd,sex_ef,sex_gh,sab_ab,sab_cd,sab_ef,sab_gh,dom_ab,dom_cd,dom_ef,dom_gh],
        (error, results) => {
            if (error) {
                throw error;

            }
            res.status(201).send(`usuario added with Id:${results.insertid}`)
        }
    );

});

app.put("/comercios/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const {
        nome,tipo,endereço,telefone,seg_ab,seg_cd,seg_ef,seg_gh,ter_ab,ter_cd,ter_ef,ter_gh,qua_ab,qua_cd,qua_ef,qua_gh,qui_ab,qui_cd,qui_ef,qui_gh,sex_ab,sex_cd,sex_ef,sex_gh,sab_ab,sab_cd,sab_ef,sab_gh,dom_ab,dom_cd,dom_ef,dom_gh
    } = req.body;

    pool.query(
        "update comercios SET (nome,tipo,endereço,telefone,seg_ab,seg_cd,seg_ef,seg_gh,ter_ab,ter_cd,ter_ef,ter_gh,qua_ab,qua_cd,qua_ef,qua_gh,qui_ab,qui_cd,qui_ef,qui_gh,sex_ab,sex_cd,sex_ef,sex_gh,sab_ab,sab_cd,sab_ef,sab_gh,dom_ab,dom_cd,dom_ef,dom_gh) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32)",
        [nome,tipo,endereço,telefone,seg_ab,seg_cd,seg_ef,seg_gh,ter_ab,ter_cd,ter_ef,ter_gh,qua_ab,qua_cd,qua_ef,qua_gh,qui_ab,qui_cd,qui_ef,qui_gh,sex_ab,sex_cd,sex_ef,sex_gh,sab_ab,sab_cd,sab_ef,sab_gh,dom_ab,dom_cd,dom_ef,dom_gh],
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

//================================== EXEMPLO DE API CONECTADA COM O BANCO DE DADOS, JÁ EM FUNCIONAMENTO =====================================================================

/*
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

*/
