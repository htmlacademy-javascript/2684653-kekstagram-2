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


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};


const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const createPhotoId = () => {
  let lastGenetatedId = 0;

  return function () {
    lastGenetatedId++;
    return lastGenetatedId;
  };
};


const createCommentId = () => {
  let lastGenetatedId = 0;

  return function () {
    lastGenetatedId++;
    return lastGenetatedId;
  };
};


const generatePhotoId = createPhotoId();
const generateCommentId = createCommentId();


const createComment = () => {
  const commentId = generateCommentId();
  const sentencesCount = getRandomInteger(1, 2);
  let messages = [];

  if (sentencesCount === 1) {
    messages = [getRandomArrayElement(MESSAGES)];
  } else {
    // Берём первую фразу
    const first = getRandomArrayElement(MESSAGES);
    // Ищем вторую, отличную от первой
    let second;
    do {
      second = getRandomArrayElement(MESSAGES);
    } while (second === first);
    messages = [first, second];
  }

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandomArrayElement(NAMES)
  };
};


const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(15, 300),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };

};


let photos = Array.from({length: 25}, createPhoto);
