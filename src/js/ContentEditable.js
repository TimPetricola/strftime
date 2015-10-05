import React from 'react';

export default React.createClass({
  displayName: 'ContentEditable',

  render: function(){
    return (
      <div {...this.props}
           contentEditable
           onInput={this.emitChange}
           onBlur={this.emitChange}
           dangerouslySetInnerHTML={{__html: this.props.html}}>
      </div>
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
