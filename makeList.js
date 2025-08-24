import { XLSX } from "https://taisukef.github.io/sheetjs-es/es/XLSX.js";
import { CSV } from "https://code4fukui.github.io/CSV/CSV.js";
import { Kana } from "https://code4fukui.github.io/CityTypingGame/Kana.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { Romaji } from "https://code4fukui.github.io/kana2roma/Romaji.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

const srcfn = "data/lesserpanda.xlsx";
const fn = "data/lesserpanda_org.csv";
const dstfn = "data/lesserpanda_sabae.csv";

{
  const bin = await Deno.readFile(srcfn);
  const ws = XLSX.decode(bin);
  const firstname = Object.keys(ws.Sheets)[0];
  const sheet = ws.Sheets[firstname];
  //console.log(sheet);
  const data = XLSX.toCSV(sheet);
  await Deno.writeTextFile(fn, CSV.encode(data));
}

const ids = {};

const csv = await CSV.fetch(fn);
csv.splice(0, 1);
const data = CSV.toJSON(csv);
const list = [];
for (const item of data) {
  const name = item.個体名;
  //console.log(name);
  if (!name) continue;
  const o = {};
  o.ID = "";
  const n = name.indexOf("（");
  if (n >= 0) {
    o.個体名 = name.substring(0, n);
    o.個体名カナ = Kana.hiraganaToKatagana(name.substring(n + 1, name.length - 1));
  } else {
    o.個体名 = name;
    o.個体名カナ = Kana.hiraganaToKatagana(name);
  }

  // data bug??
  if (o.個体名カナ == "令花") {
    o.個体名 = "令花";
    o.個体名カナ = "レイファ";
  }
  const id = Romaji.encode(Kana.katakanaToHiragana(o.個体名カナ));
  if (!ids[id]) {
    ids[id] = 1;
    o.ID = id;
  } else {
    ids[id]++;
    o.ID = id + ids[id];
  }

  const living = "ミンファ,ライト,たいよう,モッチー,ティアラ,まつば,かのこ,かんた".split(",");
  o.飼育中 = living.includes(o.個体名) ? 1 : 0;
  
  const names = "父親,母親,ペア個体名,ペア個体名,ペア個体名".split(",");
  const dates = "生年月日,死亡年月日,他園移動日,来園日".split(",");
  for (const name in item) {
    if (name == "個体名") continue;
    const v = item[name];
    if (names.includes(name)) {
      const n = v.indexOf("（");
      o[name] = n >= 0 ? v.substring(0, n) : v;
    } else if (dates.includes(name) && v.length > 0) {
      const mdy = v.split("/").map(i => parseInt(i));
      if (mdy.length != 3) {
        o[name] = v;
        continue;
        //throw new Error(v);
      }
      const y = (mdy[2] > 80 ? 1900 : 2000) + mdy[2];
      const d = new Day(y, mdy[0], mdy[1]);
      o[name] = d.toString();
    } else {
      o[name] = v;
    }
  }

  list.push(o);
}
console.log(list);
// IDチェック
const uids = ArrayUtil.toUnique(list.map(i => i.ID));
console.log(uids.length, list.length);
if (list.length != uids.length) throw new Error("can't make ID");
await Deno.writeTextFile(dstfn, CSV.stringify(list));
