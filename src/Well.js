import React from 'react';
import joinClasses from './utils/joinClasses';
import classSet from './utils/classSet';
import BootstrapMixin from './BootstrapMixin';

const Well = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps() {
    return {
      bsClass: 'well'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    return (
      <div {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </div>
    );
  }
});

export default Well;
