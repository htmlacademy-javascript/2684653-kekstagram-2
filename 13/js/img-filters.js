import {getRandomArrayElements} from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const filters = document.querySelector('.img-filters');

const defaultFilterButton = filters.querySelector('#filter-default');
const randomFilterButton = filters.querySelector('#filter-random');
const discussedFilterButton = filters.querySelector('#filter-discussed');

let activeFilterButton = defaultFilterButton;


const comparePhotosDiscussion = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filterDiscussed = (photos) => photos.slice().sort(comparePhotosDiscussion);

const filterRandom = (photos) => getRandomArrayElements(photos, RANDOM_PHOTOS_COUNT);

const showFilters = () => filters.classList.remove('img-filters--inactive');
const changeActiveFilter = (newActiveFilter) => {
  activeFilterButton.classList.remove('img-filters__button--active');
  newActiveFilter.classList.add('img-filters__button--active');
  activeFilterButton = newActiveFilter;
};

const onFilterClick = (evt) => {
  if (activeFilterButton !== evt.target) {
    changeActiveFilter(evt.target);
  }
};


const setDefaultFilterClick = (callback) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    onFilterClick(evt);
    callback();
  });
};


const setRandomFilterClick = (callback) => {
  randomFilterButton.addEventListener('click', (evt) => {
    onFilterClick(evt);
    callback();
  });
};


const setDiscussedilterClick = (callback) => {
  discussedFilterButton.addEventListener('click', (evt) => {
    onFilterClick(evt);
    callback();
  });
};


export {showFilters, setDefaultFilterClick, setRandomFilterClick, setDiscussedilterClick, filterDiscussed, filterRandom};
