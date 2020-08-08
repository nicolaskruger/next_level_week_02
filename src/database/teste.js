const db = require('./db');
const createProffy = require('./createProffy');
db.then( async (db)=>{
    proffyValue ={
        name: "Diego Fernandes2",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "80028922", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    };
    classValue ={
        subject: "quimica", 
        cost: "R$ 20,00" 
    };
    classSchedule =[
        {
            weekday: 1, 
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0, 
            time_from: 720,
            time_to: 1220
        }
    ];
    data =[
        proffyValue,
        classValue,
        classSchedule
    ]

    const selectClassesAndProffys = await db.all(`
    SELECT * FROM proffys INNER JOIN 
    classes on proffys.id = classes.proffy_id;
    `);
    console.log(selectClassesAndProffys);
    //await createProffy(db,data);
});