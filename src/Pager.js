import React from 'react';
import joinClasses from './utils/joinClasses';
import cloneWithProps from './utils/cloneWithProps';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

const Pager = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func
  },

  render() {
    return (
      <ul
        {...this.props}
        className={joinClasses(this.props.className, 'pager')}>
        {ValidComponentChildren.map(this.props.children, this.renderPageItem)}
      </ul>
    );
  },

  renderPageItem(child, index) {
    return cloneWithProps(
      child,
      {
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.ref,
        key: child.key ? child.key : index
      }
    );
  }
});

export default Pager;
