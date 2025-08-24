const url = "https://ckan.odp.jig.jp/dataset/d62824ca-8b19-4d8f-b81d-7f7cc114f25d/resource/ccc95c6d-e3d0-4dd6-99fb-163704f5ab33/download/-.xlsx";
const fn = "data/lesserpanda.xlsx";
const bin = await (await fetch(url)).bytes();
await Deno.writeFile(fn, bin);
