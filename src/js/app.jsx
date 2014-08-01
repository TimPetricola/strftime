/** @jsx React.DOM */
(function(React) {
  var ContentEditable = require('./content-editable'),
      ColoredText     = require('./colored-text');

  var App = {
    init: function() {
      this.render();
      this.initDateComponents();
    },

    initDateComponents: function() {
      var formatAttribute = 'data-formatted-date';
      var dates = document.querySelectorAll('[' + formatAttribute + ']');
      var date = new Date();

      for(var i = 0; i < dates.length; i++) {
        var el = dates[i];
        var format = el.getAttribute(formatAttribute);
        React.renderComponent(
          <FormattedDate format={format} date={date} />,
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

    render: function() {
      React.renderComponent(
        <AppComponent value='%B %d, %Y - %H:%M:%S'
                      supportedCodes={this.getSupportedCodes()} />,
        document.getElementById('app')
      );
    }
  };

  var FormatInput = React.createClass({
    getInitialState: function() {
      return {
        value: this.props.initialValue || ''
      };
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
        <div className='date-input' style={{position: 'relative'}}>
          <code>
            <div className='date-input__highlighter'>{this.getColoredContent()}</div>
            <ContentEditable className='date-input__editor' onChange={this.handleChange}>{this.state.value}</ContentEditable>
          </code>
        </div>
      );
    }
  });

  var FormattedDate = React.createClass({
    getInitialState: function() {
      return {
        date: new Date()
      };
    },

    componentDidMount: function() {
      setInterval(function () {
        this.setState({date: new Date()});
      }.bind(this), 10);
    },

    getFormattedDate: function() {
      return strftime(this.props.format, this.state.date);
    },

    render: function() {
      return this.transferPropsTo(
       <span>{this.getFormattedDate()}</span>
      );
    }
  });

  var FormattedPart = React.createClass({
    render: function() {
      if(this.props.content.match(this.props.regex)) {
        return (
          <ColoredText for={this.props.content}>
            <FormattedDate format={this.props.content} />
          </ColoredText>
        );
      } else {
        return <span>{this.props.content}</span>;
      }
    }
  });

  var FormattedString = React.createClass({
    render: function() {
      var parts = this.props.content.split(this.props.regex).map(function(part, i) {
        return <FormattedPart content={part}
                              regex={this.props.regex}
                              supportedCodes={this.props.supportedCodes} />;
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

  var AppComponent = React.createClass({
    getInitialState: function() {
      return {
        format: this.props.value || '',
      };
    },

    handleFormatChange: function(format) {
      this.setState({format: format});
    },

    getRegex: function() {
      return new RegExp('(' + this.props.supportedCodes.join('|') + ')');
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
