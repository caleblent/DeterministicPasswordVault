// starting with the same file, I'm going to attempt to change this so that the
// order of type of symbol is random as well

const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerText

  if (!password) {
    return
  }

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked

  resultEl.innerText = generatePassword2(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  )
})

// modified password generator
function generatePassword2(lower, upper, number, symbol, length) {
  let generatedPassword = ''
  let randomCharString = ''

  if (lower) {
    randomCharString += 'abcdefghijlkmnopqrstuvwxyz' // 26
  }
  if (upper) {
    randomCharString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // 26
  }
  if (number) {
    randomCharString += '1234567890' // 10
  }
  if (symbol) {
    randomCharString += '!@#$%^&*(){}[]=<>/,.' // 20
  }

  for (let i = 0; i < length; i++) {
    generatedPassword += getRandomChar(randomCharString)
  }

  const finalPassword = generatedPassword.slice(0, length)

  return finalPassword
}

// Returns a random char from the string that's passed to the function
function getRandomChar(charStr) {
  return charStr[Math.floor(Math.random() * charStr.length)]
}