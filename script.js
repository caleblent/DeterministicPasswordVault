const seedPhrase = 'seed phrase words';
// const youtubeEl = document.getElementById('youtube');
const rowsListEl = document.getElementsByClassName('row');

// Add button event listeners to all rows
function addEventListeners(rowsList) {
    for (let i = 0; i < rowsList.length; i++) {
        addButtonsFunctionality(rowsList[i]);
    }
}

// Add number entry, calculate button, and copy button event listeners to one specific row
function addButtonsFunctionality(row) {
    row.querySelector('.number-entry').addEventListener('click', () => {
        calculatePassword(row);
    });
    row.querySelector('.calculate').addEventListener('click', () => {
        calculatePassword(row);
    });
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

// Calculates all the passwords for each row at the launching of the application
function calculateAllPasswords(rowsList) {
    for (let i = 0; i < rowsList.length; i++) {
        calculatePassword(rowsList[i]);
    }
}

//  Function that adds event listeners to YouTube row elements,
//  which enables the password to be calculated if interacted with
function calculatePassword(parentRowEl) {
    // 1) bring in the YouTube row elements
    const siteNameEl = parentRowEl.querySelector('.site');

    const passwordResultEl = parentRowEl.querySelector('.password-result');

    const numberEl = parentRowEl.querySelector('.number-entry');

    // As of right now, these are unused. I may find a way to include them in the future
    // const uppercaseEl = parentRowEl.querySelector('.upper-checkbox');
    // const lowercaseEl = parentRowEl.querySelector('.lower-checkbox');
    // const numbersEl = parentRowEl.querySelector('.nums-checkbox');
    // const dollarSignEl = parentRowEl.querySelector('.dollar-sign-checkbox');
    // const atSignEl = parentRowEl.querySelector('.at-sign-checkbox');
    // const exclamationPointEl = parentRowEl.querySelector(
    //     '.exclamation-point-checkbox'
    // );

    // 2) get the phrase to be hashed
    const phraseToHash =
        seedPhrase + ' ' + siteNameEl.innerText + ' ' + numberEl.value;

    console.log(phraseToHash);

    // 3) hash the phrase (using keccak256?)
    const hashedValue = keccak256(phraseToHash).toString('base64');

    console.log(hashedValue);

    // 4) set the password to this value
    passwordResultEl.innerText = hashedValue.slice(0, hashedValue.length - 1);
}

addEventListeners(rowsListEl);
calculateAllPasswords(rowsListEl);
