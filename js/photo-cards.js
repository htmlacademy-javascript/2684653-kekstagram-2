import {createPhotos} from './data.js';

const PHOTO_COUNT = 25;

const picturesSection = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();


createPhotos(PHOTO_COUNT).forEach((photo) => {
  const photoCard = pictureTemplate.cloneNode(true);

  const cardImg = photoCard.querySelector('img');
  cardImg.src = photo.url;
  cardImg.alt = photo.description;

  const cardComments = photoCard.querySelector('.picture__comments');
  cardComments.textContent = photo.comments.length;

  const cardLikes = photoCard.querySelector('.picture__likes');
  cardLikes.textContent = photo.likes;

  picturesFragment.append(photoCard);
});


picturesSection.append(picturesFragment);
