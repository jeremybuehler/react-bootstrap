import React from 'react';
import CustomPropTypes from './utils/CustomPropTypes';

export default {
  propTypes: {
    container: CustomPropTypes.mountable
  },

  getDefaultProps() {
    return {
      container: {
        // Provide `getDOMNode` fn mocking a React component API. The `document.body`
        // reference needs to be contained within this function so that it is not accessed
        // in environments where it would not be defined, e.g. nodejs. Equally this is needed
        // before the body is defined where `document.body === null`, this ensures
        // `document.body` is only accessed after componentDidMount.
        getDOMNode() {
          return document.body;
        }
      }
    };
  },

  componentWillUnmount() {
    this._unrenderOverlay();
    if (this._overlayTarget) {
      this.getContainerDOMNode()
        .removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
  },

  componentDidUpdate() {
    this._renderOverlay();
  },

  componentDidMount() {
    this._renderOverlay();
  },

  _mountOverlayTarget() {
    this._overlayTarget = document.createElement('div');
    this.getContainerDOMNode()
      .appendChild(this._overlayTarget);
  },

  _renderOverlay() {
    if (!this._overlayTarget) {
      this._mountOverlayTarget();
    }

    let overlay = this.renderOverlay();

    // Save reference to help testing
    if (overlay !== null) {
      this._overlayInstance = React.render(overlay, this._overlayTarget);
    } else {
      // Unrender if the component is null for transitions to null
      this._unrenderOverlay();
    }
  },

  _unrenderOverlay() {
    React.unmountComponentAtNode(this._overlayTarget);
    this._overlayInstance = null;
  },

  getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }

    if (this._overlayInstance) {
      return this._overlayInstance.getDOMNode();
    }

    return null;
  },

  getContainerDOMNode() {
    return this.props.container.getDOMNode ?
      this.props.container.getDOMNode() : this.props.container;
  }
};
