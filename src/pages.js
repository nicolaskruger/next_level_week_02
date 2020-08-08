const database = require("./database/db");
const { weekday } = require("./utils/format");
// const proffys = [
//     {
//         name: "Diego Fernandes",
//         avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
//         whatsaap: "80028922", 
//         bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
//         subject: "quimica", 
//         cost: "R$ 20,00", 
//         weekday: [0], 
//         time_from: [720],
//         time_to: [1220]
//     },
//     {
//         name: "Diego Fernandes2",
//         avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
//         whatsaap: "80028922", 
//         bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
//         subject: "quimica", 
//         cost: "R$ 20,00", 
//         weekday: [0], 
//         time_from: [720],
//         time_to: [1220]
//     }
// ];
function timeToMinute(time){
    var t= time.split(":");
    t[0]= Number(t[0]);
    t[1]= Number(t[1]);
    return 60*t[0]+t[1];
}
function home(req,res){
    return res.render("index.html");
}
async function study(req,res){
    const filters=req.query;
    var proffys;
    if(!filters.time||!filters.weekday||!filters.time){
        return res.render("study.html",{filters,subject,weekday});
    }
    
    try {
        const min =timeToMinute(filters.time);
        const query =`
            SELECT classes.*, proffys.*
            FROM proffys
            JOIN classes on (classes.proffy_id= proffys.id)
            WHERE EXISTS (
                SELECT class_schedule.*
                from class_schedule
                where class_schedule.class_id =classes.id
                and class_schedule.weekday = ${filters.weekday}
                AND class_schedule.time_from <= ${min}
                AND class_schedule.time_to>${min}
            )
            AND classes.subject= 'quimica';
        `;
        const db = await database;
        proffys = await db.all(query);
        return res.render("study.html",{proffys,filters,subject,weekday});
    } catch (error) {
        console.log(error);
    }
    
}
function give_class(req,res){
    return res.render("give-classes.html",{subject,weekday});
}
async function save_classes(req,res){
    const createProffy = require('./database/createProffy');
    const proffy = req.body;
    const proffyValue = {
        name: req.body.name,
        avater: req.body.avatar,
        whatsaap: req.body.whatsaap,
        bio: req.body.bio,
        weekday: req.body.weekday,
        time_from: req.time_from,
        time_to: req.time_to
    };
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
    };
    const class_scheduleValue =
        req.body.weekday.map(
            (weekday,index) =>{

                return{
                    weekday: weekday, 
                    time_from: timeToMinute(req.body.time_from[index]),
                    time_to: timeToMinute(req.body.time_to[index])
                }

            }
        )
    const data =[
        proffyValue,
        classValue,
        class_scheduleValue
    ];
    try {
        const db = await database;
        await createProffy(db,data);

        return res.redirect("/study");
    } catch (error) {
        console.log(error);
    }
    

    
    
}
module.exports={home,study,give_class,save_classes};