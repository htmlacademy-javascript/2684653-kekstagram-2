import {isEscapeKey} from './util.js';

const COMMENT_IMAGE_WIDTH = 35;
const COMMENT_IMAGE_HEIGHT = 35;
const COMMENTS_LOAD_STEP = 5;

const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img>img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');

const bigPictureCommentsList = bigPicture.querySelector('.social__comments');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureTotalComments = bigPicture.querySelector('.social__comment-total-count');
const bigPictureShownComments = bigPicture.querySelector('.social__comment-shown-count');

let totalCommentsCount, shownCommentsCount, commentsList;


const createCommentElement = (comment, isHidden) => {
  const commentItem = document.createElement('li');
  commentItem.className = 'social__comment';

  if (isHidden) {
    commentItem.classList.add('hidden');
  }

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


const updateShownCommentsCounter = (commentsCount) => {
  shownCommentsCount = commentsCount;
  bigPictureShownComments.textContent = shownCommentsCount;

  if (shownCommentsCount === totalCommentsCount) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
};


const renderComments = (comments) => {
  totalCommentsCount = comments.length;
  bigPictureTotalComments.textContent = totalCommentsCount;

  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment, idx) => {
    commentsFragment.append(
      createCommentElement(comment, idx >= COMMENTS_LOAD_STEP)
    );
  });

  bigPictureCommentsList.innerHTML = '';
  bigPictureCommentsList.append(commentsFragment);
  commentsList = [...bigPictureCommentsList.children];

  updateShownCommentsCounter(Math.min(COMMENTS_LOAD_STEP, totalCommentsCount));
};


const showCommentsPortion = () => {
  const lastCommentToShow = Math.min(shownCommentsCount + COMMENTS_LOAD_STEP, totalCommentsCount);

  for (let i = shownCommentsCount; i < lastCommentToShow; i++) {
    commentsList[i].classList.remove('hidden');
  }

  updateShownCommentsCounter(lastCommentToShow);
};


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


const togglePictureModal = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};


function closeBigPicture () {
  togglePictureModal();

  bigPictureCommentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}


const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureDescription.textContent = photo.description;
  bigPictureLikesCount.textContent = photo.likes;

  renderComments(photo.comments);

  togglePictureModal();
  document.addEventListener('keydown', onDocumentKeydown);
};


bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => closeBigPicture());
bigPictureCommentsLoader.addEventListener('click', () => showCommentsPortion());

export {openBigPicture};
