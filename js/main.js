import {renderPictures} from './pictures.js';
import {getData} from './api.js';
import './upload-form.js';

getData()
  .then((photos) => renderPictures(photos));
