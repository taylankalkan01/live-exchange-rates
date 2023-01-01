import puppeteer from "puppeteer";

interface Change{
    from:string,
    to:string
    view:string
}

const changeData = {
    from:"TRY",
    to:"USD",
    view:"1M" //type viewOptions = "12H"|"1D"|"1W"|"1M"|"1Y"|"2Y"|"5Y"|"10Y"
}

const change = async(changeData:Change)=>{
    try {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www.xe.com/currencycharts/?from=${changeData.from}&to=${changeData.to}&view=${changeData.view}`)

    const [chart] = await page.$x(`//*[@id="__next"]/div[2]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/div[1]/div/h1`)
    const chartText = await chart.getProperty("textContent")
    const chartValue = await chartText.jsonValue()
    console.log("chart:",chartValue);
    
    const [percent] = await page.$x(`//*[@id="__next"]/div[2]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/div[1]/div/div/h1`)
    const percentText = await percent.getProperty("textContent")
    const percentValue = await percentText.jsonValue()
    console.log("percent:",percentValue);

    const [view] = await page.$x(`//*[@id="__next"]/div[2]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/div[1]/div/div/p`)
    const viewText = await view.getProperty("textContent")
    const viewValue = await viewText.jsonValue()
    console.log("view:",viewValue);

    const [date] = await page.$x(`//*[@id="__next"]/div[2]/div[2]/section/div[2]/div/main/div/div[2]/div[1]/div[2]/p`)
    const dateText = await date.getProperty("textContent")
    const dateValue = await dateText.jsonValue()
    console.log("date:",dateValue);

    await browser.close();
    } catch (error) {
        console.log(error);
    }
}
// console.log("change");
change(changeData)

