const fieldsContainer = document.getElementById("fieldsContainer");
const addFieldButton = document.getElementById("addFieldButton");

const tableNameInput = document.getElementById("tableName");
const recordCountInput = document.getElementById("recordCount");

const generateButton = document.getElementById("generateButton");
const sqlOutput = document.getElementById("sqlOutput");
const copyButton = document.getElementById("copyButton");
const downloadButton = document.getElementById("downloadButton");


const emailCounts = {};

function createFieldRow() {
    const fieldRow = document.createElement("div");
    fieldRow.className = "field-row";

    fieldRow.innerHTML = `
        <input
            type="text"
            class="field-name"
            placeholder="Field name"
        >

        <select class="field-type">
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="today">Today</option>
            <option value="date_of_birth">Date of Birth</option>
            <option value="date_time">Date & Time</option>
        </select>

        <button type="button" class="remove-field">
            Remove
        </button>
    `;

    fieldsContainer.appendChild(fieldRow);
}

addFieldButton.addEventListener("click", createFieldRow);

fieldsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-field")) {
        event.target.parentElement.remove();
    }
});


//date generators 

function generateName() {
    const names = [
        "Lerato",
        "Thabo",
        "Mpho",
        "Karabo",
        "Naledi",
        "Tshepo",
        "Kagiso",
        "Boitumelo",
        "Neo",
        "Palesa"
    ];

    const randomIndex = Math.floor(Math.random() * names.length);

    return names[randomIndex];
}

function generateEmail(name) {
    const baseEmail = name.toLowerCase();
    
    if (!emailCounts[baseEmail]) {
        emailCounts[baseEmail] = 1;
        return `${baseEmail}@example.com`;
    }

    emailCounts[baseEmail]++;

    return `${baseEmail}${emailCounts[baseEmail]}@example.com`;
}

function generatePhone() {
    const prefixes = ["071", "072", "073", "074", "076", "078", "079", "081", "082", "083"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    const number = Math.floor(1000000 + Math.random() * 9000000);

    return `${prefix}${number}`;
}

function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function generateDate() {
    const today = new Date();

    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);

    const endDate = new Date(today);
    endDate.setFullYear(today.getFullYear() + 1);

    const timeRange = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeRange;

    const randomDate = new Date(startDate.getTime() + randomTime);

    return formatDate(randomDate);
}

function generateToday() {
    return formatDate(new Date());
}

function generateDateOfBirth() {
    const today = new Date();

    const oldestDate = new Date(today);
    oldestDate.setFullYear(today.getFullYear() - 80);

    const youngestDate = new Date(today);
    youngestDate.setFullYear(today.getFullYear() - 18);

    const timeRange = youngestDate.getTime() - oldestDate.getTime();
    const randomTime = Math.random() * timeRange;

    const randomDate = new Date(oldestDate.getTime() + randomTime);

    return formatDate(randomDate);
}

function generateDateTime() {
    const today = new Date();

    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);

    const endDate = new Date(today);
    endDate.setFullYear(today.getFullYear() + 1);

    const timeRange = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeRange;

    const randomDate = new Date(startDate.getTime() + randomTime);

    const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
    const seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");

    return `${formatDate(randomDate)} ${hours}:${minutes}:${seconds}`;
}

//connect the generators to the fields

function generateValue(type) {
    switch (type) {
        case "name":
            return generateName();

        case "email":
            return generateEmail(generateName());

        case "phone":
            return generatePhone();

        case "number":
            return generateNumber();

        case "date":
            return generateDate();

        case "today":
            return generateToday();

        case "date_of_birth":
            return generateDateOfBirth();

        case "date_time":
            return generateDateTime();

        default:
            return "";
    }
}

/* it looks at these rows and collect that information
 & read the fields you create in the UI */

function getFields() {
    const fieldRows = document.querySelectorAll(".field-row");

    const fields = [];

    fieldRows.forEach((row) => {
        const nameInput = row.querySelector(".field-name");
        const typeSelect = row.querySelector(".field-type");

        const name = nameInput.value.trim();
        const type = typeSelect.value;

        if (name) {
            fields.push({
                name: name,
                type: type
            });
        }
    });

    return fields;
}

