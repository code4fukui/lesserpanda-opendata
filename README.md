# lesserpanda-opendata レッサーパンダオープンデータ

## オープンデータ

- [さばえのレッサーパンダ](data/lesserpanda_sabae.csv)
- [さばえのレッサーパンダ画像一覧](data/lesserpanda_sabae_photo.csv)
- [さばえのレッサーパンダ画像](img/)

## 鯖江市 西山動物園

オープンデータダウンロード
```sh
deno -A downloadList.js
```

リスト作成
```sh
deno -A makeList.js
```

画像スクレイピング
```sh
deno -A scrape.js
```

画像正規化
```sh
deno -A unzipPhoto.js
```

## reference

- [データセット - オープンデータプラットフォーム | データカタログサイト](https://ckan.odp.jig.jp/dataset/?q=%E3%83%AC%E3%83%83%E3%82%B5%E3%83%BC%E3%83%91%E3%83%B3%E3%83%80)
