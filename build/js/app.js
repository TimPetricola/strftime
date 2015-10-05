(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./colors-dict":2}],2:[function(require,module,exports){
module.exports = {
  colors: {},

  get: function(key) {
    this.colors[key] = this.colors[key] || this.getRandomColor();
    return this.colors[key];
  },

  getRandomColor: function() {
    return randomColor({luminosity: 'light'});
  }
};

},{}],3:[function(require,module,exports){
// http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
module.exports= React.createClass({
  displayName: 'ContentEditable',

  render: function(){
    return (
      React.createElement("div", React.__spread({},  this.props, 
           {contentEditable: true, 
           onInput: this.emitChange, 
           onBlur: this.emitChange, 
           dangerouslySetInnerHTML: {__html: this.props.html}})
      )
    );
  },

  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  emitChange: function(){
    var html = this.getDOMNode().innerText;
    if(this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  }

});

},{}],4:[function(require,module,exports){
(function(React) {
  var ContentEditable = require('./content-editable'),
      ColoredText     = require('./colored-text'),
      FormattedDate   = require('./formatted-date');

  var App = {
    init: function() {
      this.render();
      this.initDateComponents();
    },

    initDateComponents: function() {
      var formatAttribute = 'data-formatted-date';
      var dates = document.querySelectorAll('[' + formatAttribute + ']');

      for(var i = 0; i < dates.length; i++) {
        var el = dates[i];
        var format = el.getAttribute(formatAttribute);
        React.render(
          React.createElement(FormattedDate, {format: format}),
          el
        );
      }
    },

    getSupportedCodes: function() {
      if(!this.supportedCodes) {
        var codeAttribute = 'data-code';
        var lines = document.querySelectorAll('[' + codeAttribute + ']');

        this.supportedCodes = [];

        for(var i = 0; i < lines.length; i++) {
          var code = lines[i].getAttribute(codeAttribute);
          this.supportedCodes.push(code);
        }
      }

      return this.supportedCodes;
    },

    initialFormat: function() {
      var format = Helpers.getHash();
      if(format === '') {
        format = "%B %d, %Y - %H:%M:%S";
      }
      return format;
    },

    render: function() {
      React.render(
        React.createElement(StrftimeBuilder, {value: this.initialFormat(), 
                         supportedCodes: this.getSupportedCodes()}),
        document.getElementById('app')
      );
    }
  };

  var Helpers = {
    placeCaretAtEnd: function(el) {
      el.focus();
      if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
          var range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (typeof document.body.createTextRange !== "undefined") {
          var textRange = document.body.createTextRange();
          textRange.moveToElementText(el);
          textRange.collapse(false);
          textRange.select();
      }
    },

    getHash: function() {
      var decodedHash = null;
      var hash        = location.hash.substring(1);

      try {
        decodedHash =  decodeURIComponent(hash);
      } catch (e) {
        decodedHash = hash;
      }

      return decodedHash;
    },

    setHash: function(value) {
      location.hash = encodeURI(value);
    }
  };

  var FormatInput = React.createClass({displayName: "FormatInput",
    getInitialState: function() {
      return {
        value: this.props.initialValue || ''
      };
    },

    componentDidMount: function() {
      Helpers.placeCaretAtEnd(this.refs.editor.getDOMNode());
    },

    handleChange: function(value) {
      this.setState({value: value});
      this.props.onChange(value);
    },

    getColoredContent: function() {
      return this.state.value.split(this.props.regex).map(function(part, i) {
        if(part.match(this.props.regex)) {
          return (
            React.createElement(ColoredText, {for: part, key: i}, 
              part
            )
          );
        } else {
          return React.createElement("span", {key: i}, part);
        }
      }.bind(this));
    },

    render: function() {
      return (
        React.createElement("div", {className: "date-input"}, 
          React.createElement("code", null, 
            React.createElement("div", {className: "date-input__highlighter"}, this.getColoredContent()), 
            React.createElement(ContentEditable, {ref: "editor", className: "date-input__editor", onChange: this.handleChange, html: this.state.value})
          )
        )
      );
    }
  });

  var FormattedString = React.createClass({displayName: "FormattedString",
    render: function() {
      var parts = this.props.content.split(this.props.regex).map(function(part, i) {
        if(part.match(this.props.regex)) {
          return (
            React.createElement(ColoredText, {for: part, key: i}, 
              React.createElement(FormattedDate, {format: part})
            )
          );
        } else {
          return React.createElement("span", {key: i}, part);
        }
      }.bind(this));

      return React.createElement("span", null, parts);
    }
  });


  var Result = React.createClass({displayName: "Result",
    render: function() {
      return (
        React.createElement("div", {className: "result"}, 
          React.createElement(FormattedString, {content: this.props.format, 
                           regex: this.props.regex, 
                           supportedCodes: this.props.supportedCodes})
        )
      );
    }
  });

  var StrftimeBuilder = React.createClass({displayName: "StrftimeBuilder",
    getInitialState: function() {
      return {
        format: this.props.value || '',
      };
    },

    handleFormatChange: function(format) {
      this.setState({format: format});
      Helpers.setHash(format);
    },

    getRegex: function() {
      this.regex = this.regex || new RegExp('(' + this.props.supportedCodes.join('|') + ')');
      return this.regex;
    },

    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement(FormatInput, {onChange: this.handleFormatChange, 
                       initialValue: this.props.value, 
                       regex: this.getRegex(), 
                       supportedCodes: this.props.supportedCodes}), 
          React.createElement(Result, {format: this.state.format, 
                  regex: this.getRegex(), 
                  supportedCodes: this.props.supportedCodes})
        )
      );
    }
  });

  App.init();

})(React);

},{"./colored-text":1,"./content-editable":3,"./formatted-date":5}],5:[function(require,module,exports){
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
    return React.createElement("span", React.__spread({},  this.props), this.getFormattedDate());
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

},{}]},{},[4])