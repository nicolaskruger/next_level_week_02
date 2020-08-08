const db = require("sqlite-async");
function execute(db){
    return db.exec(`
            CREATE TABLE IF NOT EXISTS proffys(
                id integer primary key autoincrement,
                name text,
                avater text,
                whatsapp text,
                bio
            );

            CREATE TABLE IF NOT EXISTS classes(
                id integer primary key autoincrement,
                subject text,
                cost text,
                proffy_id integer
            );

            CREATE TABLE IF NOT EXISTS class_schedule(
                id integer primary key autoincrement,
                class_id integer,
                weekday integer,
                time_from integer,
                time_to integer
            );
        `)
    // const query = `
    //         insert into proffys(
    //             name,
    //             avater,
    //             whatsapp,
    //             bio 
    //         ) values(
    //             "eu",
    //             "tu",
    //             "12345678",
    //             "nos"
    //         );`;
    // //db.run(query);
    // db.all("SELECT * FROM sqlite_master WHERE type = 'table'",(err,rows)=>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log("foi");
    //     console.log(rows);
    // });

}
module.exports= db.open(__dirname+'/database.sqlite').then(execute);
