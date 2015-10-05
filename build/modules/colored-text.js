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
      React.createElement("span", {style: style}, 
        this.props.children
      )
    );
  },

  getColor: function() {
    return Colors.get(this.props.for);
  }
});
