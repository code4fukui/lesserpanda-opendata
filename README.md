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

