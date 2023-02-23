const qr=require('qrcode');
const fs= require('fs');
const empleados=[
{Nombre:"Jhon Freddy Cañas", Movil:3217601448},
{Nombre:"Diego Ortiz", Movil:3122027385},
{Nombre:"Mario Eleazar Betancur",Movil:3217601450},
{Nombre:"Leyner Ditta", Movil:3116399923},
{Nombre:"Octavio Ospino", Movil:3003753871},
{Nombre:"Jhon Wilson Trujillo",Movil:3207579146},
{Nombre:"Juan Manuel Chilito",Movil:3207580440},
{Nombre:"Jose Miguel Abreu",Movil:3217601444},
{Nombre:"Jhon Freddy Cruz", Movil:3502617932},	
{Nombre:"John Jairo Bautista",Movil:3045990077},
{Nombre:"Adolfo Jimenez",Movil:	3046009002},
{Nombre:"Marbel Yuliana Pardo",Movil:3045735728},
{Nombre:"Javier Enrique Nobles",Movil:3023282695},
{Nombre:"Alejandro Lopez", Movil:3045995747}
];

const administradores=[
{Nombre:"Guberth José Vera Jaimes", Movil:3023282706},
{Nombre:"Carlos Arles Valencia", Movil:3217601447}       
]










const run=async()=>{
administradores.forEach(e=>{
const message=`¡Hola! ${e.Nombre}, Estoy interesado en los productos de Nutramerican Pharma y Megaplex`;
const url=`https://api.whatsapp.com/send?phone=57${e.Movil}&text=${message.replace(/ /g, "%20")}`
qr.toFile( "admnistradores/"+e.Nombre+'.png',url,{  errorCorrectionLevel : 'H' });
});
}


run();