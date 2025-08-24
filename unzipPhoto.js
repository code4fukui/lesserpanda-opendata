import { dir2array } from "https://js.sabae.cc/dir2array.js";
import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const fn = "data/lesserpanda_sabae.csv";
const fnp = "data/lesserpanda_sabae_photo.csv";
const list = await CSV.fetchJSON(fn);

await Deno.mkdir("img", { recursive: true });

const getExt = (fn) => {
  const n = fn.lastIndexOf(".");
  if (n < 0) return "";
  return fn.substring(n + 1).toLowerCase();
};

const getID = (name) => {
  if (name == "梅花") name = "梅香";
  return list.find(i => i.個体名 == name)?.ID;
};

const photos = [];

const files = await dir2array("temp");
for (const fn of files) {
  if (!fn.endsWith(".zip")) continue;
  const name = fn.substring(fn.indexOf("(") + 1, fn.lastIndexOf(")"));
  console.log(name);

  const id = getID(name);
  console.log(name, id);
  
  //await Deno.mkdir("img/" + id, { recursive: true });
  
  let nphoto = 0;
  try {
    const data = await Deno.readFile("temp/" + fn);
    const zips = unzip(data);
    const filenames = zips.getFilenames();
    let idx = 1;
    const imgs = ["png", "jpg", "jpeg", "jfif"];
    for (const fn of filenames) {
      console.log(fn);
      const ext = getExt(fn);
      if (!imgs.includes(ext)) continue;
      const bin = zips.decompress(fn);

      console.log(fn, bin.length);
      const dstfn = "img/" + id + "_" + idx++ + ".jpg";
      if (ext == "png") {
        const jpg = png2jpg(bin);
        await Deno.writeFile(dstfn, jpg);
      } else {
        await Deno.writeFile(dstfn, bin);
      }
      photos.push({ id, idx: idx - 1, fn: dstfn });
      nphoto++;
    }
  } catch (e) {
    console.log(id, e);
  }
  list.find(i => i.ID == id).写真枚数 = nphoto;
}
await Deno.writeTextFile(fn, CSV.stringify(list));
await Deno.writeTextFile(fnp, CSV.stringify(photos));
