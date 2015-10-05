import React, { Component, PropTypes } from 'react';
import strftime from 'strftime';

export default class FormattedDate extends Component {
  static propTypes = {
    format: React.PropTypes.string.isRequired
  }

  state = {
    date: new Date()
  }

  render() {
    return <span {...this.props}>{this.getFormattedDate()}</span>;
  }

  componentDidMount() {
    this.timeInterval = setInterval(() => {
      this.setState({ date: new Date() });
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  getFormattedDate() {
    return strftime(this.props.format, this.state.date);
  }
};
