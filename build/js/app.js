(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
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
      React.DOM.span( {style:style}, 
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
/** @jsx React.DOM */
// http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
module.exports= React.createClass({
  displayName: 'ContentEditable',

  render: function(){
    return this.transferPropsTo(
      React.DOM.div( {contentEditable:true,
           onInput:this.emitChange,
           onBlur:this.emitChange}, this.props.children)
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
/** @jsx React.DOM */
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
        React.renderComponent(
          FormattedDate( {format:format} ),
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
      var format = Helpers.queryParameters.format;
      console.log( Helpers.queryParameters.format);
      if(format === undefined) {
        format = "%B %d, %Y - %H:%M:%S";
      }
      return format;
    },

    render: function() {
      React.renderComponent(
        StrftimeBuilder( {value:this.initialFormat(),
                         supportedCodes:this.getSupportedCodes()} ),
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

    queryParameters: (function(a) {
        if (a === "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
  };

  var FormatInput = React.createClass({displayName: 'FormatInput',
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
            ColoredText( {for:part, key:i}, 
              part
            )
          );
        } else {
          return React.DOM.span( {key:i}, part);
        }
      }.bind(this));
    },

    render: function() {
      return (
        React.DOM.div( {className:"date-input"}, 
          React.DOM.code(null, 
            React.DOM.div( {className:"date-input__highlighter"}, this.getColoredContent()),
            ContentEditable( {ref:"editor", className:"date-input__editor", onChange:this.handleChange}, this.state.value)
          )
        )
      );
    }
  });

  var FormattedString = React.createClass({displayName: 'FormattedString',
    render: function() {
      var parts = this.props.content.split(this.props.regex).map(function(part, i) {
        if(part.match(this.props.regex)) {
          return (
            ColoredText( {for:part, key:i}, 
              FormattedDate( {format:part} )
            )
          );
        } else {
          return React.DOM.span( {key:i}, part);
        }
      }.bind(this));

      return React.DOM.span(null, parts);
    }
  });


  var Result = React.createClass({displayName: 'Result',
    render: function() {
      return (
        React.DOM.div( {className:"result"}, 
          FormattedString( {content:this.props.format,
                           regex:this.props.regex,
                           supportedCodes:this.props.supportedCodes} )
        )
      );
    }
  });

  var StrftimeBuilder = React.createClass({displayName: 'StrftimeBuilder',
    getInitialState: function() {
      return {
        format: this.props.value || '',
      };
    },

    handleFormatChange: function(format) {
      this.setState({format: format});
    },

    getRegex: function() {
      this.regex = this.regex || new RegExp('(' + this.props.supportedCodes.join('|') + ')');
      return this.regex;
    },

    render: function() {
      return (
        React.DOM.div(null, 
          FormatInput( {onChange:this.handleFormatChange,
                       initialValue:this.props.value,
                       regex:this.getRegex(),
                       supportedCodes:this.props.supportedCodes} ),
          Result( {format:this.state.format,
                  regex:this.getRegex(),
                  supportedCodes:this.props.supportedCodes} )
        )
      );
    }
  });

  App.init();

})(React);

},{"./colored-text":1,"./content-editable":3,"./formatted-date":5}],5:[function(require,module,exports){
/** @jsx React.DOM */
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
    return this.transferPropsTo(
     React.DOM.span(null, this.getFormattedDate())
    );
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