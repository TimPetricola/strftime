import React, { Component, PropTypes } from 'react';
import strftime from 'strftime';

export default class FormattedDate extends Component {
  static propTypes = {
    format: React.PropTypes.string.isRequired,
    date: React.PropTypes.instanceOf(Date).isRequired
  }

  state = {
    date: this.props.date
  }

  render() {
    return <span {...this.props}>{this.getFormattedDate()}</span>;
  }

  componentDidMount() {
    this.setState({ date: new Date() });
    this.timeInterval = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  getFormattedDate() {
    const formatted = strftime(this.props.format, this.state.date);

    if (formatted === '\n') {
      return <br />
    } else {
      return strftime(this.props.format, this.state.date);
    }
  }
};
