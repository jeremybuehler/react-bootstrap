import React from 'react';
import joinClasses from './utils/joinClasses';
import BootstrapMixin from './BootstrapMixin';
import classSet from './utils/classSet';
import cloneWithProps from './utils/cloneWithProps';

const ListGroupItem = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
    active: React.PropTypes.any,
    disabled: React.PropTypes.any,
    header: React.PropTypes.node,
    onClick: React.PropTypes.func,
    eventKey: React.PropTypes.any,
    href: React.PropTypes.string,
    target: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bsClass: 'list-group-item'
    };
  },

  render() {
    let classes = this.getBsClassSet();

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    if (this.props.href || this.props.target || this.props.onClick) {
      return this.renderAnchor(classes);
    } else {
      return this.renderSpan(classes);
    }
  },

  renderSpan(classes) {
    return (
      <span {...this.props} className={joinClasses(this.props.className, classSet(classes))}>
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </span>
    );
  },

  renderAnchor(classes) {
    return (
      <a
        {...this.props}
        className={joinClasses(this.props.className, classSet(classes))}
      >
        {this.props.header ? this.renderStructuredContent() : this.props.children}
      </a>
    );
  },

  renderStructuredContent() {
    let header;
    if (React.isValidElement(this.props.header)) {
      header = cloneWithProps(this.props.header, {
        className: 'list-group-item-heading'
      });
    } else {
      header = (
        <h4 className="list-group-item-heading">
          {this.props.header}
        </h4>
      );
    }

    let content = (
      <p className="list-group-item-text">
        {this.props.children}
      </p>
    );

    return {
      header: header,
      content: content
    };
  }
});

export default ListGroupItem;
