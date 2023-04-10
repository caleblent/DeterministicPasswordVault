const seedPhrase = 'seed phrase words';
const youtubeEl = document.getElementById('youtube');

//  IIFE:
//  Function that adds event listeners to YouTube row elements,
//  which enables the password to be calculated if interacted with
(function addYouTubeEventListeners() {
    // 1) bring in the YouTube row elements
    const siteNameEl = youtubeEl.querySelector('.site'); // probably don't need this

    const passwordResultEl = youtubeEl.querySelector('.password-result');

    const numberEl = youtubeEl.querySelector('.number-entry');

    const uppercaseEl = youtubeEl.querySelector('.upper-checkbox');
    const lowercaseEl = youtubeEl.querySelector('.lower-checkbox');
    const numbersEl = youtubeEl.querySelector('.nums-checkbox');
    const dollarSignEl = youtubeEl.querySelector('.dollar-sign-checkbox');
    const atSignEl = youtubeEl.querySelector('.at-sign-checkbox');
    const exclamationPointEl = youtubeEl.querySelector(
        '.exclamation-point-checkbox'
    );

    // 2) get the phrase to be hashed
    const phraseToHash =
        seedPhrase + ' ' + siteNameEl.innerText + ' ' + numberEl.value;

    console.log(phraseToHash);

    // 3) hash the phrase (using keccak256?)
    const hashedValue = keccak256(phraseToHash).toString('hex');

    console.log(hashedValue);

    // 4) gather  the characters the user selected
    let charString = '';
    if (numbersEl.checked) {
        charString += '0123456789'; // 10
    }
    if (lowercaseEl.checked && uppercaseEl.checked) {
        charString += 'ABCDEFGHIJKLMnopqrstuvwxyz'; // 26
    } else if (lowercaseEl.checked) {
        charString += 'abcdefghijlkmnopqrstuvwxyz'; // 26
    } else if (uppercaseEl.checked) {
        charString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 26
    }
    if (dollarSignEl.checked) {
        charString += '$'; // 1
    }
    if (atSignEl.checked) {
        charString += '@'; // 1
    }
    if (exclamationPointEl.checked) {
        charString += '!'; // 1
    }
    console.log(charString); // out of 39 total

    // 5) convert the hashed value to
    let testValue = 'f3234adc234b334a';
    console.log('value to use instead for test: ', testValue);
    let convertedString = convertBase(
        testValue,
        16,
        charString.length,
        charString
    );
    console.log(convertedString);

    // 6) set the password to this value
    passwordResultEl.innerText = convertedString;
})();

function convertBase(value, from_base, to_base, base_numerals) {
    var range = base_numerals.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);

    var dec_value = value
        .split('')
        .reverse()
        .reduce(function (carry, digit, index) {
            if (from_range.indexOf(digit) === -1)
                throw new Error(
                    'Invalid digit `' + digit + '` for base ' + from_base + '.'
                );
            return (carry +=
                from_range.indexOf(digit) * Math.pow(from_base, index));
        }, 0);

    var new_value = '';
    while (dec_value > 0) {
        new_value = to_range[dec_value % to_base] + new_value;
        dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
}
