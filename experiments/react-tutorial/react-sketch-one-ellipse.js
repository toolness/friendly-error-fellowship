var Sketch = React.createClass({
  render: function() {
    return React.createElement('svg', {
      width: 640,
      height: 480
    }, React.createElement('circle', {
      cx: 50,
      cy: 50,
      r: 40,
      stroke: 'black',
      fill: 'white'
    }));
  }
});

ReactDOM.render(
  React.createElement(Sketch),
  document.getElementById('sketch')
);
