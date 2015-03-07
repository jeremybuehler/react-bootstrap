import React from 'react';
import joinClasses from './utils/joinClasses';

const PageHeader = React.createClass({
  render() {
    return (
      <div {...this.props} className={joinClasses(this.props.className, 'page-header')}>
        <h1>{this.props.children}</h1>
      </div>
    );
  }
});

export default PageHeader;
