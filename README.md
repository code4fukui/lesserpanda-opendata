# lesserpanda-opendata

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This open data project provides datasets, images, and sound recordings of lesser pandas from the Sabae City West Mountain Zoo in Sabae, Japan. The data is sourced from Sabae's official open data platform, then processed and cleaned for easier use.

## Web Application

A simple, static web application is available to view the data. It displays a complete list of the lesser pandas in a filterable table and a gallery of all associated photos.

- **Demo:** [Lesser Pandas of Sabae](https://code4fukui.github.io/lesserpanda-opendata/)

## Data & Resources

The processed data is available in this repository:

- **[data/lesserpanda_sabae.csv](data/lesserpanda_sabae.csv)**: A cleaned and structured list of all lesser pandas, including their names, family relationships, and dates.
- **[data/lesserpanda_sabae_photo.csv](data/lesserpanda_sabae_photo.csv)**: A manifest mapping photo files to their corresponding lesser panda ID.
- **[img/](img/)**: A directory of processed and normalized JPG photos of the lesser pandas.
- **[sound/](sound/)**: A directory of lesser panda sound recordings.

## Data Regeneration Workflow

The data in this repository is generated from the source using a series of Deno scripts.

**Prerequisites:**
- [Deno](https://deno.land/) runtime

**Steps:**

1.  **Download Source Data**
    Downloads the original lesser panda list as an Excel file from the open data portal.
    ```sh
    deno run -A downloadList.js
    ```

2.  **Create Panda List**
    Converts the downloaded Excel file to CSV, cleans the data, normalizes dates, and generates unique IDs for each panda. The output is `data/lesserpanda_sabae.csv`.
    ```sh
    deno run -A makeList.js
    ```

3.  **Scrape Image Archives**
    Scrapes the open data portal to find and download all related ZIP archives containing photos.
    ```sh
    deno run -A scrape.js
    ```

4.  **Normalize Images**
    Extracts images from the downloaded ZIP archives, converts PNGs to JPGs, renames files to a standard format (`<id>_<index>.jpg`), and creates the photo manifest `data/lesserpanda_sabae_photo.csv`.
    ```sh
    deno run -A unzipPhoto.js
    ```

## Data Source

- [Lesser Panda / Dataset - Open Data Platform | Data Catalog Site](https://ckan.odp.jig.jp/dataset/?q=%E3%83%AC%E3%83%83%E3%82%B5%E3%83%BC%E3%83%91%E3%83%B3%E3%83%80)

## License

This project is available under the MIT License.