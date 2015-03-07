import React from 'react';
import joinClasses from './utils/joinClasses';

const Row = React.createClass({
  propTypes: {
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;

    return (
      <ComponentClass {...this.props} className={joinClasses(this.props.className, 'row')}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Row;
