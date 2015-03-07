import React from 'react';
import joinClasses from './utils/joinClasses';
import classSet from './utils/classSet';
import cloneWithProps from './utils/cloneWithProps';

import createChainedFunction from './utils/createChainedFunction';
import ValidComponentChildren from './utils/ValidComponentChildren';

const DropdownMenu = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  },

  render() {
    let classes = {
        'dropdown-menu': true,
        'dropdown-menu-right': this.props.pullRight
      };

    return (
        <ul
          {...this.props}
          className={joinClasses(this.props.className, classSet(classes))}
          role="menu">
          {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
        </ul>
      );
  },

  renderMenuItem(child, index) {
    return cloneWithProps(
      child,
      {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),

        // Force special props to be transferred
        key: child.key ? child.key : index,
        ref: child.ref
      }
    );
  }
});

export default DropdownMenu;
