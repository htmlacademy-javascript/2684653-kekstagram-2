import {isEscapeKey} from './util.js';

const ERROR_SHOW_TIME = 5000;

const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');


const showLoadError = (message) => {
  const loadError = loadErrorTemplate.cloneNode(true);
  loadError.querySelector('.data-error__title').textContent = message;

  document.body.append(loadError);

  setTimeout (() => {
    loadError.remove();
  }, ERROR_SHOW_TIME);
};


const showFormMessage = (state, onShow, onRemove) => {
  const formMessage = document.querySelector(`#${state}`).content.querySelector(`.${state}`).cloneNode(true);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeFormMessage();
    }
  };

  function removeFormMessage () {
    formMessage.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    onRemove?.();
  }

  formMessage.querySelector(`.${state}__button`).addEventListener('click', () => removeFormMessage());
  formMessage.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${state}__inner`)) {
      removeFormMessage();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);

  document.body.append(formMessage);
  onShow?.();
};


export {showLoadError, showFormMessage};
