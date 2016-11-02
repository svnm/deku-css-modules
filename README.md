# deku-css-modules

[![npm version](https://badge.fury.io/js/deku-css-modules.svg)](https://badge.fury.io/js/deku-css-modules)

Mapping of class names to CSS modules in Deku components

## CSS Modules

[CSS Modules](https://github.com/css-modules/css-modules) uses a module bundler such as [webpack](http://webpack.github.io/docs/) to load CSS scoped to a particular document. 

CSS module loader will generate a unique name for a each CSS class at the time of loading the CSS document

CSS Modules with Deku looks like this:

```js
/** @jsx element */
import { element } from 'deku';
import styles from './table.css';

let Table = {
    render () {
        return <div class={styles.table}>
            <div class={styles.row}>
                <div class={styles.cell}>A0</div>
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

and a corresponding CSS file that matches those CSS classes... Awesome!

### deku-css-modules

Similar to [React CSS Modules](https://github.com/gajus/react-css-modules), Deku CSS Modules automates loading of CSS Modules using the `styleName` property. 

Check out the [deku-webpack-example](https://github.com/StevenIseki/deku-webpack-example)

```js
/** @jsx element */

import { element } from 'deku';
import CSSModules from 'deku-css-modules.js';
import styles from './table.css';

const Table = function () {
    return (
        <div styleName='table'>
            <div styleName='row'>
                <div styleName='cell'>A0</div>
            </div>
        </div>
    )
}

export default CSSModules(Table, styles);

```

Benefits of using `deku-css-modules`:

* You are not forced to use `camelCase` naming convention.
* You do not need to refer to the `styles` object every time you use a CSS Module.
* There is clear distinction between global CSS `class` and CSS Modules `styleName`

## Implementation

`deku-css-modules` extends the `render` method of the target component. It uses the value of `styleName` to look for CSS Modules in the associated styles object and appends the matching unique CSS class names to each `Element`s `className` property value.

## Usage

* Set up a [module bundler](#modulebundler) to load the [Interoperable CSS](https://github.com/css-modules/icss).
* Configure the render method of your component to use `deku-css-modules`

### Bundlers

#### webpack

* Install [`style-loader`](https://www.npmjs.com/package/style-loader) and [`css-loader`](https://www.npmjs.com/package/css-loader)
* Use [`extract-text-webpack-plugin`](https://www.npmjs.com/package/extract-text-webpack-plugin) to aggregate the CSS into a single file
* Setup your `/\.css$/` loader

Check out the example [deku-webpack-example](https://github.com/StevenIseki/deku-webpack-example)
### Extending Component Styles

Use `styles` property to overwrite the default component styles.

Explanation using `Table` component:

```js
/** @jsx element */
import { element } from 'deku';
import CSSModules from 'deku-css-modules.js';
import styles from './table.css';

const Table = function () {
    return (
        <div styleName='table'>
            <div styleName='row'>
                <div styleName='cell'>A0</div>
            </div>
        </div>
    )
}

export default CSSModules(Table, styles);
```

In this example, `CSSModules` is used to decorate `Table` component using `./table.css` CSS Modules. When `Table` component is rendered, it will use the properties of the `styles` object to construct `className` values.

Using `styles` property you can overwrite the default component `styles` object, e.g.

```js
import customStyles from './table-custom-styles.css';

<Table styles={customStyles} />;
```
[Interoperable CSS](https://github.com/css-modules/icss) can [extend other ICSS](https://github.com/css-modules/css-modules#dependencies). Use this feature to extend default styles, e.g.

```css
/* table-custom-styles.css */
.table {
    composes: table from './table.css';
}

.row {
    composes: row from './table.css';
}

/* .cell {
    composes: cell from './table.css';
} */

.table {
    width: 400px;
}

.cell {
    float: left; width: 154px; background: #eee; padding: 10px; margin: 10px 0 10px 10px;
}
```

In this example, `table-custom-styles.css` selectively extends `table.css` (the default styles of `Table` component).

Refer to the [`UsingStylesProperty` example](https://github.com/gajus/react-css-modules-examples/tree/master/src/UsingStylesProperty) for an example of a working implementation.

### `styles` Property

Decorated components inherit `styles` property that describes the mapping between CSS modules and CSS classes.

```js
const render = ({props}) => {
    <div>
        <p styleName='foo'></p>
        <p class={props.styles.foo}></p>
    </div>;
}
```

In the above example, `styleName='foo'` and `class={this.props.styles.foo}` are equivalent.

### Decorator
You need to decorate your component using `deku-css-modules`, e.g.

```js
/** @jsx element **/
import { element } from 'deku';
import CSSModules from 'deku-css-modules.js';
import styles from './table.css';

const Table = function () {
    return (
        <div styleName='table'>
            <div styleName='row'>
                <div styleName='cell'>A0</div>
            </div>
        </div>
    )
}

export default CSSModules(Table, styles);
```

Thats it!

As the name implies, `deku-css-modules` is compatible with the [ES7 decorators](https://github.com/wycats/javascript-decorators) syntax:

```js
/** @jsx element **/
import { element } from 'deku';
import CSSModules from 'deku-css-modules.js';
import styles from './table.css';

export default {
  @CSSModules(styles)
  render: () => {
    return (
        <div styleName='table'>
            <div styleName='row'>
                <div styleName='cell'>A0</div>
            </div>
        </div>
    )
  },
  onCreate: () => {
    console.log('A MyComponent entity was created!')
  }
}
```



#### Browserify

Refer to [`css-modulesify`](https://github.com/css-modules/css-modulesify).

## Development
    npm install
    npm run build
    npm test
    npm start

## License

[MIT](http://isekivacenz.mit-license.org/)


