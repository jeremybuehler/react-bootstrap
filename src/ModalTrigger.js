import React from 'react';
import OverlayMixin from './OverlayMixin';
import cloneWithProps from './utils/cloneWithProps';

import createChainedFunction from './utils/createChainedFunction';

const ModalTrigger = React.createClass({
  mixins: [OverlayMixin],

  propTypes: {
    modal: React.PropTypes.node.isRequired
  },

  getInitialState() {
    return {
      isOverlayShown: false
    };
  },

  show() {
    this.setState({
      isOverlayShown: true
    });
  },

  hide() {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle() {
    this.setState({
      isOverlayShown: !this.state.isOverlayShown
    });
  },

  renderOverlay() {
    if (!this.state.isOverlayShown) {
      return <span />;
    }

    return cloneWithProps(
      this.props.modal,
      {
        onRequestHide: this.hide
      }
    );
  },

  render() {
    let child = React.Children.only(this.props.children);
    return cloneWithProps(
      child,
      {
        onClick: createChainedFunction(child.props.onClick, this.toggle)
      }
    );
  }
});

export default ModalTrigger;
