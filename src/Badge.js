import React from 'react';
import joinClasses from './utils/joinClasses';
import ValidComponentChildren from './utils/ValidComponentChildren';
import classSet from './utils/classSet';

const Badge = React.createClass({
  propTypes: {
    pullRight: React.PropTypes.bool
  },

  hasContent() {
    return ValidComponentChildren.hasValidComponent(this.props.children) ||
      (typeof this.props.children === 'string') ||
      (typeof this.props.children === 'number');
  },

  render() {
    let classes = {
      'pull-right': this.props.pullRight,
      'badge': this.hasContent()
    };
    return (
      <span
        {...this.props}
        className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </span>
    );
  }
});

export default Badge;