//generate records

function generateRecords(count, fields) {
    const records = [];

    for (let i = 0; i < count; i++) {
        const record = {};

        fields.forEach((field) => {
            if (field.type === "email") {
                const nameField = fields.find((item) => item.type === "name");

                if (nameField && record[nameField.name]) {
                    record[field.name] = generateEmail(record[nameField.name]);
                } else {
                    record[field.name] = generateEmail(generateName());
                }
            } else {
                record[field.name] = generateValue(field.type);
            }
        });

        records.push(record);
    }

    return records;
}

// Turn records into SQL

/* protects strings containing an apostrophe */
function escapeSqlValue(value) {
    return String(value).replace(/'/g, "''");
}

/* decides whether a value needs quotation marks */
function formatSqlValue(value, type) {
    if (type === "number") {
        return value;
    }

    return `'${escapeSqlValue(value)}'`;
}

/* actual SQL builder */
function generateSQL(tableName, fields, records) {
    const columnNames = fields.map((field) => field.name).join(", ");

    const valueRows = records.map((record) => {
        const values = fields.map((field) => {
            return formatSqlValue(record[field.name], field.type);
        });

        return `(${values.join(", ")})`;
    });

    return `INSERT INTO ${tableName} (${columnNames})\nVALUES\n${valueRows.join(",\n")};`;
}

//validate fields

function validateFields() {
    const fieldRows = document.querySelectorAll(".field-row");
    const fields = getFields();
    const seenNames = new Set();

    if (fieldRows.length === 0 || fields.length === 0) {
        return "Please add at least one field and enter its name.";
    }

    for (const row of fieldRows) {
        const nameInput = row.querySelector(".field-name");
        const name = nameInput.value.trim();

        if (!name) {
            return "Please enter a name for every field.";
        }

        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
            return `Invalid field name "${name}". Use letters, numbers, and underscores, starting with a letter or underscore.`;
        }

        const normalizedName = name.toLowerCase();

        if (seenNames.has(normalizedName)) {
            return `Duplicate field name "${name}". Each field must have a unique name.`;
        }

        seenNames.add(normalizedName);
    }

    return null;
}


// connect buttons 

generateButton.addEventListener("click", function () {
    const tableName = tableNameInput.value.trim();
    const recordCount = Number(recordCountInput.value);
    const fields = getFields();

    sqlOutput.value = "";

    const fieldError = validateFields();

    if (fieldError) {
        alert(fieldError);
        return;
    }

    if (!tableName) {
        alert("Please enter a table name.");
        tableNameInput.focus();
        return;
    }

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(tableName)) {
        alert(
            "Invalid table name. Use letters, numbers, and underscores, starting with a letter or underscore."
        );
        tableNameInput.focus();
        return;
    }

    if (
        !recordCountInput.value.trim() ||
        !Number.isInteger(recordCount) ||
        recordCount < 1 ||
        recordCount > 1000
    ) {
        alert("Please enter a whole number of records between 1 and 1000.");
        recordCountInput.focus();
        return;
    }

    const records = generateRecords(recordCount, fields);

    const sql = generateSQL(tableName, fields, records);

    sqlOutput.value = sql;
});

//copy button

copyButton.addEventListener("click", async function () {
    if (!sqlOutput.value) {
        return;
    }

    await navigator.clipboard.writeText(sqlOutput.value);

    copyButton.textContent = "Copied!";

    setTimeout(function () {
        copyButton.textContent = "Copy SQL";
    }, 2000);
});

// download button

downloadButton.addEventListener("click", function () {
    /*console.log("Download button clicked!");
    console.log("SQL content:", sqlOutput.value);*/

    if (!sqlOutput.value.trim()) {
        return;
    }

    const sqlContent = sqlOutput.value;

    const blob = new Blob([sqlContent], {
        type: "text/sql;charset=utf-8"
    });

    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "devseed-data.sql";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(downloadUrl);
});