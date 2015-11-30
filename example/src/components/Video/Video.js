/** @jsx element */

import {render,tree} from 'deku'
import element from 'virtual-element'

import { CSSModules, styles, myFunc } from '../../../dekucssmodules.js'

/* assign the styles */
import { wrapper } from 'css-video-wrap'
import videoStyles from './Video.css'

Object.assign(styles, wrapper, videoStyles)

console.log(styles)

myFunc.render = function () {

	// this will move hopefully out to deku-css-modules
	let className = ''
	let styleName = styles[Object.keys(styles)[0]]
	if(styleName === styles.videoWrapper){
		className = styles.videoWrapper
	}
  console.log('the style name')
  console.log(styleName)

	// remember this is an ARRAY OF ELEMENTS returning
	return (
    	<div styleName='videoWrapper' class={className}>
        <div styleName='videoWrapper' class={className}>
          <button class={className} styleName='button blue'>press me</button>
          <button class={className} styleName='button blue'>press me</button>
          <button class={className} styleName='button blue'>press me</button>
        </div>
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
