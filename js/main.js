import {getData} from './api.js';
import {showLoadError} from './data-messages.js';
import {renderPictures} from './pictures.js';
import './upload-form.js';

getData()
  .then((photos) => renderPictures(photos))
  .catch((err) => showLoadError(err.message));
