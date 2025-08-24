import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";

const srcfn = "color-test.xlsx";
const bin = await Deno.readFile(srcfn);
const ws = XLSX.decode(bin);
console.log(ws);
//console.log(ws.Styles.Fills)
const firstname = Object.keys(ws.Sheets)[0];
const sheet = ws.Sheets[firstname];
//console.log(sheet);
//console.log(sheet["!merges"]); // サイズ
