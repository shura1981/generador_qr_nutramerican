const qr = require('qrcode');
const fs = require('fs');
// const dominio = 'https://www.sorteo.megaplexstars.com/';
const dominio = 'https://inscripcionreto.nutramerican.com/';
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
    ZOLE: 'ZOLE',
    PROTEIN_CHOCOLATE: 'PROTEINCH'
}
const productos = {
    PROTEIN_CHOCOLATE: 'PROTEIN CHOCOLATE'
}
const mode = {
    QUERY: 'QUERY',
    URL: 'URL'
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
const build = (index, prefijo, producto, opt = mode.QUERY) => {
    const literal = prefijo + index;
    const queryparam = Buffer.from(literal, 'utf-8');
    const base64 = queryparam.toString('base64');
    const url = `${dominio}?qr=${base64}`;
    const query = `INSERT INTO tb_qrs SET id_recibo='${literal}', producto='${producto}';`
    //#region Generar los qr
    // const dir = `${prefijo}/`;
    // MakeDir(dir);
    // qr.toFile(dir + literal + '.png', url, { errorCorrectionLevel: 'H' });
    //#endregion
    return opt == mode.QUERY ? query : url;
}
const run = async ({ totalQr, start, opt = mode.QUERY }) => {
    var querys = "";
    const prefijo = prefijos.BURNERSTACK;
    const producto = 'BURNER STACK';
    // const prefijo = prefijos.PROTEIN_CHOCOLATE;
    // const producto = productos.PROTEIN_CHOCOLATE;

    for (let index = start; index <= (totalQr + start); index++) {
        const q = build(index, prefijo, producto, opt);
        querys += q + '\n';
    }

    if (opt == mode.QUERY) {
        fs.writeFileSync(`scripts/${prefijo}.sql`, `${querys}`);
    } else {
        fs.writeFileSync(`${prefijo}.txt`, `${querys}`);
    }
    console.log("Finalizado...");
}
run({ start: 243545, totalQr: 3000, opt: mode.QUERY });
// run({ start: 1, totalQr: 55000, opt: mode.URL });