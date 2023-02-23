const qr = require('qrcode');
const fs = require('fs');
const prefijos = {
    BIPROVAINILLA2L: 'BV2L',
    BIPROCHOCOLATE2L: 'BC2L',
    BIPROVAINILLA6L: 'BV6L',
    BIPRONATURAL2L: 'BN2L',
    BIPRONATURAL6L: 'BN6L',
    ISOCLEAN2L: 'ISO2L',
    ISOCLEAN5L: 'ISO5L',
    BIPRORIPPED: 'BR',
    BIPROLITE: 'BL',
    BIPROMASS: 'BM',
    BURNERSTACK: 'BURNER',
    COLLAGENSTACK: 'COLL',
    CREASTACK: 'CREA',
    ENERGYX: 'ENE',
    GAINZ3LB: 'GA3L',
    GAINZ6LB: 'GA6L',
    GAINZ12LB: 'GA12L',
    GLUTASTACK: 'GLUTA',
    MEGACARBSCEREZA: 'MCEREZA',
    MEGACARBSCOCO: 'MCOCO',
    MEGALITE: 'MGLITE',
    MEGAPLEXCOMPLEXNIGHT: 'MCN',
    MEGAPLEXPOWER10L: 'MCP10L',
    MEGAPLEXLITE: 'MPL3L',
    NITROSHOCKFRUTOSROJOS: 'NITROF',
    NITROSHOCKMANZANA: 'NITROM',
    NITROSHOCKUVA: 'NITROU',
    NUTRAVEGAN: 'VEGAN',
    NUTRAC: 'NUTRAC',
    POWERSTACK: 'POWER',
    PROTEINCAKET: 'PANCAKET',
    PROTEINCAKEW: 'PANCAKEW',
    ZOLE: 'ZOLE'
}
const MakeDir = async (dir) => {
    try {
        fs.statSync(dir);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            await fs.promises.mkdir(dir, { recursive: true });
        }
    }
}
const build = (index, prefijo, producto) => {
    const literal = prefijo + index;
    const queryparam = Buffer.from(literal, 'utf-8');
    const base64 = queryparam.toString('base64');
    const url = `https://www.sorteo.megaplexstars.com/?qr=${base64}`;
    const query = `INSERT INTO tb_qrs SET id_recibo='${literal}', producto='${producto}';`
    //#region Generar los qr
    // const dir = `${prefijo}/`;
    // MakeDir(dir);
    // qr.toFile(dir + literal + '.png', url, { errorCorrectionLevel: 'H' });
    //#endregion
    // return query;
    return url;
}
const run = async ({ totalQr, start }) => {
    var querys = "";
    const prefijo = prefijos.BURNERSTACK;
    const producto = 'BURNER STACK';
    for (let index = start; index <= (totalQr + start); index++) {
        const q = build(index, prefijo, producto);
        querys += q + '\n';
    }
    // fs.writeFileSync(`scripts/${prefijo}.sql`, `${querys}`);
    fs.writeFileSync(`${prefijo}.txt`, `${querys}`);
    console.log("Finalizado...");
}


run({start:135520, totalQr:5000});