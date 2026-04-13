import {openBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesSection = document.querySelector('.pictures');

const picturesTitle = picturesSection.querySelector('.pictures__title');
const picturesUpload = picturesSection.querySelector('.img-upload');


/**
 * Создаёт DOM-элемент карточки фотографии.
 *
 * @param {Object} photo - Данные фотографии
 * @returns {HTMLElement} Элемент карточки фотографии
 */
const renderPicture = (photo) => {
  const photoCard = pictureTemplate.cloneNode(true);

  const cardImg = photoCard.querySelector('img');
  cardImg.src = photo.url;
  cardImg.alt = photo.description;

  photoCard.querySelector('.picture__comments').textContent = photo.comments.length;
  photoCard.querySelector('.picture__likes').textContent = photo.likes;

  photoCard.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });

  return photoCard;
};


/**
 * Отрисовывает все фотографии на странице
 *
 * @param {Array<Object>} photos - Массив объектов фотографий
 * @param {function} filterCallback - Функция фильтрации фотографий перед отображением
 */
const renderPictures = (photos, filterCallback) => {
  const picturesFragment = document.createDocumentFragment();

  const renderingPictures = filterCallback ? filterCallback(photos) : photos.slice();

  renderingPictures.forEach((photo) => picturesFragment.append(renderPicture(photo)));

  picturesSection.innerHTML = '';
  picturesSection.append(picturesTitle);
  picturesSection.append(picturesUpload);
  picturesSection.append(picturesFragment);
};

export {renderPictures};
