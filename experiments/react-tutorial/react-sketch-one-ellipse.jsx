var Sketch = React.createClass({
  render: function() {
    return (
      <svg width={640} height={480}>
        <circle cx={50} cy={50} r={40} stroke="black" fill="white"/>
      </svg>
    );
  }
});

ReactDOM.render(
  <Sketch/>,
  document.getElementById('sketch')
);
