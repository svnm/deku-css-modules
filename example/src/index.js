/** @jsx element */

import element from 'virtual-element'
import { Video } from './components/Video/Video';
import {deku, render,tree} from 'deku'

//import { CSSModules } from '../../../dekucssmodules.js'

let video = tree(
    <Video color='pink' />
);

function something(app) {
}

/*
deku(counter)
  .use(something)
*/

render(video, document.getElementById('root'))