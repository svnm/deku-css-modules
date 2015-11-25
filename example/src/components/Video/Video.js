/** @jsx element */

import {render,tree} from 'deku'
import element from 'virtual-element'

import { CSSModules, styles, myFunc } from '../../../dekucssmodules.js'

/* assign the styles */
import { wrapper } from 'css-video-wrap'
Object.assign(styles, wrapper)

console.log(styles)

myFunc.render = function () {

	// this will move hopefully out to deku-css-modules
	let className = ''
	let styleName = styles[Object.keys(styles)[0]]
	if(styleName === styles.videoWrapper){
		className = styles.videoWrapper
	}

	// remember this is an ARRAY OF ELEMENTS returning
	return (
    	<div styleName='videoWrapper' class={className}>
        	<iframe width="560" height="315" src="https://www.youtube.com/embed/HBHJ0XGZfLs" frameBorder="0" allowFullScreen></iframe>
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
