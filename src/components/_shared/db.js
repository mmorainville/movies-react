import 'lodash';
import low from 'lowdb';

import {DB_NAME} from './constants.js';

export const db = low(DB_NAME);
