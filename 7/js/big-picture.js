import {isEscapeKey} from './util.js';

const COMMENT_IMAGE_WIDTH = 35;
const COMMENT_IMAGE_HEIGHT = 35;

const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img>img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');

const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureTotalComments = bigPicture.querySelector('.social__comment-total-count');
const bigPictureShownComments = bigPicture.querySelector('.social__comment-shown-count');


const createCommentElement = (comment) => {
  const commentItem = document.createElement('li');
  commentItem.className = 'social__comment';

  const commentImg = document.createElement('img');
  commentImg.className = 'social__picture';
  commentImg.src = comment.avatar;
  commentImg.alt = comment.name;
  commentImg.width = COMMENT_IMAGE_WIDTH;
  commentImg.height = COMMENT_IMAGE_HEIGHT;
  commentItem.append(commentImg);

  const commentText = document.createElement('p');
  commentText.className = 'social__text';
  commentText.textContent = comment.message;
  commentItem.append(commentText);

  return commentItem;
};


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};


const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  bigPictureCommentsCount.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureDescription.textContent = photo.description;
  bigPictureLikesCount.textContent = photo.likes;

  bigPictureTotalComments.textContent = photo.comments.length;
  bigPictureShownComments.textContent = photo.comments.length;

  bigPictureCommentsList.innerHTML = '';
  if (photo.comments.length > 0) {
    const commentsFragment = document.createDocumentFragment();
    photo.comments.forEach((comment) => commentsFragment.append(createCommentElement(comment)));
    bigPictureCommentsList.append(commentsFragment);
  }

  document.addEventListener('keydown', onDocumentKeydown);
};


bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => closeBigPicture());

export {openBigPicture};
