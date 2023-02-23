const puppeteer= require('puppeteer');
(async ()=>{

    const browser= await puppeteer.launch();
    const page= await browser.newPage();
    // await page.goto('https://www.upnlab.com');
    // await page.screenshot({path: 'upn.png'});

    // await page.goto('https://www.upnlab.com',{waitUntil:'networkidle2'});
    // await page.pdf({path: 'upn.pdf', format:'A4'});



await page.goto('https://www.booking.com');
await page.type('#ss', 'Berlin');
await page.click('.sb-searchbox__button');
await page.waitForSelector('#hotellist_inner');
await page.screenshot({path: 'hotel.png'});
const hotels= await page.evaluate(()=>{
const anchors= Array.from(document.querySelectorAll('span.sr-hotel__name'));
return anchors.map(anchor=> anchor.textContent.trim()).slice(0,10);
});
console.log(hotels);
  await browser.close();
  
})();