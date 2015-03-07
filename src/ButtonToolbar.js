import React from 'react';
import joinClasses from './utils/joinClasses';
import classSet from './utils/classSet';
import BootstrapMixin from './BootstrapMixin';

const ButtonToolbar = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    return (
      <div
        {...this.props}
        role="toolbar"
        className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </div>
    );
  }
});

export default ButtonToolbar;
