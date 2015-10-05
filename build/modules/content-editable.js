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
