import {buckets} from "./mixins/buckets.js";
import {cost} from "./mixins/cost.js";
import {modifier} from "./mixins/modifier.js";
import {value} from "./mixins/value.js";
const Mixins = {buckets, cost, modifier, value};

import {BucketItem} from './classes/bucketItem.js';
import {Game, log} from './classes/game.js';
import {Assignment} from './classes/assignment.js';
import {Resource} from './classes/resource.js';
import {Technology} from './classes/technology.js';
import {Tribe} from './classes/tribe.js';
import {Action} from './classes/actions.js';

export {Mixins, BucketItem, Game, log, Assignment, Resource, Technology, Tribe, Action};