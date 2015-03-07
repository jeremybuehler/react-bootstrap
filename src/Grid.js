import React from 'react';
import joinClasses from './utils/joinClasses';

const Grid = React.createClass({
  propTypes: {
    fluid: React.PropTypes.bool,
    componentClass: React.PropTypes.node.isRequired
  },

  getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render() {
    let ComponentClass = this.props.componentClass;
    let className = this.props.fluid ? 'container-fluid' : 'container';

    return (
      <ComponentClass
        {...this.props}
        className={joinClasses(this.props.className, className)}>
        {this.props.children}
      </ComponentClass>
    );
  }
});

export default Grid;
