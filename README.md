# lesserpanda-opendata

This open data project contains information and resources related to lesser pandas in Sabae, Japan.

## Open Data

- [List of Lesser Pandas in Sabae](data/lesserpanda_sabae.csv)
- [List of Lesser Panda Photos in Sabae](data/lesserpanda_sabae_photo.csv)
- [Lesser Panda Photos in Sabae](img/)
- [Sounds of Lesser Pandas in Sabae](sound/)

## App

- [Lesser Pandas of Sabae](https://code4fukui.github.io/lesserpanda-opendata/)

## Processing Open Data from Sabae City West Mountain Zoo

Download Open Data
```sh
deno -A downloadList.js
```

Create List
```sh
deno -A makeList.js
```

Scrape Images
```sh
deno -A scrape.js
```

Normalize Images
```sh
deno -A unzipPhoto.js
```

## Reference

- [Lesser Panda / Dataset - Open Data Platform | Data Catalog Site](https://ckan.odp.jig.jp/dataset/?q=%E3%83%AC%E3%83%83%E3%82%B5%E3%83%BC%E3%83%91%E3%83%B3%E3%83%80)

## License

MIT License