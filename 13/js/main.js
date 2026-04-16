import {getData} from './api.js';
import {showLoadError} from './data-messages.js';
import {renderPictures} from './pictures.js';
import {
  showFilters, setDefaultFilterClick, setRandomFilterClick, setDiscussedilterClick,
  filterDiscussed, filterRandom
} from './img-filters.js';
import {debounce} from './util.js';
import './upload-form.js';

const RERENDER_DELAY = 500;

getData()
  .then((photos) => {
    renderPictures(photos);
    showFilters();

    setDefaultFilterClick(debounce(
      () => renderPictures(photos),
      RERENDER_DELAY
    ));
    setRandomFilterClick(debounce(
      () => renderPictures(photos, filterRandom),
      RERENDER_DELAY
    ));
    setDiscussedilterClick(debounce(
      () => renderPictures(photos, filterDiscussed),
      RERENDER_DELAY
    ));
  })
  .catch((err) => showLoadError(err.message));
