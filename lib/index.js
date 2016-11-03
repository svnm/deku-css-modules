'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _deku = require('deku');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var linkClass = function linkClass(vnode, styles) {
  if (vnode.children) {
    vnode.children = vnode.children.map(function (vnode) {
      return linkClass(vnode, styles);
    });
  }
  if (vnode.attributes) {
    (function () {
      var classes = new Set();
      if (vnode.attributes.class) {
        vnode.attributes.class.split(' ').forEach(function (name) {
          classes.add(name);
        });
      }
      if (vnode.attributes.styleName) {
        vnode.attributes.styleName.split(' ').forEach(function (name) {
          if (styles[name] !== undefined) {
            classes.add(styles[name]);
          }
        });
      }
      delete vnode.attributes.styleName;
      if (classes.size) {
        vnode.attributes.class = Array.from(classes).join(' ');
      }
    })();
  }
  return vnode;
};

var functionConstructor = function functionConstructor(Component, defaultStyles, options) {
  var render = (0, _isFunction2.default)(Component) ? Component : Component.render;
  var WrappedComponent = function WrappedComponent(model) {
    var styles = void 0;
    var props = model.props;


    if (props.styles) {
      styles = props.styles;
    } else if ((0, _isObject2.default)(defaultStyles)) {
      props.styles = defaultStyles;
      styles = defaultStyles;
    } else {
      styles = {};
    }

    var renderResult = render(model);

    if (renderResult) {
      return linkClass(renderResult, styles, options);
    }

    return _deku.vnode.createEmptyElement();
  };

  if ((0, _isFunction2.default)(Component)) {
    return WrappedComponent;
  } else {
    return Object.assign(Component, {
      render: WrappedComponent
    });
  }
};

/**
 * When used as a ES7 decorator.
 */
var decoratorConstructor = function decoratorConstructor(defaultStyles, options) {
  return function (Component) {
    return functionConstructor(Component, defaultStyles, options);
  };
};

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if ((0, _isFunction2.default)(args[0]) || (0, _isObject2.default)(args[0]) && (0, _isFunction2.default)(args[0].render)) {
    return functionConstructor(args[0], args[1], args[2]);
  } else {
    return decoratorConstructor(args[0], args[1]);
  }
};