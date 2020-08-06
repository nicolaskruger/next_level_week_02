//var ti = document.querySelector(".schedule-item");
var bu = document.querySelector("#add-time");
//const hora = document.querySelector(".schedule-item").cloneNode(true);
function addNewTime(){
    //const b = document.querySelector("#schedule-items");
    const t= document.querySelector(".schedule-item").cloneNode(true);
    const tVal = t.querySelectorAll("input");
    tVal.forEach(v => {
        v.value="";
    });
    document.querySelector("#schedule-items").appendChild(t);

}
// function setEventListener(){
//     bu = document.querySelectorAll("#add-time");
//     bu.forEach(b => {
//         b.addEventListener("click",()=>{
//             addNewTime();
//         })
//     });
// }
bu.addEventListener("click",addNewTime);