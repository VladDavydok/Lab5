function validateForm(form) {
    const nameRegex = /^[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$/;
    const groupRegex = /^[А-ЯІЇЄ]{2,3}-\d{2}$/;
    const variantRegex = /^\d+$/;
    const facultyRegex = /^[А-ЯІЇЄ]{3,}$/;
    const dobRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    if (form.name.value.length < 3 || !nameRegex.test(form.name.value)) {
        alert('Заповніть поле "ПІБ" правильно (наприклад, Давидок В.О.)');
        return false;
    }

    if (form.group.value.length < 3 || !groupRegex.test(form.group.value)) {
        alert('Заповніть поле "Група" правильно (наприклад, ІК-21)');
        return false;
    }

    if (form.variant.value.length === 0 || !variantRegex.test(form.variant.value)) {
        alert('Заповніть поле "Варіант" (лише цифри)');
        return false;
    }

    if (form.faculty.value.length < 3 || !facultyRegex.test(form.faculty.value)) {
        alert('Заповніть поле "Факультет" правильно (лише великі літери, наприклад, ФІОТ)');
        return false;
    }

    if (!dobRegex.test(form.dob.value)) {
        alert('Заповніть поле "Дата народження" правильно (дд.мм.рррр)');
        return false;
    }

    const displayData = `
        ПІБ: ${form.name.value} <br>
        Група: ${form.group.value} <br>
        Варіант: ${form.variant.value} <br>
        Факультет: ${form.faculty.value} <br>
        Дата народження: ${form.dob.value}
    `;
    document.getElementById("displayData").innerHTML = displayData;
    return false;
}

// Параметри таблиці
const rows = 6;
const cols = 6;
const variantNumber = 24;

// Створення таблиці
function createTable() {
    const table = document.getElementById('myTable');
    let cellNumber = 1;

    for (let i = 0; i < rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cols; j++) {
            const cell = row.insertCell();
            cell.textContent = cellNumber;

            if (cellNumber === variantNumber) {
                cell.addEventListener('mouseover', () => {
                    cell.style.backgroundColor = getRandomColor();
                });

                cell.addEventListener('click', () => {
                    const colorPicker = document.getElementById('colorPicker');
                    colorPicker.click();
                    colorPicker.oninput = () => {
                        cell.style.backgroundColor = colorPicker.value;
                    };
                });

                cell.addEventListener('dblclick', () => {
                    colorSecondaryDiagonal();
                });
            }

            cellNumber++;
        }
    }
}

// Генерація випадкового кольору
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Зміна кольору клітинок побічної діагоналі
function colorSecondaryDiagonal() {
    const table = document.getElementById('myTable');
    for (let i = 0; i < rows; i++) {
        const cell = table.rows[i].cells[cols - i - 1];
        cell.style.backgroundColor = getRandomColor();
    }
}

// Ініціалізація таблиці
createTable();