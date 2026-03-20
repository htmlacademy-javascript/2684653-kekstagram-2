import {createPhotos} from './data.js';
import {renderPictures} from './pictures.js';

const PHOTO_COUNT = 25;

renderPictures(createPhotos(PHOTO_COUNT));
