# deku-css-modules
mapping of class names to CSS modules inside Deku components

## CSS Modules

**NOTE: This is a work in progress at the moment, the element parsing and style mapping still needs to be implemented.**

[CSS Modules](https://github.com/css-modules/css-modules) are awesome. If you are not familiar with CSS Modules, it is a concept of using a module bundler such as [webpack](http://webpack.github.io/docs/) to load CSS scoped to a particular document. CSS module loader will generate a unique name for a each CSS class at the time of loading the CSS document ([Interoperable CSS](https://github.com/css-modules/icss) to be precise). To see CSS Modules in practice, [webpack-demo](https://css-modules.github.io/webpack-demo/).

In the context of Deku, CSS Modules look like this:

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

### webpack `css-loader`

[CSS Modules](https://github.com/css-modules/css-modules) is a specification that can be implemented in multiple ways. `deku-css-modules` leverages the existing CSS Modules implementation.

Similar to React CSS Modules, Deku CSS Modules automates loading of CSS Modules using `styleName` property, e.g. 

It exports a seperate render function, which rebuilds the deku elements with the generated css modules classes.


```js
import {render,tree} from 'deku'
import element from 'virtual-element'
import styles from './table.css';

let Table = {
    render () {
        return <div styleName='table'>
            <div styleName='row'>
                <div styleName='cell'>A0</div>
                <div styleName='cell'>B0</div>
            </div>
        </div>;
    }
}

/* IN PROGRESS */

```

Using `deku-css-modules`:

* You are not forced to use the `camelCase` naming convention.
* You do not need to refer to the `styles` object every time you use a CSS Module.
* There is clear distinction between global CSS and CSS Modules, e.g.

```js
<div class='global-css' styleName='local-module'></div>
```

* You can enforce use of a single CSS module per `Element` ([`allowMultiple`](#allowmultiple) option).

## The Implementation

`deku-css-modules` extends the `render` method of the target component. It will use the value of `styleName` to look for CSS Modules in the associated styles object and will append the matching unique CSS class names to the `Element` `className` property value.

## Usage

Setup consists of:

* Setting up a [module bundler](#modulebundler) to load the [Interoperable CSS](https://github.com/css-modules/icss).
* Configuring the render method of your component to use `react-css-modules` render and pass your jsx/elements to this method.

### Module Bundler

#### webpack

* Install [`style-loader`](https://www.npmjs.com/package/style-loader) and [`css-loader`](https://www.npmjs.com/package/css-loader).
* You need to use [`extract-text-webpack-plugin`](https://www.npmjs.com/package/extract-text-webpack-plugin) to aggregate the CSS into a single file.
* Setup `/\.css$/` loader:

```js
{
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
}
```

* Setup `extract-text-webpack-plugin` plugin:

```js
new ExtractTextPlugin('app.css', {
    allChunks: true
})
```

#### Browserify

Refer to [`css-modulesify`](https://github.com/css-modules/css-modulesify).
