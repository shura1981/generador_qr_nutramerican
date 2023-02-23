const puppeteer= require('puppeteer');
(async ()=>{
const browser= await puppeteer.launch();
const page= await browser.newPage();
await page.goto('https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf');
await page.pdf({path:'api.pdf', format:'A4'});
await browser.close();

})();