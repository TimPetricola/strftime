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
          <FormattedDate format={format} />,
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
        <StrftimeBuilder value={this.initialFormat()}
                         supportedCodes={this.getSupportedCodes()} />,
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

  var FormatInput = React.createClass({
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
            <ColoredText for={part} key={i}>
              {part}
            </ColoredText>
          );
        } else {
          return <span key={i}>{part}</span>;
        }
      }.bind(this));
    },

    render: function() {
      return (
        <div className='date-input'>
          <code>
            <div className='date-input__highlighter'>{this.getColoredContent()}</div>
            <ContentEditable ref='editor' className='date-input__editor' onChange={this.handleChange}>{this.state.value}</ContentEditable>
          </code>
        </div>
      );
    }
  });

  var FormattedString = React.createClass({
    render: function() {
      var parts = this.props.content.split(this.props.regex).map(function(part, i) {
        if(part.match(this.props.regex)) {
          return (
            <ColoredText for={part} key={i}>
              <FormattedDate format={part} />
            </ColoredText>
          );
        } else {
          return <span key={i}>{part}</span>;
        }
      }.bind(this));

      return <span>{parts}</span>;
    }
  });


  var Result = React.createClass({
    render: function() {
      return (
        <div className='result'>
          <FormattedString content={this.props.format}
                           regex={this.props.regex}
                           supportedCodes={this.props.supportedCodes} />
        </div>
      );
    }
  });

  var StrftimeBuilder = React.createClass({
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
        <div>
          <FormatInput onChange={this.handleFormatChange}
                       initialValue={this.props.value}
                       regex={this.getRegex()}
                       supportedCodes={this.props.supportedCodes} />
          <Result format={this.state.format}
                  regex={this.getRegex()}
                  supportedCodes={this.props.supportedCodes} />
        </div>
      );
    }
  });

  App.init();

})(React);
