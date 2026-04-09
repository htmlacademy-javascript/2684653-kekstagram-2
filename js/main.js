import {getData} from './api.js';
import {showLoadError} from './data-messages.js';
import {renderPictures} from './pictures.js';
import {showFilters, setDefaultFilterClick, setRandomFilterClick, setDiscussedilterClick, filterDiscussed, filterRandom} from './img-filters.js';
import './upload-form.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    showFilters();

    setDefaultFilterClick(() => renderPictures(photos));
    setRandomFilterClick(() => renderPictures(photos, filterRandom));
    setDiscussedilterClick(() => renderPictures(photos, filterDiscussed));
  })
  .catch((err) => showLoadError(err.message));
