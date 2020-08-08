




const express= require('express');
const server = express();
const {subject,weekday,getSubject} = require("./utils/format")
const {home,study,give_class,save_classes} = require("./pages");

server.use(express.static("public"))
server.use(express.urlencoded({extended:true}));

const nunjucks = require("nunjucks");
nunjucks.configure("src/view",{
    express: server,
    noCache: true
});




server.get("/",home);
server.get("/study",study);
server.get("/give-classes",give_class);
server.post("/save-classes",save_classes);
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