import React from 'react';
import joinClasses from './utils/joinClasses';
import classSet from './utils/classSet';
import BootstrapMixin from './BootstrapMixin';

const ButtonGroup = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    vertical:  React.PropTypes.bool,
    justified: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'button-group'
    };
  },

  render() {
    let classes = this.getBsClassSet();
    classes['btn-group'] = !this.props.vertical;
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;

    return (
      <div
        {...this.props}
        className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </div>
    );
  }
});

export default ButtonGroup;
