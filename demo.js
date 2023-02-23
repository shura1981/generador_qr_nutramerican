//Agrupa campos con el mismo valor
const groupByMap =(list, keyGetter)=> {
const map = new Map();
list.forEach((item) => {
const key = keyGetter(item);
const collection = map.get(key);
if (!collection) {
map.set(key, [item]);
} else {
collection.push(item);
}
});
return Array.from(map);
}
//Agrupar Item
const groupBy =(list, keyGetter)=> {
const map = new Map();
list.forEach((item) => {
const key = keyGetter(item);
const collection = map.get(key);
if (!collection) {
map.set(key, [item]);
} else {
collection.push(item);
}
});
const myList= Array.from(map);
const result=[];
for(let i=0; i<myList.length; i++){
const value= myList[i][1][0];
result.push(value);
}
return result;
}

console.time();
const fetch = require("node-fetch");
fetch('https://www.elitenutritiongroup.com/api_eliteN/api/webservice.php/infocomercial?fechaI=2020-10-20&fechaF=2020-10-20')
.then((resp) => resp.json()).then(data=>{
console.timeEnd();    
var fitbar= data.filter(b=>b.item==101515);
const total= fitbar.reduce((acumulado, item)=>  acumulado + item.cantidad,0);
// console.log("total", total,"fitbar", fitbar);
const proteicos= groupByMap(data, d=>d.categoria);
const list=[];
for (let index = 0; index < proteicos.length; index++) {
const p = proteicos[index];
const category= p[0];
var cantidad=0;
var precio=0;
p[1].forEach(item=>{
cantidad += item.cantidad;
precio += item.precio;
});
const row= {category: category, cantidad: cantidad, precio: precio};
list.push(row);
}
console.log("proteicos", list);




}).catch(e=>console.log("error", e))
