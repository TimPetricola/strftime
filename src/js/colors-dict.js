import randomColor from 'randomcolor';

export default {
  colors: {},

  get: function(key) {
    this.colors[key] = this.colors[key] || this.getRandomColor();
    return this.colors[key];
  },

  getRandomColor: function() {
    return randomColor({ luminosity: 'light' });
  }
};
