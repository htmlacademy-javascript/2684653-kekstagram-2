/**
* Проверяет, не превышает ли длина строки заданный максимум.
*
* @param {string} string - Строка для проверки
* @param {number} maxLength - Максимально допустимая длина
*
* @returns {boolean} `true`, если длина строки меньше или равна maxLength, иначе `false`
*
* @example
* checkMaxLength('проверяемая строка', 20); // true
* checkMaxLength('проверяемая строка', 10); // false
*/
function checkMaxLength (string, maxLength) {
  return string.length <= maxLength;
}


/**
* Проверяет, является ли строка палиндромом, без учета пробелов и регистра.
*
* @param {string} string - Строка для проверки
*
* @returns {boolean} `true`, если строка является палиндромом, иначе `false`
*
* @example
* checkIfPalindrome('Лёша на полке клопа нашёл '); // true
*/
function checkIfPalindrome (string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < normalizedString.length / 2; i++) {
    if (normalizedString[normalizedString.length - (i + 1)] !== normalizedString[i]) {
      return false;
    }
  }

  return true;
}


/**
* Извлекает цифры из переданного значения и возвращает их в виде целого положительного числа.
*
* @param {string | number} value - Значение, из которого нужно извлечь цифры
*
* @returns {number} Целое положительное число, составленное из цифр, или NaN, если цифр нет.
*
* @example
* extractNumber('ECMAScript 2022'); // 2022
* extractNumber('а я томат'); // NaN
* extractNumber(-1); // 1
* extractNumber(1.5); // 15
*/
function extractNumber (value) {
  const processingString = (typeof value === 'string') ? value : value.toString();
  let stringDigits = '';

  for (let i = 0; i < processingString.length; i++) {
    const char = processingString[i];
    if (char >= '0' && char <= '9') {
      stringDigits += char;
    }
  }

  return parseInt(stringDigits, 10);
}
