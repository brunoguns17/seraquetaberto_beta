console.log("Inicio do projeto");

const express = require ("express");

const bodyParser =require("body-parser");

const app = express();

app.use(bodyParser.json());
//============================================= Tabela Comercios ==============================================================================================
app.get('/comercios',(req,res)=>{
    return res.json([{id:1, tipo:"loja",nome:"jaguar",data:"05/07/2020"},{id:2, tipo:"farmacia",nome:"Doente Dengue",data:"05/07/2020"}])});

app.get("/comercios/:id",(req,res)=>{return res.json({id:1, tipo:"loja",nome:"jaguar",data:"05/07/2020"})});

app.delete("/comercios/:id",(req,res)=>{return res.json({menssage:"Excluido"})});

app.put("/comercios/:id",(req,res)=>{return res.json(req.body)});

app.post("/comercios",(req,res)=>{return res.json(req.body)});

//============================================= Tabela tipo ==============================================================================================

app.get('/tipos',(req,res)=>{return res.json([{id:1, tipo:"mercantil",nome:"escravos do amanhã",endereço:"rua raimundo queimado,centro",seg_ab:"",seg_cd:"",seg_fg:"",seg_gh:"",},{id:2, tipo:"farmacia",nome:"remdios piratas",data:"05/07/2019"}])});

app.get("/tipos/:id",(req,res)=>{return res.json({id:1, tipo:"loja",nome:"roupas mofadas",data:"05/07/2020"})});

app.delete("/tipos/:id",(req,res)=>{return res.json({menssage:"Excluido"})});

app.put("/tipos/:id",(req,res)=>{return res.json(req.body)});

app.post("/tipos",(req,res)=>{return res.json(req.body)});





app.listen(3333); 