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

export {getRandomInteger, getRandomArrayElement};
