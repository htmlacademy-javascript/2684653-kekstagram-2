import {createPhotos} from './data.js';
import {renderPictures} from './photo-cards.js';

const PHOTO_COUNT = 25;

renderPictures(createPhotos(PHOTO_COUNT));
