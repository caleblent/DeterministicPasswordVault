// This file was originally a CTRL C CTRL V of script.js
// This one seeks to add rows in dynamically, rather than
// maniputlating the HTML given rows.

// needed variables that won't get deleted
const container = document.querySelector('.flexbox-container');
const seedPhraseEl = document.getElementById('seed-phrase');
// const labelsEl = document.getElementById('labels'); might not need this tbh
let currentSeedPhrase = seedPhraseEl.innerText;

// DATA: list of rows to bring in
const data = ['YouTube', 'Facebook', 'Third', 'Fourth', 'Fifth'];

// Add button event listeners to the master seed phrase and all rows
function addAllEventListeners(rowsList) {
    // start at i=1 so we skip the #labels
    for (let i = 1; i < rowsList.length; i++) {
        addEventListeners(rowsList[i]);
    }
}

// Add length entry, number entry, and copy button event listeners to one specific row
function addEventListeners(row) {
    // LENGTH --> modifies the number of characters in the password output
    row.querySelector('.length-entry').addEventListener('click', () => {
        calculatePassword(row);
    });
    // NUMBER --> generates a new "iteration"/password (goes from 0 to 100)
    row.querySelector('.number-entry').addEventListener('click', () => {
        calculatePassword(row);
    });
    // COPY button = copies the password string to clipboard
    row.querySelector('.copy').addEventListener('click', () => {
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
}

// Calculates all the passwords for each row by iteratively calling calculatePassword() on each row in the list
function calculateAllPasswords(rowsList) {
    // start at i=1 so we skip the #labels
    for (let i = 1; i < rowsList.length; i++) {
        calculatePassword(rowsList[i]);
    }
}

//  Calculates the password of a given row
function calculatePassword(parentRowEl) {
    // 1) bring in the YouTube row elements
    const siteNameEl = parentRowEl.querySelector('.site');

    const passwordResultEl = parentRowEl.querySelector('.password-result');

    const lengthEl = parentRowEl.querySelector('.length-entry');
    const numberEl = parentRowEl.querySelector('.number-entry');

    // 2) get the phrase to be hashed
    console.log(seedPhraseEl.innerText);
    const phraseToHash =
        currentSeedPhrase + ' ' + siteNameEl.innerText + ' ' + numberEl.value;

    // 3) hash the phrase (using keccak256?)
    const hashedValue = keccak256(phraseToHash).toString('base64');

    // 4) set the password to this value (and trim it to the LENGTH specified by the user)
    passwordResultEl.innerText = hashedValue.slice(0, parseInt(lengthEl.value));
}

function addRows(rowNames) {
    for (let i = 0; i < rowNames.length; i++) {
        addRow(rowNames[i]);
    }
}

function addRow(rowName) {
    // create row
    const row = document.createElement('div');
    // add .row class to it
    row.classList.add('row');

    // add site
    const site = document.createElement('div');
    site.classList.add('site');
    site.innerText = rowName;
    row.appendChild(site);

    // add passowrd // add password-result
    const password = document.createElement('div');
    password.classList.add('password');
    password.innerHTML = '<span class="password-result" disabled>null</span>';
    row.appendChild(password);

    // add length
    const length = document.createElement('div');
    length.classList.add('length');
    length.innerHTML =
        '<input type="number" class="length-entry" min="0" max="64" value="12"/>';
    row.appendChild(length);

    // add
    const number = document.createElement('div');
    number.classList.add('number');
    number.innerHTML =
        '<input type="number" class="number-entry" min="0" max="20" value="0"/>';
    row.appendChild(number);

    // add copy
    const copy = document.createElement('div');
    copy.classList.add('copy');
    const clipboard = document.createElement('i');
    clipboard.classList.add('far');
    clipboard.classList.add('fa-clipboard');
    // see if can combine the top 2 lines into 1
    copy.appendChild(clipboard);
    row.appendChild(copy);

    container.appendChild(row);
}

// IIFE for running the program
(() => {
    // add rows from data
    addRows(data);
    // add event listeners to all rows
    addAllEventListeners(container.getElementsByClassName('row'));
    // calculate all row passwords
    calculateAllPasswords(container.getElementsByClassName('row'));
    // add event listener to the seed phrase, which updates all passwords when modified
    seedPhraseEl.addEventListener('input', (e) => {
        currentSeedPhrase = e.target.value;
        // dynamically grabs all rows, since rows can be added/deleted by user
        calculateAllPasswords(container.getElementsByClassName('row'));
    });
})();
