import React from 'react';
import joinClasses from './utils/joinClasses';
import classSet from './utils/classSet';
import BootstrapMixin from './BootstrapMixin';
import constants from './constants';

const Glyphicon = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    glyph: React.PropTypes.oneOf(constants.GLYPHS).isRequired
  },

  getDefaultProps() {
    return {
      bsClass: 'glyphicon'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    classes['glyphicon-' + this.props.glyph] = true;

    return (
      <span {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.children}
      </span>
    );
  }
});

export default Glyphicon;
