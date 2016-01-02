/** @jsx element */

import {render,tree} from 'deku'
import element from 'virtual-element'

import { CSSModules, styles, myFunc } from '../../../dekucssmodules.js'

/* assign the styles to deku-css-modules' style object */
import { wrapper } from 'css-video-wrap'
import videoStyles from './Video.css'
Object.assign(styles, wrapper, videoStyles)

myFunc.render = function () {
  // the parent videwrap classes are passed in as css module classes
  // the button's are passed in as deku-css-module style names
	return (
    	<div class={styles.videoWrapper}>
          <button styleName='button blue'>press me</button>
          <button styleName='button'>press me</button>
      </div>
    );

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
