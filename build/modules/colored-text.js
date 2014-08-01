/** @jsx React.DOM */
var Colors = require('./colors-dict');

module.exports = React.createClass({
  displayName: 'ColoredText',

  render: function() {
    var style = {backgroundColor: this.getColor()};

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