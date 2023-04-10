// import keccak256 library
const keccak256 = require('keccak256');

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
    const hashedPhrase = keccak256(phraseToHash).toString('hex');
    console.log(hashedPhrase);

    // 4)
})();
