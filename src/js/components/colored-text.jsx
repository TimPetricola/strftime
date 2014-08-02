var Colors = require('./colors-dict');

module.exports = React.createClass({
  displayName: 'ColoredText',

  propTypes: {
    for: React.PropTypes.string.isRequired
  },

  render: function() {
    var style = {
      backgroundColor: this.getColor()
    };

    return (
      <span style={style}>
        {this.props.children}
      </span>
    );
  },

  getColor: function() {
    return Colors.get(this.props.for);
  }
});
