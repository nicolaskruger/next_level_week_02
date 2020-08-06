const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsaap: "80028922", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "quimica", 
        cost: "R$ 20,00", 
        weekday: [0], 
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Diego Fernandes2",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsaap: "80028922", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "quimica", 
        cost: "R$ 20,00", 
        weekday: [0], 
        time_from: [720],
        time_to: [1220]
    }
];


subject= [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
];
weekday= [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];

const express= require('express');
const server = express();


server.use(express.static("public"))
server.use(express.urlencoded({extended:true}));

const nunjucks = require("nunjucks");
nunjucks.configure("src/view",{
    express: server,
    noCache: true
});

function getSubject(num){
    return subject[num-1]
}
function home(req,res){
    return res.render("index.html");
}
function study(req,res){
    const filters=req.query;
    return res.render("study.html",{proffys,filters,subject,weekday});
}
function give_class(req,res){
    const proffy = req.query;
    isNotEmpty = Object.keys(proffy).length>0;
    if(isNotEmpty){
        proffy.subject=getSubject(proffy.subject);
        proffys.push(proffy)
        return res.redirect("/study");
    }
    
    return res.render("give-classes.html",{subject,weekday});
}


server.get("/",home);
server.get("/study",study);
server.get("/give-classes",give_class);
server.listen(5500);
/*()
.get("/",(req,res)=>{
    return res.send("hi ")
})
.get("/study")
.listen(5500);

function express(){
    return {
        name:"eu",
        age: 33
    }
};
express();
*/