import React from 'react';
import './App.css';

function BarGroup(props) {
  let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = d => d * 10

  let width = widthScale(props.d.value)
  let yMid = props.barHeight * 0.5
  
  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
  </g>
}

class App extends React.Component {
  state = {
    clicked: false,
    data: [],
  }

  clickHandler() {
    fetch('/time').then(res => res.json()).then(data => {
      this.setState({"data": data.data});
    });
    this.setState({'clicked': true});
  }

  render() {
    
    let barHeight = 30
        
    let barGroups = this.state.data.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                    <BarGroup d={d} barHeight={barHeight} />
                                                  </g>)                         
    
     
    if(this.state.clicked) {  
        return (
          <svg width="800" height="300" >

            <g className="container">
              <text className="title" x="10" y="30">Features</text>
              <g className="chart" transform="translate(100,60)">
                {barGroups}
              </g>
            </g>

          </svg>
        );
      }
    else {
        return (
          <form ref={"form"} onSubmit={()=>this.clickHandler()}>
            <button type="submit">Show me the features</button>
          </form>
          );
      }
  }
}


export default App;