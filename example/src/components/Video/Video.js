/** @jsx element */

import { element } from 'deku'
import CSSModules from '../../../../src/index.js'

/* assign the styles to deku-css-modules' style object */
import { wrapper } from 'css-video-wrap'
import videoStyles from './Video.css'
let styles = Object.assign({}, wrapper, videoStyles)

const render = function (model) {
  // the parent videwrap classes are passed in as css module classes
  // but the button classes are passed in as deku-css-module style names
  return (
    <div>
		<div className={styles.videoWrapper}>
			<iframe width="560" height="315" src="https://www.youtube.com/embed/HBHJ0XGZfLs" frameBorder="0" allowFullScreen></iframe>
		</div>
		<button styleName='button blue'>press me</button>
		<button styleName='button'>press me</button>
    </div>
  )
}

function onCreate (model) {
  console.log('Vedio component entity was created!')
}

export default {
  render: CSSModules(render, styles),
  onCreate
}
