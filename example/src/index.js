/** @jsx element */

import element from 'virtual-element'
import { Video } from './components/Video/Video';
import {render, tree} from 'deku'

let video = tree(
    <Video color='pink' />
);

render(video, document.getElementById('root'))