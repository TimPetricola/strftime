/** @jsx React.DOM */
var Colors = require('./colors-dict');

module.exports = React.createClass({
  displayName: 'ColoredText',

  propTypes: {
    for: React.PropTypes.oneOf(['string', 'number']).isRequired
  },

  render: function() {
    var style = {
      backgroundColor: this.getColor()
    };

    return (
      React.DOM.span( {style:style}, 
        this.props.children
      )
    );
  },

  getColor: function() {
    return Colors.get(this.props.for);
  }
});
