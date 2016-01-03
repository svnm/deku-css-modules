/** @jsx element */

/* styles object, component styles and css modules to be assigned to */
let styles = {}

/*
    deku css modules...
    runs the render function on your deku component
    runs the components render function, which builds a virtual dom object
    it then reparse's the class names from styleName to css module class names
    on each vdom node
*/
let CSSModules = function (component) {
    let { props, state } = component;
    /*
        here we have all of the styles passed from the component,
        because they assigned them to deku-css-modules style Object
    */
    console.log(styles)

    /*
        the items from the components render function,
        run the function and now we have the virtual dom object here
    */
    let items = CSSModules.render()

    let cssParsedItems = walkDom(items)
    return cssParsedItems
}

/* 
    update with the css module class name, based on the styleName key
    e.g. styleName blue = class name MyComponent__blue___3QhTp
*/
function updateClass (item) {
    if(item.attributes === undefined) {
        return item
    }

    if(item.attributes.styleName === undefined){
        return item
    }
    
    /* 
        as we are updating classes from styleName, 
        if undefined init class to ''
    */
    if(item.attributes.class === undefined){    
        item.attributes.class = ''
    }

    let styleNameArray = item.attributes.styleName.split(' ')
    /* map through the styleName's array */
    if(styleNameArray.length){
        styleNameArray.map(function (styleName) {
            item.attributes.class += ' ' + styles[styleName]
        })
    }
    
    return item
}

/* recursively updates the style names on elements */
function walkDom (items) {

    updateClass(items)

    /* if the dom element has a child, recurse again */ 
    if(items.children){
        items.children.map(function (i) {
            walkDom(i)
        })        
    }

    return items;
}

export { CSSModules, styles }
