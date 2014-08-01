var Colors = require('./colors-dict');

module.exports = React.createClass({
  getColor: function() {
    return Colors.get(this.props.for);
  },

  render: function() {
    return (
      <span style={{backgroundColor: this.getColor()}}>
        {this.props.children}
      </span>
    );
  }
});
