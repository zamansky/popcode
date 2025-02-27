import React from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import ErrorSublist from './ErrorSublist';

class ErrorList extends React.Component {
  render() {
    const docked = get(this, 'props.docked', false);

    return (
      <div className={
        classnames(
          'errorList',
          'output-item',
          {'errorList--docked': docked, 'output-item--shrink': docked}
        )}
      >
        <ErrorSublist
          language="html"
          errors={this.props.html}
          onErrorClicked={this.props.onErrorClicked}
        />
        <ErrorSublist
          language="css"
          errors={this.props.css}
          onErrorClicked={this.props.onErrorClicked}
        />
        <ErrorSublist
          language="javascript"
          errors={this.props.javascript}
          onErrorClicked={this.props.onErrorClicked}
        />
      </div>
    );
  }
}

ErrorList.propTypes = {
  html: React.PropTypes.array.isRequired,
  css: React.PropTypes.array.isRequired,
  javascript: React.PropTypes.array.isRequired,
  onErrorClicked: React.PropTypes.func.isRequired,
  docked: React.PropTypes.bool,
};

export default ErrorList;
