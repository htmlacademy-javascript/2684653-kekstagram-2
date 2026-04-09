import {isEscapeKey} from './util.js';

const ERROR_SHOW_TIME = 5000;

const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const formErrorTemplate = document.querySelector('#error').content.querySelector('.error');


const showLoadError = (message) => {
  const loadError = loadErrorTemplate.cloneNode(true);
  loadError.querySelector('.data-error__title').textContent = message;

  document.body.append(loadError);

  setTimeout (() => {
    loadError.remove();
  }, ERROR_SHOW_TIME);
};


const showFormError = (message, onShow, onRemove) => {
  const formError = formErrorTemplate.cloneNode(true);
  formError.querySelector('.error__title').textContent = message;

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeFormError();
    }
  };

  function removeFormError () {
    formError.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    onRemove?.();
  }

  formError.querySelector('.error__button').addEventListener('click', () => removeFormError());
  formError.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeFormError();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);

  document.body.append(formError);
  onShow?.();
};


export {showLoadError, showFormError};
