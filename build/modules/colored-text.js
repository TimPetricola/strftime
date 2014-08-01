/** @jsx React.DOM */
var Colors = require('./colors-dict');

module.exports = React.createClass({displayName: 'exports',
  getColor: function() {
    return Colors.get(this.props.for);
  },

  render: function() {
    return (
      React.DOM.span( {style:{backgroundColor: this.getColor()}}, 
        this.props.children
      )
    );
  }
});
