/** @jsx element */

import element from 'virtual-element'
import { Video } from './components/Video/Video';
import {deku, render,tree} from 'deku'

//import { CSSModules } from '../../../dekucssmodules.js'



let counter = tree(
  <div>
    <Video color='pink' />
  </div>
);

function something(app) {
}

/*
deku(counter)
  .use(something)
*/

render(counter, document.getElementById('root'))