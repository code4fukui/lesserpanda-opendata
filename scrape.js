import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";

//await Deno.mkdir("data", { recursive: true });

const downloadResourcesFromPage = async (url) => {
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);
  const as = dom.querySelectorAll(".dataset-item a");
  const links = ArrayUtil.toUnique(as.map(i => ({ url: new URL(i.getAttribute("href"), url).href, text: i.text.trim() })), (a) => a.url);
  console.log(links);

  for (const link of links) {
    const html = await fetchOrLoad(link.url);
    const dom = HTMLParser.parse(html);
    const as = dom.querySelectorAll(".resource-item a");
    const links2 = ArrayUtil.toUnique(as.map(i => ({ url: new URL(i.getAttribute("href"), url).href, text: i.text.trim() })))
    const dllink = links2.filter(i => i.text == "ダウンロード")[0];
    const ext = dllink.url.substring(dllink.url.lastIndexOf("."));
    const fn = link.text + ext;
    console.log(dllink, fn);

    const bin = await (await fetch(dllink.url)).bytes();
    await Deno.writeFile("temp/" + fn, bin);
  }
  return links.length > 0;
};

export const downloadResources = async (url) => {
  for (let page = 1;; page++) {
    const url2 = url + "&page=" + page;
    if (!await downloadResourcesFromPage(url2)) break;
  }
};

if (import.meta.main) {
  const url = "https://ckan.odp.jig.jp/dataset/?q=%E3%83%91%E3%83%B3%E3%83%80&organization=jp-fukui-sabae&sort=score+desc%2C+metadata_modified+desc&res_format=ZIP";
  await downloadResources(url);
}
