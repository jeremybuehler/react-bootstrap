import React from 'react';
import joinClasses from './utils/joinClasses';

const Jumbotron = React.createClass({
  render() {
    return (
      <div {...this.props} className={joinClasses(this.props.className, 'jumbotron')}>
        {this.props.children}
      </div>
    );
  }
});

export default Jumbotron;
