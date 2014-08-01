module.exports = React.createClass({
  getInitialState: function() {
    return {
      date: new Date()
    };
  },

  componentDidMount: function() {
    setInterval(function () {
      this.setState({date: new Date()});
    }.bind(this), 10);
  },

  getFormattedDate: function() {
    return strftime(this.props.format, this.state.date);
  },

  render: function() {
    return this.transferPropsTo(
     <span>{this.getFormattedDate()}</span>
    );
  }
});
