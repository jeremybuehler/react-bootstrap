import React from 'react';
import TransitionEvents from './utils/TransitionEvents';

const CollapsableMixin = {

  propTypes: {
    collapsable: React.PropTypes.bool,
    defaultExpanded: React.PropTypes.bool,
    expanded: React.PropTypes.bool
  },

  getInitialState() {
    return {
      expanded: this.props.defaultExpanded != null ? this.props.defaultExpanded : null,
      collapsing: false
    };
  },

  handleTransitionEnd() {
    this._collapseEnd = true;
    this.setState({
      collapsing: false
    });
  },

  componentWillReceiveProps(newProps) {
    if (this.props.collapsable && newProps.expanded !== this.props.expanded) {
      this._collapseEnd = false;
      this.setState({
        collapsing: true
      });
    }
  },

  _addEndTransitionListener() {
    let node = this.getCollapsableDOMNode();

    if (node) {
      TransitionEvents.addEndEventListener(
        node,
        this.handleTransitionEnd
      );
    }
  },

  _removeEndTransitionListener() {
    let node = this.getCollapsableDOMNode();

    if (node) {
      TransitionEvents.removeEndEventListener(
        node,
        this.handleTransitionEnd
      );
    }
  },

  componentDidMount() {
    this._afterRender();
  },

  componentWillUnmount() {
    this._removeEndTransitionListener();
  },

  componentWillUpdate(nextProps) {
    let dimension = (typeof this.getCollapsableDimension === 'function') ?
      this.getCollapsableDimension() : 'height';
    let node = this.getCollapsableDOMNode();

    this._removeEndTransitionListener();
  },

  componentDidUpdate(prevProps, prevState) {
    this._afterRender();
  },

  _afterRender() {
    if (!this.props.collapsable) {
      return;
    }

    this._addEndTransitionListener();
    setTimeout(this._updateDimensionAfterRender, 0);
  },

  _updateDimensionAfterRender() {
    let node = this.getCollapsableDOMNode();
    if (node) {
        let dimension = (typeof this.getCollapsableDimension === 'function') ?
            this.getCollapsableDimension() : 'height';
        node.style[dimension] = this.isExpanded() ?
            this.getCollapsableDimensionValue() + 'px' : '0px';
    }
  },

  isExpanded() {
    return (this.props.expanded != null) ?
      this.props.expanded : this.state.expanded;
  },

  getCollapsableClassSet(className) {
    let classes = {};

    if (typeof className === 'string') {
      className.split(' ').forEach(function (name) {
        if (name) {
          classes.name = true;
        }
      });
    }

    classes.collapsing = this.state.collapsing;
    classes.collapse = !this.state.collapsing;
    classes.in = this.isExpanded() && !this.state.collapsing;

    return classes;
  }
};

export default CollapsableMixin;
