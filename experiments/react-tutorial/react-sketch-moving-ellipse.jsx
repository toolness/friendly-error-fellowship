var Sketch = React.createClass({
  getInitialState: function() {
    return {x: 50, y: 50};
  },
  handleMouseMove: function(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  },
  render: function() {
    return (
      <svg width={640} height={480} onMouseMove={this.handleMouseMove}>
        <circle cx={this.state.x} cy={this.state.y} r={40}
                stroke="black" fill="white"/>
      </svg>
    );
  }
});

ReactDOM.render(
  <Sketch/>,
  document.getElementById('sketch')
);
