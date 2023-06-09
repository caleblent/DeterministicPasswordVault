const seedPhraseEl = document.getElementById('seed-phrase');
let currentSeedPhrase = seedPhraseEl.innerText;
const rowsListMaster = document.getElementsByClassName('row');
console.log(seedPhraseEl);

// add event listener to the seed phrase, which updates all passwords when modified
seedPhraseEl.addEventListener('input', (e) => {
    currentSeedPhrase = e.target.value;
    calculateAllPasswords(rowsListMaster);
});

// Add button event listeners to the master seed phrase and all rows
function addEventListeners(rowsList) {
    // start at i=1 so we skip the #labels
    for (let i = 1; i < rowsList.length; i++) {
        addButtonsFunctionality(rowsList[i]);
    }
}

// Add length entry, number entry, and copy button event listeners to one specific row
function addButtonsFunctionality(row) {
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

// Calculates all the passwords for each row at the launching of the application
function calculateAllPasswords(rowsList) {
    // start at i=1 so we skip the #labels
    for (let i = 1; i < rowsList.length; i++) {
        calculatePassword(rowsList[i]);
    }
}

//  Function that adds event listeners to YouTube row elements,
//  which enables the password to be calculated if interacted with
function calculatePassword(parentRowEl) {
    // 1) bring in the YouTube row elements
    const siteNameEl = parentRowEl.querySelector('.site');

    const passwordResultEl = parentRowEl.querySelector('.password-result');

    const lengthEl = parentRowEl.querySelector('.length-entry');
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
    console.log(seedPhraseEl.innerText);
    const phraseToHash =
        currentSeedPhrase + ' ' + siteNameEl.innerText + ' ' + numberEl.value;

    // 3) hash the phrase (using keccak256?)
    const hashedValue = keccak256(phraseToHash).toString('base64');

    // 4) trim this value to the "length" specified by the user
    // const trimmedValue = hashedValue.slice(0, parseInt(lengthEl.value) - 1);

    // 5) set the password to this value (but trimmed by the LENGTH value)
    passwordResultEl.innerText = hashedValue.slice(0, parseInt(lengthEl.value));
}

// I want both of these functions to run at the beginning
addEventListeners(rowsListMaster);
// this one I'm giving a slight delay just to make it run smoother
setTimeout(() => {
    calculateAllPasswords(rowsListMaster);
}, 20);
