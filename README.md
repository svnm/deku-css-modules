# deku-css-modules

[![npm version](https://badge.fury.io/js/deku-css-modules.svg)](https://badge.fury.io/js/deku-css-modules)

Mapping of class names to CSS modules in Deku components

## CSS Modules

[CSS Modules](https://github.com/css-modules/css-modules) uses a module bundler such as [webpack](http://webpack.github.io/docs/) to load CSS scoped to a particular document. CSS module loader will generate a unique name for a each CSS class at the time of loading the CSS document ([Interoperable CSS](https://github.com/css-modules/icss) to be precise). To see CSS Modules in practice, [webpack-demo](https://css-modules.github.io/webpack-demo/).

CSS Modules with Deku looks like this:

```jsx
import {render,tree} from 'deku'
import element from 'virtual-element'
import styles from './table.css';

let Table = {
    render () {
        return <div className={styles.table}>
            <div className={styles.row}>
                <div className={styles.cell}>A0</div>
            </div>
        </div>;
    }
}
```

Rendering the component will produce a markup similar to:

```js
<div class="table__table___32osj">
    <div class="table__row___2w27N">
        <div class="table__cell___2w27N">A0</div>
    </div>
</div>
```

and a corresponding CSS file that matches those CSS classes.

Awesome!

### deku-css-modules

Similar to [React CSS Modules](https://github.com/gajus/react-css-modules), Deku CSS Modules automates loading of CSS Modules using the `styleName` property. 

Check out the included [example](https://github.com/StevenIseki/deku-css-modules/tree/master/example)

```js
/** @jsx element */

import {render,tree} from 'deku'
import element from 'virtual-element'

import { CSSModules, styles } from 'deku-css-modules.js'

/* assign the styles to deku-css-modules' style object */
import tableStyles from './Table.css'
Object.assign(styles, tableStyles)

CSSModules.render = function () {
    return (
        <div styleName='table'>
            <div styleName='row'>
                <div styleName='cell'>A0</div>
                <div styleName='cell'>B0</div>
            </div>
        </div>
    )
}

let Table = {
  initialState () {
    return { }
  },
  afterUpdate (component) {
    let { props, state } = component;
  },
}

Table.render = CSSModules

export { Table }
```

Benefits of using `deku-css-modules`:

* You are not forced to use `camelCase` naming convention.
* You do not need to refer to the `styles` object every time you use a CSS Module.
* There is clear distinction between global CSS and CSS Modules, e.g.

```js
<div class='global-css' styleName='local-module'></div>
```

## The Implementation

`deku-css-modules` extends the `render` method of the target component. It will use the value of `styleName` to look for CSS Modules in the associated styles object and will append the matching unique CSS class names to the `Element` `className` property value.

## Usage

Setup consists of:

* Setting up a [module bundler](#modulebundler) to load the [Interoperable CSS](https://github.com/css-modules/icss).
* Configuring the render method of your component to use `deku-css-modules` render and pass your jsx/elements to this method.

### Module Bundler

#### webpack

* Install [`style-loader`](https://www.npmjs.com/package/style-loader) and [`css-loader`](https://www.npmjs.com/package/css-loader)
* You need to use [`extract-text-webpack-plugin`](https://www.npmjs.com/package/extract-text-webpack-plugin) to aggregate the CSS into a single file
* Setup your `/\.css$/` loader

Check out the included [webpack example](https://github.com/StevenIseki/deku-css-modules/tree/master/example)

#### Browserify

Refer to [`css-modulesify`](https://github.com/css-modules/css-modulesify).
