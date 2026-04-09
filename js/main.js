import {getData} from './api.js';
import {showDataError} from './data-error.js';
import {renderPictures} from './pictures.js';
import './upload-form.js';

getData()
  .then((photos) => renderPictures(photos))
  .catch((err) => showDataError(err.message));
