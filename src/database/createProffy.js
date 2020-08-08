const { query } = require("express");

module.exports = async function(db,data){
    data
    proffValue = data[0];
    classValue = data[1];
    classSchedule = data[2];
    queryP =`
        insert into proffys(
            name,
            avater,
            whatsapp,
            bio
        )
        values(
            '${proffValue.name}',
            '${proffValue.avatar}',
            '${proffValue.whatsapp}',
            '${proffValue.bio}'
        );
    `;
    const p= await db.run(queryP);
    const proffy_id = p.lastID;
    queryC =`
    insert into classes(
        subject,
        cost,
        proffy_id
    )
    values(
        '${classValue.subject}',
        '${classValue.cost}',
        ${proffy_id}
    );
    `;
    
    cValue = {
        subject: classValue.subject,
        cost: classValue.cost,
        proffy_id: proffy_id
    }
    const c= await db.run(queryC);
    const class_id =c.lastID;
    classSchedule.forEach( async element => {
        querySc =`
        insert into class_schedule(
            class_id,
            weekday,
            time_from,
            time_to
        )
        values (
            ${class_id},
            ${element.weekday},
            ${element.time_from},
            ${element.time_to}      
        )
        `;
        await db.run(querySc);
    });
};