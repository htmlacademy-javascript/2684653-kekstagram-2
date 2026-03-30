import {isEscapeKey, checkIfDuplicateExists} from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFormCancel = uploadForm.querySelector('.img-upload__cancel');

const imgInput = uploadForm.querySelector('.img-upload__input');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hashtagRegExp = new RegExp('^#[a-zа-яё0-9]{1,19}$', 'i');
/**
 * Валидирует хэштеги загружаемой фотографии
 */
const validateHashtag = (value) => {
  if (value !== '') {
    const hashtags = value.trim().split(' ').map((tag) => (tag.toLowerCase()));

    if ((hashtags.length > MAX_HASHTAG_COUNT) || (checkIfDuplicateExists(hashtags))) {
      return false;
    }

    for (let i = 0; i < hashtags.length; i++) {
      if (!hashtagRegExp.test(hashtags[i])) {
        return false;
      }
    }
  }
  return true;
};


/**
 * Генерирует сообщение об ошибке для введенных хэштегов
 */
const getHashtagErrorMessage = (value) => {
  if (value !== '') {
    const hashtags = value.trim().split(' ').map((tag) => (tag.toLowerCase()));

    if (hashtags.length > MAX_HASHTAG_COUNT) {
      return 'Превышено количество хэштегов';
    }

    if (checkIfDuplicateExists(hashtags)) {
      return 'Хэштеги повторяются';
    }

  }
  return 'Введён невалидный хэштег';
};


/**
 * Валидирует комментарий к загружаемой фотографии
 */
const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;


/**
 * Переключает видимость модального окна с большой фотографией
 */
const toggleFormModal = () => {
  uploadFormOverlay.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};


/**
 * Сбрасывает значения всех полей формы загрузки изображения
 */
const clearFormInputs = () => {
  imgInput.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';

  pristine.reset(); // Сбрасываем состояние Pristine
};


/**
 * Обработчик нажатия клавиши на документе. Закрывает форму загрузки по Escape
 *
 * @param {KeyboardEvent} evt - Объект события клавиатуры
 */
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};


/**
 * Закрывает модальное окно с формой загрузки фотографии
 */
function closeUploadForm () {
  clearFormInputs();
  toggleFormModal();

  document.removeEventListener('keydown', onDocumentKeydown);
}


/**
 * Обработчик отправки формы загрузки изображения
 *
 * @param {Event} evt - Объект события
 */
const onUploadFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};


/**
 * Открывает модальное окно с формой загрузки фотографии
 *
 */
const openUploadForm = () => {
  toggleFormModal();
  document.addEventListener('keydown', onDocumentKeydown);
};


hashtagInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
pristine.addValidator(
  hashtagInput,
  validateHashtag,
  getHashtagErrorMessage
);

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Превышена максимальная длина комментария'
);

imgInput.addEventListener('input', () => openUploadForm());
uploadFormCancel.addEventListener('click', () => closeUploadForm());

uploadForm.addEventListener('submit', onUploadFormSubmit);
