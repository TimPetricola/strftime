/** @jsx React.DOM */
// http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
module.exports= React.createClass({displayName: 'exports',
  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },

  emitChange: function(){
    var html = this.getDOMNode().innerText;
    if(this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html);
    }
    this.lastHtml = html;
  },

  render: function(){
    return this.transferPropsTo(
      React.DOM.div( {contentEditable:true,
           onInput:this.emitChange,
           onBlur:this.emitChange}, this.props.children)
    );
  }
});
