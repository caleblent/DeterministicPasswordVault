// This file was originally a CTRL C CTRL V of script.js
// This one seeks to add rows in dynamically, rather than
// maniputlating the HTML given rows.

// needed variables that won't get deleted
const container = document.querySelector('.flexbox-container');
const seedPhraseEl = document.getElementById('seed-phrase');
// const labelsEl = document.getElementById('labels'); might not need this tbh
let currentSeedPhrase = seedPhraseEl.innerText;

// Calculates all the passwords for each row by iteratively calling calculatePassword() on each row in the list
function calculateAllPasswords(rows) {
    // start at i=1 so we skip the #labels
    for (let i = 1; i < rows.length; i++) {
        calculatePassword(rows[i]);
    }
}

//  Calculates the password of a given row
function calculatePassword(parentRowEl) {
    // 1) bring in the row elements
    const siteNameEl = parentRowEl.querySelector('.site');

    const passwordResultEl = parentRowEl.querySelector('.password-result');

    const lengthEl = parentRowEl.querySelector('.length-entry');
    const numberEl = parentRowEl.querySelector('.number-entry');

    // 2) get the phrase to be hashed
    const phraseToHash =
        currentSeedPhrase + ' ' + siteNameEl.innerText + ' ' + numberEl.value;

    // 3) hash the phrase (using keccak256?)
    const hashedValue = keccak256(phraseToHash).toString('base64');

    // 4) set the password to this value (and trim it to the LENGTH specified by the user)
    passwordResultEl.innerText = hashedValue.slice(0, parseInt(lengthEl.value));
}

function addRows(data) {
    for (let i = 0; i < data.length; i++) {
        // create row
        const row = document.createElement('div');
        // add .row class to it
        row.classList.add('row');

        // add site
        const site = document.createElement('div');
        site.classList.add('site');
        // get the 'site' value from the JSON data
        site.innerText = data[i].site;
        row.appendChild(site);

        // add passowrd // add password-result
        const password = document.createElement('div');
        password.classList.add('password');
        password.innerHTML =
            '<span class="password-result" disabled>null</span>';
        row.appendChild(password);

        // add length
        const length = document.createElement('div');
        length.classList.add('length');
        // get the 'length' value from the JSON data
        length.innerHTML = `<input type="number" class="length-entry" min="0" max="64" value="${data[i].char_length}"/>`;
        // add the event listener that recalculates password when interacted with
        length.addEventListener('click', () => {
            calculatePassword(row);
        });
        // add the element to the row
        row.appendChild(length);

        // add number
        const number = document.createElement('div');
        number.classList.add('number');
        // get the 'number' value from the JSON data
        number.innerHTML = `<input type="number" class="number-entry" min="0" max="20" value="${data[i].number}"/>`;
        // add the event listener that recalculates password when interacted with
        number.addEventListener('click', () => {
            calculatePassword(row);
        });
        // add the element to the row
        row.appendChild(number);

        // add copy button
        const copyButton = document.createElement('div');
        copyButton.classList.add('copy');
        // event listener that copies the password to clipboard when clicked
        copyButton.addEventListener('click', () => {
            const textarea = document.createElement('textarea');
            const password = row.querySelector('.password-result').innerText;
            if (!password) {
                return;
            }
            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
        });
        // add clipboard icon
        const clipboard = document.createElement('i');
        clipboard.classList.add('far');
        clipboard.classList.add('fa-clipboard');
        copyButton.appendChild(clipboard);
        // add the element to the row
        row.appendChild(copyButton);

        // add delete button
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('delete');
        // add event listener that deletes row when clicked
        deleteButton.addEventListener('click', () => {
            row.remove();
        });
        // add trash can icon
        const trashCan = document.createElement('i');
        trashCan.classList.add('fa-solid');
        trashCan.classList.add('fa-trash-can');
        deleteButton.appendChild(trashCan);
        // add delete element to row
        row.appendChild(deleteButton);

        // add this now completed row to the table
        container.appendChild(row);
    }
}

async function getData(data_file) {
    let data_object = await fetch(data_file);
    let data_text = await data_object.text();
    let data = JSON.parse(data_text);
    // puts data into web page
    addRows(data);
}

// IIFE for running the program
(() => {
    // reads data from .txt file, puts it into a data object, then uses that data object to add content to web page
    getData('js/data.txt');
    // add event listener to the seed phrase, which updates all passwords when modified
    seedPhraseEl.addEventListener('input', (e) => {
        currentSeedPhrase = e.target.value;
        // dynamically grabs all rows, since rows can be added/deleted by user
        calculateAllPasswords(container.getElementsByClassName('row'));
    });
    // wait 100ms, then calculate all row passwords
    setTimeout(() => {
        calculateAllPasswords(container.getElementsByClassName('row'));
    }, 100);
})();
