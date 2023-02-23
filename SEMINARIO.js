const qr=require('qrcode');
const fs= require('fs');

const MakeDir=async (dir)=>{
try {
fs.statSync(dir);
}
catch (err) {
if (err.code === 'ENOENT') {
await fs.promises.mkdir(dir, { recursive: true });
}
}
}
const build=(index,prefijo, producto)=>{
const literal= prefijo+index;
const queryparam = Buffer.from(literal, 'utf-8');
const base64 = queryparam.toString('base64');
const url=`https://seminario.megaplexstars.com/?cupon=${base64}`;
const query= `INSERT INTO tb_qrs SET id_recibo='${literal}', producto='${producto}';`
// const dir=`${prefijo}/`;
// MakeDir(dir);
// qr.toFile(dir+literal+'.png',url,{  errorCorrectionLevel : 'H' });
return url;
}
const run=async()=>{
var querys="";
const prefijo='CUPON';    
const producto= 'TICKET';
for (let index = 1; index <= 400; index++) {
const q=build(index, prefijo,producto);
querys+=q+'\n';
}
fs.writeFileSync(`scripts/${prefijo}.sql`, `${querys}`);
console.log("Finalizado...");
}


run();
