import puppeteer from "puppeteer";


interface Convert{
    amount:Number,
    from:string,
    to:string
}

const convertData = {
    amount:1000,
    from:"TRY",
    to:"USD"
}

const convert = async(convertData:Convert)=>{
    try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.xe.com/currencyconverter/convert/?Amount=${convertData.amount}&From=${convertData.from}&To=${convertData.to}`);

    const [element] = await page.$x(`//*[@id="__next"]/div[2]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/p[2]`)
    
    const text = await element.getProperty("textContent")
    const textValue = await text.jsonValue()

    console.log(`${convertData.amount} ${convertData.from} is equal to ${textValue}`);
    
    await browser.close();
    } catch (error) {
        console.log(error);
    }
}


convert(convertData)