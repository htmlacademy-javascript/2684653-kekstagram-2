import {openBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesSection = document.querySelector('.pictures');


const renderPicture = (photo) => {
  const photoCard = pictureTemplate.cloneNode(true);

  const cardImg = photoCard.querySelector('img');
  cardImg.src = photo.url;
  cardImg.alt = photo.description;

  photoCard.querySelector('.picture__comments').textContent = photo.comments.length;
  photoCard.querySelector('.picture__likes').textContent = photo.likes;

  photoCard.addEventListener('click', () => openBigPicture(photo));

  return photoCard;
};


const renderPictures = (photos) => {
  const picturesFragment = document.createDocumentFragment();
  photos.forEach((photo) => picturesFragment.append(renderPicture(photo)));
  picturesSection.append(picturesFragment);
};

export {renderPictures};
