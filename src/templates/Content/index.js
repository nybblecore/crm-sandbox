import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './content.scss';
@inject('commonStore', 'userStore')
@observer
class Content extends Component {

  render() {
    const { children } = this.props;
    return (
      <div className={`sq-template sq-template-content`}>
        <div className="container-fluid">{children}</div>
      </div>
    );
  }
}

Content.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.object,
  userStore: PropTypes.object,
  data: PropTypes.object
};

export default Content;
