import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const headerStyle = {
  fill: {fgColor: {rgb: "D3D3D3"}},
  font: {name: 'Arial', sz:10, bold: true},
  alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' }
};

// import {WorkSheet as XLSXWorkSheet, utils as XLSXUtils, WorkBook as XLSXWorkBook,
//   write as StyleWrite, utils as StyleUtils, CellObject as StyleCellObject} from "xlsx-styles";

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // worksheet[0].s = headerStyle;

  //   var wscols = [
  //     {wch:50},
  //     {wch:50},
  //     {wch:10},
  //     {wch:20}
  // ];
  //   worksheet["!cols"] = wscols;

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
}
