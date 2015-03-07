import React from 'react';
import joinClasses from './utils/joinClasses';
import classSet from './utils/classSet';
import BootstrapMixin from './BootstrapMixin';

const Label = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'label',
      bsStyle: 'default'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    return (
      <span {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </span>
    );
  }
});

export default Label;
