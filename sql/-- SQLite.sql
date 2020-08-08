-- SQLite
-- SELECT * from class_schedule;
-- SELECT * FROM proffys;

-- DELETE from proffys;
-- DELETE from class_schedule;
-- DELETE from classes;

-- SELECT * FROM proffys INNER JOIN 
-- classes on proffys.id = classes.proffy_id;

SELECT classes.*, proffys.*
FROM proffys
JOIN classes on (classes.proffy_id= proffys.id)
WHERE EXISTS (
    SELECT class_schedule.*
    from class_schedule
    where class_schedule.class_id =classes.id
    and class_schedule.weekday = 0
    AND class_schedule.time_from <= 1000
    AND class_schedule.time_to>0
)
AND classes.subject= 'quimica';