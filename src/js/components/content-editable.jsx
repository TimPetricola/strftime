// http://stackoverflow.com/questions/22677931/react-js-onchange-event-for-contenteditable
module.exports= React.createClass({
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
      <div contentEditable
           onInput={this.emitChange}
           onBlur={this.emitChange}>{this.props.children}</div>
    );
  }
});
