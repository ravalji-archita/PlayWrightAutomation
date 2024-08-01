const {test,expect}=require('@playwright/test');


const ExcelJS=require('exceljs');
//const filepath="C:/Users/ARCHITA/Downloads/exceldownloadTest.xlsx";
async function writeExcelTest(searchText,replaceText,change,filepath)
{


const workbook=new ExcelJS.Workbook();
await workbook.xlsx.readFile(filepath)

const worksheet=workbook.getWorksheet('Sheet1');
const output=await readExcel(worksheet, searchText);

        const cell=worksheet.getCell(output.row,output.column+change.colChange);
        cell.value=replaceText;
        await workbook.xlsx.writeFile(filepath);


}

async function readExcel(worksheet,searchText)
{
    let output={row:-1,column:-1};
    worksheet.eachRow((row, rowNumber) =>
        {
            row.eachCell( (cell, colNumber) =>
            {
               if(cell.value===searchText)
                {
                    output.row=rowNumber;
                    output.column=colNumber;
                }

    
            })
        })
        return output;
}

//writeExcelTest("Mango",550,{rowChange:0,colChange:2},filepath);
 test('Upload download excel Validation', async ({page})=>
{
    const textSearch='Mango';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise=page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await downloadPromise;
    writeExcelTest("Mango",350,{rowChange:0,colChange:2},"C:/Users/ARCHITA/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/ARCHITA/Downloads/download.xlsx");
    const textlocator=page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has :textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);


})