/**
 * Возвращает случайное целое число из диапазона [min, max] включительно.
 *
 * @param {number} min - Минимальное значение диапазона
 * @param {number} max - Максимальное значение диапазона
 * @returns {number} Случайное целое число
 *
 * @example
 * getRandomInteger(1, 10); // 5
 */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};


/**
 * Возвращает случайный элемент из переданного массива.
 *
 * @param {Array} elements - Массив элементов
 * @returns {*} Случайный элемент массива
 *
 * @example
 * getRandomArrayElement(['a', 'b', 'c']); // 'b'
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


/**
 * Проверяет есть ли дубликаты в массиве.
 *
 * @param {Array} elements - Массив элементов
 * @returns {boolean} Результат проверки
 */
const checkIfDuplicateExists = (elements) => new Set(elements).size !== elements.length;


/**
 * Проверяет, является ли нажатая клавиша клавишей Escape.
 * @param {KeyboardEvent} evt - Объект события клавиатуры
 * @returns {boolean} Возвращает `true`, если нажата клавиша Escape, иначе `false`
 */
const isEscapeKey = (evt) => evt.key === 'Escape';


const debounce = (callback, debounceDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), debounceDelay);
  };
};


const throttle = (callback, throttleDelay) => {
  let lastCallTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastCallTime >= throttleDelay) {
      callback.apply(this, rest);
      lastCallTime = now;
    }
  };
};


export {getRandomInteger, getRandomArrayElement, isEscapeKey, checkIfDuplicateExists, debounce, throttle};
