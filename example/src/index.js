/** @jsx element */

import Video from './components/Video/Video';
import { createApp, element } from 'deku';

let render = createApp(document.getElementById('root'));
let styles = {}

render(<Video color='pink' styles ={styles} />)