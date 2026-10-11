# 🌱 DevSeed

**A lightweight, browser-based database seed data generator.**

DevSeed helps developers generate realistic sample data and SQL `INSERT` statements for testing and development. Define your table, choose your fields, specify the number of records, and generate SQL that you can copy or download.

## ✨ Features

- **Dynamic field configuration** — Add and remove fields to define your database table.
- **Multiple data types** — Generate names, email addresses, South African phone numbers, numbers, dates, dates of birth, today's date, and date-time values.
- **Custom record counts** — Generate between 1 and 1,000 records per request.
- **SQL generation** — Generate SQL `INSERT` statements from your configured fields and records.
- **Copy to clipboard** — Copy generated SQL for use in your development workflow.
- **Download SQL files** — Save generated statements as a `.sql` file.
- **Input validation** — Validate table names, field names, duplicate fields, and record counts.
- **Responsive interface** — Use the tool on desktop and smaller screens.
- **No account required** — Runs in your browser without requiring a sign-up.

## 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript

DevSeed uses standard browser technologies and does not require a frontend framework.

## 🚀 Getting Started

### Use DevSeed

Once the application is deployed, open its public URL in your browser and start generating test data.

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Dalphy-tech/DevSeed.git
   ```

2. Navigate to the project directory:

   ```bash
   cd DevSeed
   ```

3. Start a local web server. If Python 3 is installed, run:

   ```bash
   python3 -m http.server 8080
   ```

4. Open `http://localhost:8080` in your browser.

You can also open `index.html` directly in a browser, although using a local web server is recommended.

## 📖 How to Use

1. Enter a valid database table name, such as `users`.
2. Choose how many records to generate, from 1 to 1,000.
3. Add the fields you want in your table.
4. Enter a unique, valid name for each field and select its data type.
5. Click **Generate SQL**.
6. Review the generated statements.
7. Copy the SQL or download it as a `.sql` file.

## 🧪 Supported Data Types

| Type | Generated value |
|---|---|
| Name | Sample name |
| Email | Sample email address |
| Phone | South African-style phone number |
| Number | Random integer between 1 and 100 |
| Date | Random date |
| Today | Current date |
| Date of Birth | Sample date of birth |
| Date & Time | Random date and time |

## ⚠️ Important Notes

- DevSeed generates sample data for development and testing; it does not connect directly to a database.
- Review generated SQL before running it against a database.
- Generated values are synthetic examples and should not be treated as verified real-world data.
- The tool is intended to help prepare seed statements, not replace database backups or safe database practices.

## 🗺️ Project Status

**Minimum Viable Product (MVP)**

The core functionality is implemented, including data generation, SQL output, validation, copying, and downloading. Further improvements may be added as the project evolves.

## 🎯 Project Goal

DevSeed was built to make the creation of development seed data simpler and faster while demonstrating practical frontend development, JavaScript logic, input validation, and user-focused interface design.

## 📄 License

No license has been specified yet. All rights are reserved by default; see the repository owner for permission to use, modify, or redistribute the code.