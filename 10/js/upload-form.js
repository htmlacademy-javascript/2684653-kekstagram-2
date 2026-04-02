import {isEscapeKey, checkIfDuplicateExists} from './util.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const IMAGE_SCALE_STEP = 25;
const MIN_IMAGE_SCALE = 25;
const MAX_IMAGE_SCALE = 100;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFormCancel = uploadForm.querySelector('.img-upload__cancel');

const imgInput = uploadForm.querySelector('.img-upload__input');
const imgPreview = uploadForm.querySelector('.img-upload__preview>img');
const imgUploadEffects = uploadForm.querySelector('.img-upload__effects');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const effectLevel = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');

const scaleValue = uploadForm.querySelector('.scale__control--value');
const scaleSmallerButton = uploadForm.querySelector('.scale__control--smaller');
const scaleBiggerButton = uploadForm.querySelector('.scale__control--bigger');

let hashtagErrorMessage = '';
let currentImageScale = MAX_IMAGE_SCALE;
let selectedEffect = 'none';
effectLevel.classList.add('hidden');

const Filters = {
  chrome: {
    effect: 'grayscale',
    minValue: 0,
    maxValue: 1,
    step: 0.1
  },
  sepia: {
    effect: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1
  },
  marvin: {
    effect: 'invert',
    minValue: 0,
    maxValue: 100,
    step: 1,
    measure: '%'
  },
  phobos: {
    effect: 'blur',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    measure: 'px'
  },
  heat: {
    effect: 'brightness',
    minValue: 1,
    maxValue: 3,
    step: 0.1
  }
};


noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
/**
 * Валидирует хэштеги загружаемой фотографии
 */
const validateHashtag = (value) => {
  hashtagErrorMessage = '';

  if (value.trim() !== '') {
    const hashtags = value.trim().toLowerCase().split(/\s+/);

    if (hashtags.length > MAX_HASHTAG_COUNT) {
      hashtagErrorMessage = 'Превышено количество хэштегов';
      return false;
    }

    if (checkIfDuplicateExists(hashtags)) {
      hashtagErrorMessage = 'Хэштеги повторяются';
      return false;
    }

    for (let i = 0; i < hashtags.length; i++) {
      if (!hashtagRegExp.test(hashtags[i])) {
        hashtagErrorMessage = 'Введён невалидный хэштег';
        return false;
      }
    }
  }
  return true;
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


const changeImageScale = (newScale) => {
  currentImageScale = newScale;
  scaleValue.value = `${newScale}%`;
  imgPreview.style.transform = `scale(${newScale / 100})`;
};


const resetImageFilter = () => {
  effectLevelValue.value = '';
  imgPreview.style.filter = '';
  effectLevel.classList.add('hidden');
};


const changeImageFilter = (filterObject, newValue) => {
  effectLevel.classList.remove('hidden');

  const filterValue = `${newValue}${filterObject.measure ?? ''}`;
  imgPreview.style.filter = `${filterObject.effect}(${filterValue})`;
  effectLevelValue.value = filterValue;
};


/**
 * Сбрасывает значения всех полей формы загрузки изображения
 */
const clearFormInputs = () => {
  imgInput.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';

  changeImageScale(MAX_IMAGE_SCALE);
  resetImageFilter();

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
  () => hashtagErrorMessage
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


scaleSmallerButton.addEventListener('click', () => {
  changeImageScale(Math.max(MIN_IMAGE_SCALE, currentImageScale - IMAGE_SCALE_STEP));
});
scaleBiggerButton.addEventListener('click', () => {
  changeImageScale(Math.min(MAX_IMAGE_SCALE, currentImageScale + IMAGE_SCALE_STEP));
});

imgUploadEffects.addEventListener('input', () => {
  selectedEffect = document.querySelector('input[name=effect]:checked').value;
  if (Object.hasOwn(Filters, selectedEffect)) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: Filters[selectedEffect].minValue,
        max: Filters[selectedEffect].maxValue
      },
      start: Filters[selectedEffect].maxValue,
      step: Filters[selectedEffect].step
    });
  } else {
    resetImageFilter();
  }
});

effectLevelSlider.noUiSlider.on('update', () => {
  if (Object.hasOwn(Filters, selectedEffect)) {
    changeImageFilter(Filters[selectedEffect], effectLevelSlider.noUiSlider.get());
  }
});
