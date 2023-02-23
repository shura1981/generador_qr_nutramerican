const qr=require('qrcode');
const fs= require('fs');





const run=async()=>{
const url=`https://www.megaplexstars.com/menu`
qr.toFile( 'menu.png',url,{  errorCorrectionLevel : 'H' });
}


run();