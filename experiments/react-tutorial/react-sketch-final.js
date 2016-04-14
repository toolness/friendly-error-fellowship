var Sketch = React.createClass({
  getInitialState: function() {
    return {
      circles: [],
      fill: 'white',
      nextId: 1
    };
  },
  handleMouseDown: function(event) {
    this.setState({fill: 'black'});
  },
  handleMouseUp: function(event) {
    this.setState({fill: 'white'});
  },
  handleMouseMove: function(event) {
    var oldCircles = this.state.circles;
    this.setState({
      circles: oldCircles.concat({
        key: this.state.nextId,
        cx: event.clientX,
        cy: event.clientY,
        r: 50,
        stroke: 'black',
        fill: this.state.fill
      }),
      nextId: this.state.nextId + 1
    });
  },
  render: function() {
    var circles = this.state.circles.map(function(circle) {
      return React.createElement('circle', circle);
    });

    return React.createElement('svg', {
      width: 640,
      height: 480,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      onMouseDown: this.handleMouseDown
    }, circles);
  }
});

ReactDOM.render(
  React.createElement(Sketch),
  document.getElementById('sketch')
);
