
import puppeteer from "puppeteer";



interface Pdf{
    format:string
    goto:string,
    path:string
    height:string
}


const pdfData = {
    format:"A4",
    path:"img/pdfGenerator.pdf",
    goto:"https://www.xe.com/",
    height:"800px"
}

const pdf = async(pdfData:Pdf) => {
    try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(pdfData.goto)
    await page.pdf({path:pdfData.path,format:pdfData.format,height:pdfData.height})

    await browser.close();
    } catch (error) {
        console.log(error);
        
    }
}

pdf(pdfData)