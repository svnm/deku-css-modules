/** @jsx element */

import {deku, render,tree} from 'deku'
import element from 'magic-virtual-element'

let myFunc = {}
let styles = {}

let CSSModules = function (component) {
    let { props, state } = component;
    let { secondsElapsed } = state;

    /* now you have the array of items, 
       match them up with styleName properties to 
       class...
    */

    console.log(styles.videoWrapper)
    /*
	let className = ''
	let styleName = styles[Object.keys(styles)[0]]
	if(styleName === styles.videoWrapper){
		className = styles.videoWrapper
	}
	*/

	// ITEMS...
    var items = myFunc.render()
    console.log('the items')
    console.log(items)

    /* but you need to map styleName's to class */
    // let parent = {class: items.attributes.class, style: items.attributes.style }

    let children = [];

    let xChildren = buildDom(items)

    if(items.children.length){
        items.children.map(function(i) {
            let child = element(
                i.type, 
                {class: i.attributes.class },
                'click me'
            )
            children.push(child)
        })
    }

    let parent = element(
        items.type, 
        {class: items.attributes.class },
        children
    )

    /*
    let divStyle = {
      color: 'white'
    };

    var element1 = { class: "App foo bar", style: divStyle }
    var element2 = { class: "Button" }

    let itemsX = element('div', element1 , 
        [
          element('button', element2 , 'Click Me!')
        ]
    );
    */

    return (
    	xChildren
    );
}

function updateClass (item) {
    if(item.attributes.class !== undefined){
        item.attributes.class = 'u not cool'
    }
    return item
}

function buildChildren (items) {

    if(items.type === 'div'){
        // div
        items.children.map(function (i) {
            i = updateClass(i)
            buildChildren(i);
        })        
    } else {
        // button
        updateClass(items)
    }

    return items;
}

/* just a note, this doesn't need to rebuild the dom
   just change the style elements */
function buildDom(items) {

    updateClass(items);
    /* for now assume div is the only parent element */
    let children = buildChildren(items)

    return element(
        items.type, 
        {class: items.attributes.class },
        children
    )
}


export { CSSModules, styles, myFunc }
