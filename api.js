
const fs= require('fs');
const fetch = require('node-fetch');



async function fetchQrsJSON() {
const response = await fetch('https://www.elitenutritiongroup.com/api_eliteN/api/webservice.php/apiSleepClients?id_vendedor=116&dias=30');
const qr = await response.json();
return qr;
}


async function fetchQrsJSONB() {
    const response = await fetch('http://172.16.2.9:8096/sap.webservices/public/api/services/seller/116');
    const qr = await response.json();
    return qr;
    }
    


star=()=>{
    console.log("Inicio");

fetchQrsJSON().then(qr=>{
console.log("total", qr.length);


}).catch(e=>{
    console.log("error",e);
})
fetchQrsJSONB().then(qr=>{
    console.log("total activos", qr.length);
    
    
    }).catch(e=>{
        console.log("error",e);
    })

}


star();