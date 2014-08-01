var Colors = {
  colors: {},

  get: function(key) {
    this.colors[key] = this.colors[key] || this.getRandomColor();
    return this.colors[key];
  },

  getRandomColor: function() {
    return randomColor({luminosity: 'light'});
  }
};

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
