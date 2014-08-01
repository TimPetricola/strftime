module.exports = React.createClass({
  displayName: 'FormattedDate',

  propTypes: {
    format: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      date: new Date()
    };
  },

  render: function() {
    return this.transferPropsTo(
     <span>{this.getFormattedDate()}</span>
    );
  },

  componentDidMount: function() {
    this.timeInterval = setInterval(function () {
      this.setState({date: new Date()});
    }.bind(this), 10);
  },

  componentWillUnmount: function() {
    clearInterval(this.timeInterval);
  },

  getFormattedDate: function() {
    return strftime(this.props.format, this.state.date);
  }
});
