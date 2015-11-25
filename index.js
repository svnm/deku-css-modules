/** @jsx element */

import {deku, render,tree} from 'deku'
import element from 'virtual-element'

let myFunc = {}
let styles = {}

let CSSModules = function (component) {
    let { props, state } = component;
    let { secondsElapsed } = state;

	// ITEMS...
    var items = myFunc.render()
    console.log(items)

    return (
    	items
    );

}

export { CSSModules, styles, myFunc }
