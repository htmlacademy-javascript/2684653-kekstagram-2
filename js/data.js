import { getRandomInteger, getRandomArrayElement } from './util.js';

const COMMENTS_MAX_COUNT = 30;
const AVATAR_MAX_ID = 6;

const PHOTO_DESCRIPTIONS = [
  'Момент из жизни',
  'Красивый кадр',
  'Интересный ракурс',
  'Яркое воспоминание',
  'Случайный снимок',
  'Запечатлённый момент',
  'Фотография на память',
  'Один день из жизни',
  'Взгляд на мир',
  'Мгновение',
  'Кадр из фильма',
  'В объективе',
  'Так вижу я',
  'Настроение',
  'Впечатление'
];

const NAMES = [
  'Тимофей', 'Кирилл', 'Ксения',
  'Илья', 'Дарья', 'Давид',
  'София', 'Мария', 'Максим',
  'Даниил', 'Дмитрий', 'Роман',
  'Вероника', 'Ева', 'Лев'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const Likes = {
  MIN: 15,
  MAX: 200
};


/**
 * Создаёт генератор уникальных идентификаторов для фотографий.
 * Возвращаемая функция при каждом вызове увеличивает счётчик на 1 и возвращает новое значение.
 *
 * @returns {function(): number} Функция-генератор идентификаторов
 *
 * @example
 * const generateId = createPhotoId();
 * generateId(); // 1
 * generateId(); // 2
 */
const createPhotoId = () => {
  let lastGenetatedId = 0;

  return function () {
    lastGenetatedId++;
    return lastGenetatedId;
  };
};


/**
 * Создаёт генератор уникальных идентификаторов для комментариев.
 * Возвращаемая функция при каждом вызове увеличивает счётчик на 1 и возвращает новое значение.
 *
 * @returns {function(): number} Функция-генератор идентификаторов комментариев
 *
 * @example
 * const generateCommentId = createCommentId();
 * generateCommentId(); // 1
 */
const createCommentId = () => {
  let lastGenetatedId = 0;

  return function () {
    lastGenetatedId++;
    return lastGenetatedId;
  };
};


const generatePhotoId = createPhotoId();
const generateCommentId = createCommentId();


/**
 * Создаёт объект комментария со случайными данными.
 * Поля:
 * - id: уникальный идентификатор
 * - avatar: путь к аватарке
 * - message: строка из одного или двух предложений массива `MESSAGES`
 * - name: случайное имя из массива `NAMES`
 *
 * @returns {Object} Объект комментария
 *
 * @example
 * createComment();
 * // {
 * //   id: 5,
 * //   avatar: 'img/avatar-3.svg',
 * //   message: 'Всё отлично! Моя бабушка случайно чихнула...',
 * //   name: 'Дарья'
 * // }
 */
const createComment = () => {
  const sentencesCount = getRandomInteger(1, 2);
  let message;

  if (sentencesCount === 1) {
    message = getRandomArrayElement(MESSAGES);
  } else {
    const first = getRandomArrayElement(MESSAGES);
    let second;
    do {
      second = getRandomArrayElement(MESSAGES);
    } while (second === first);
    message = `${first} ${second}`;
  }

  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_MAX_ID)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES)
  };
};


/**
 * Создаёт объект фотографии со случайными данными.
 * Поля:
 * - id: уникальный идентификатор
 * - url: путь к изображению
 * - description: случайное описание из массива `PHOTO_DESCRIPTIONS`
 * - likes: случайное число от `Likes.MIN` до `Likes.MAX`
 * - comments: массив комментариев (длина от 0 до `COMMENTS_MAX_COUNT`)
 *
 * @returns {Object} Объект фотографии
 *
 * @example
 * createPhoto();
 * // {
 * //   id: 1,
 * //   url: 'photos/1.jpg',
 * //   description: 'Момент из жизни',
 * //   likes: 150,
 * //   comments: [ { ... }, { ... } ]
 * // }
 */
const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(Likes.MIN, Likes.MAX),
    comments: Array.from({length: getRandomInteger(0, COMMENTS_MAX_COUNT)}, createComment)
  };

};


/**
 * Создаёт заданное количество объектов фотографий и добавляет их в массив `photos`.
 *
 * @param {number} photoCount - Количество фотографий, которые необходимо создать.
 * @returns {void} Функция наполняет внешний массив `photos`.
 *
 * @example
 * createPhotos(5); // добавит 5 новых фотографий в массив photos
 */
const createPhotos = (photoCount) => {
  const photos = [];

  for (let i = 0; i < photoCount; i++) {
    photos.push(createPhoto());
  }

  return photos;
};

export {createPhotos};
