/** @jsx element */

import {render,tree} from 'deku'
import element from 'virtual-element'
import { CSSModules, styles } from '../../../../lib/dekucssmodules.js'

/* assign the styles to deku-css-modules' style object */
import { wrapper } from 'css-video-wrap'
import videoStyles from './Video.css'
Object.assign(styles, wrapper, videoStyles)

CSSModules.render = function () {
  // the parent videwrap classes are passed in as css module classes
  // but the button classes are passed in as deku-css-module style names
	return (
      <div>
      	<div class={styles.videoWrapper}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/HBHJ0XGZfLs" frameBorder="0" allowFullScreen></iframe>
        </div>
        <button styleName='button blue'>press me</button>
        <button styleName='button'>press me</button>
      </div>
    )
}

/* Video */
let Video = {

  initialState () {
    return { }
  },

  afterUpdate (component) {
    let { props, state } = component;
  },

  afterMount (component, el, setState) {
    let { props, state } = component;
    props.styles = styles;
  },

  beforeUnmount (component) {
  }
}

Video.render = CSSModules

export {Video}
