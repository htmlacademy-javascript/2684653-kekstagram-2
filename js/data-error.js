const ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showDataError = (message) => {
  const dataError = dataErrorTemplate.cloneNode(true);
  dataError.querySelector('.data-error__title').text = message;

  document.body.append(dataError);

  setTimeout (() => {
    dataError.remove();
  }, ERROR_SHOW_TIME);
};

export {showDataError};
