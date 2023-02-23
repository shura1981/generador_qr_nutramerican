
const fs= require('fs');
const fetch = require('node-fetch');



async function fetchQrsJSON() {
const response = await fetch('https://www.elitenutritiongroup.com/api_eliteN/api/pruebas.php/apiqrs');
const qr = await response.json();
return qr;
}





star=()=>{
    console.log("Inicio");

fetchQrsJSON().then(qr=>{
console.log("qrs", qr);
let querys="";
qr.forEach(item => {
const literal= item.id_recibo;
const queryparam = Buffer.from(literal, 'utf-8');
const base64 = queryparam.toString('base64');
const url=`${item.id}  \t\t  https://www.sorteo.megaplexstars.com/?qr=${base64} \t\t  ${item.producto}`;
querys+=url+'\n';
});

fs.writeFileSync(`códigos.txt`, `${querys}`);



}).catch(e=>{
    console.log("error",e);
})


}


star();