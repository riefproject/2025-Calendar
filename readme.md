# 2025 Calendar

This project is a web-based calendar for the year 2025. It displays national holidays, collective leaves, and specific events for Collage (Polban) and even personal events (SNBT). The calendar allows users to navigate through months and filter events based on their preferences.

## Features

-   Display national holidays, collective leaves, and other personal events.
-   Navigate through months using previous and next buttons.
-   Filter events using checkboxes.
-   Highlight the current day.
-   Responsive design for mobile and desktop views.
-   Uses a static JSON file as a mini-database for storing event data.

## Technologies Used

-   HTML
-   CSS (Bootstrap 5)
-   JavaScript

## Setup

1. Clone the repository to your local machine:

    ```sh
    git clone https://github.com/riefproject/Calendar2025.git
    ```

2. Navigate to the project directory:

    ```sh
    cd Calendar2025
    ```

3. Open the project in your preferred code editor (e.g., Visual Studio Code).

4. Start a local server to view the project. If you have Python installed, you can use the following command:

    ```sh
    python -m http.server
    ```

5. Open your web browser and go to `http://localhost:8000/src` to view the calendar.

## File Structure

```
2025 Calendar
│   readme.md
│   LICENSE
│
└───src
    │   index.html
    │
    ├───assets
    │   ├───data
    │   │       events.json
    │   │
    │   └───img
    │           bg-mobile.jpg
    │           bg.jpg
    │           favicon.png
    │
    ├───css
    │       style.css
    │
    └───js
            script.js
```

## Usage

1. Open the calendar in your web browser.
2. Use the previous and next buttons to navigate through months.
3. Use the filter dropdown to select which events to display.
4. The calendar will highlight the current day and display events below the calendar.

## Customization

### Adding Events

To add or modify events, edit the events.json file located in the data directory. The file structure is as follows:

```json
{
    "nationalHolidays": [
        { "date": "2025-01-01", "description": "Tahun Baru Masehi" },
        {
            "date": "2025-01-27",
            "description": "Isra Mikraj Nabi Muhammad SAW"
        },
        {
            "date": "2025-01-29",
            "description": "Tahun Baru Imlek 2576 Kongzili"
        },
        {
            "date": "2025-03-29",
            "description": "Hari Suci Nyepi (Tahun Baru Saka 1947)"
        },
        { "date": "2025-04-18", "description": "Wafat Yesus Kristus" },
        {
            "date": "2025-04-20",
            "description": "Kebangkitan Yesus Kristus (Paskah)"
        },
        { "date": "2025-05-01", "description": "Hari Buruh Internasional" },
        { "date": "2025-05-12", "description": "Hari Raya Waisak 2569 BE" },
        { "date": "2025-05-29", "description": "Kenaikan Yesus Kristus" },
        { "date": "2025-06-01", "description": "Hari Lahir Pancasila" },
        {
            "date": "2025-06-06",
            "description": "Hari Raya Iduladha 1446 Hijriah"
        },
        {
            "date": "2025-06-27",
            "description": "Tahun Baru Islam 1447 Hijriah"
        },
        {
            "date": "2025-08-17",
            "description": "Hari Kemerdekaan Republik Indonesia"
        },
        { "date": "2025-09-05", "description": "Maulid Nabi Muhammad SAW" },
        { "date": "2025-12-25", "description": "Hari Raya Natal" },
        {
            "startDate": "2025-03-31",
            "endDate": "2025-04-01",
            "description": "Hari Raya Idulfitri 1446 Hijriah"
        }
    ],
    "collectiveLeaves": [
        {
            "date": "2025-01-28",
            "description": "Cuti Bersama Tahun Baru Imlek 2576 Kongzili"
        },
        {
            "date": "2025-03-28",
            "description": "Cuti Bersama Hari Suci Nyepi (Tahun Baru Saka 1947)"
        },
        {
            "date": "2025-05-13",
            "description": "Cuti Bersama Hari Raya Waisak 2569 BE"
        },
        {
            "date": "2025-05-30",
            "description": "Cuti Bersama Kenaikan Yesus Kristus"
        },
        {
            "date": "2025-06-09",
            "description": "Cuti Bersama Iduladha 1446 Hijriah"
        },
        { "date": "2025-12-26", "description": "Cuti Bersama Hari Raya Natal" },
        {
            "startDate": "2025-04-02",
            "endDate": "2025-04-07",
            "description": "Cuti Bersama Idulfitri 1446 Hijriah"
        }
    ],
    "polbanEvents": [
        {
            "startDate": "2025-04-07",
            "endDate": "2025-04-11",
            "description": "Pelaksanaan Evaluasi Tengah Semester"
        },
        {
            "startDate": "2025-06-09",
            "endDate": "2025-06-13",
            "description": "Pelaksanaan Evaluasi Akhir Semester"
        }
    ],
    "snbtEvents": [
        {
            "startDate": "2025-01-13",
            "endDate": "2025-02-18",
            "description": "Registrasi Akun SNPMB 2025"
        },
        {
            "startDate": "2025-03-11",
            "endDate": "2025-03-27",
            "description": "Pendaftaran UTBK-SNBT 2025"
        },
        {
            "startDate": "2025-04-23",
            "endDate": "2025-05-03",
            "description": "Pelaksanaaan UTBK-SNBT 2025"
        },
        { "date": "2025-05-28", "description": "Pendaftaran UTBK-SNBT 2025" }
    ]
}
```

## Customizing Styles

To customize the styles, edit the style.css file located in the css directory. You can change the background images, colors, and other styles as needed.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
