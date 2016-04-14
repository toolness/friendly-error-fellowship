var Sketch = React.createClass({
  getInitialState: function() {
    return {
      circles: [],
      fill: 'white',
      nextId: 1
    };
  },
  createCircle: function(x, y, newFill) {
    if (!newFill) newFill = this.state.fill;
    this.setState({
      circles: this.state.circles.concat({
        key: this.state.nextId,
        cx: x,
        cy: y,
        r: 50,
        stroke: 'black',
        fill: newFill
      }),
      fill: newFill,
      nextId: this.state.nextId + 1
    });
  },
  handleMouseDown: function(event) {
    this.createCircle(event.clientX, event.clientY, 'black');
  },
  handleMouseUp: function(event) {
    this.createCircle(event.clientX, event.clientY, 'white');
  },
  handleMouseMove: function(event) {
    this.createCircle(event.clientX, event.clientY);
  },
  render: function() {
    return (
      <svg width={640} height={480}
           onMouseMove={this.handleMouseMove}
           onMouseUp={this.handleMouseUp}
           onMouseDown={this.handleMouseDown}>
        {this.state.circles.map(function(circleProps) {
           return <circle {...circleProps}/>
        })}
      </svg>
    );
  }
});

ReactDOM.render(<Sketch/>, document.getElementById('sketch'));
