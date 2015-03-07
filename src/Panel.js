import React from 'react';
import joinClasses from './utils/joinClasses';
import classSet from './utils/classSet';
import cloneWithProps from './utils/cloneWithProps';

import BootstrapMixin from './BootstrapMixin';
import CollapsableMixin from './CollapsableMixin';

const Panel = React.createClass({
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    onSelect: React.PropTypes.func,
    header: React.PropTypes.node,
    footer: React.PropTypes.node,
    eventKey: React.PropTypes.any
  },

  getDefaultProps() {
    return {
      bsClass: 'panel',
      bsStyle: 'default'
    };
  },

  handleSelect(e) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(this.props.eventKey);
      this._isChanging = false;
    }

    e.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  },

  shouldComponentUpdate() {
    return !this._isChanging;
  },

  getCollapsableDimensionValue() {
    return this.refs.panel.getDOMNode().scrollHeight;
  },

  getCollapsableDOMNode() {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.refs.panel.getDOMNode();
  },

  render() {
    let classes = this.getBsClassSet();
    classes.panel = true;

    return (
      <div {...this.props} className={joinClasses(this.props.className, classSet(classes))}
        id={this.props.collapsable ? null : this.props.id} onSelect={null}>
        {this.renderHeading()}
        {this.props.collapsable ? this.renderCollapsableBody() : this.renderBody()}
        {this.renderFooter()}
      </div>
    );
  },

  renderCollapsableBody() {
    return (
      <div className={classSet(this.getCollapsableClassSet('panel-collapse'))} id={this.props.id} ref="panel">
        {this.renderBody()}
      </div>
    );
  },

  renderBody() {
    let allChildren = this.props.children;
    let bodyElements = [];

    function getProps() {
      return {key: bodyElements.length};
    }

    function addPanelChild (child) {
      bodyElements.push(cloneWithProps(child, getProps()));
    }

    function addPanelBody (children) {
      bodyElements.push(
        <div className="panel-body" {...getProps()}>
          {children}
        </div>
      );
    }

    // Handle edge cases where we should not iterate through children.
    if (!Array.isArray(allChildren) || allChildren.length === 0) {
      if (this.shouldRenderFill(allChildren)) {
        addPanelChild(allChildren);
      } else {
        addPanelBody(allChildren);
      }
    } else {
      let panelBodyChildren = [];
      let maybeRenderPanelBody = () => {
        if (panelBodyChildren.length === 0) {
          return;
        }

        addPanelBody(panelBodyChildren);
        panelBodyChildren = [];
      };

      allChildren.forEach(function(child) {
        if (this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      }.bind(this));

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  shouldRenderFill(child) {
    return React.isValidElement(child) && child.props.fill != null;
  },

  renderHeading() {
    let header = this.props.header;

    if (!header) {
      return null;
    }

    if (!React.isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsable ?
        this.renderCollapsableTitle(header) : header;
    } else if (this.props.collapsable) {
      header = cloneWithProps(header, {
        className: 'panel-title',
        children: this.renderAnchor(header.props.children)
      });
    } else {
      header = cloneWithProps(header, {
        className: 'panel-title'
      });
    }

    return (
      <div className="panel-heading">
        {header}
      </div>
    );
  },

  renderAnchor(header) {
    return (
      <a
        href={'#' + (this.props.id || '')}
        className={this.isExpanded() ? null : 'collapsed'}
        onClick={this.handleSelect}>
        {header}
      </a>
    );
  },

  renderCollapsableTitle(header) {
    return (
      <h4 className="panel-title">
        {this.renderAnchor(header)}
      </h4>
    );
  },

  renderFooter() {
    if (!this.props.footer) {
      return null;
    }

    return (
      <div className="panel-footer">
        {this.props.footer}
      </div>
    );
  }
});

export default Panel;
