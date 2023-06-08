var isOpen = s => s.includes('-open')
var isDot = s => s.includes('-dot')
var isOpenDot = s => isOpen(s) && isDot(s)
var isBase = s => !isOpen(s) && !isDot(s)

var symbolList = Plotly.PlotSchema.get()
  .traces
  .scatter
  .attributes
  .marker
  .symbol
  .values
  .filter(s => typeof s === 'string')

var symbols = symbolList.filter(isBase)
var rowLen = 5
var colLen = 9

Plotly.newPlot('graph', [
  makeTrace('', 0),
  makeTrace('-open', rowLen),
  makeTrace('-dot', 2 * rowLen),
  makeTrace('-open-dot', 3 * rowLen)
], {
  margin: {l: 0, r: 0, b: 0, t: 0},
  width: 800,
  height: 500,
  xaxis: {
    showgrid: false,
    zeroline: false
  },
  yaxis: {
    showgrid: false,
    zeroline: false,
    autorange: 'reversed'
  },
  showlegend: false,
  hovermode: 'closest',
  plot_bgcolor: '#d3d3d3'
})

function makeTrace(opt, xOffset) {
  var numOffset = {
   '': 0, 
   '-open': 100, 
   '-dot': 200,
   '-open-dot': 300
  }[opt]
  var num = k => k + numOffset
  var trace = {
    mode: 'markers',
    x: [],
    y: [],
    marker: {
      symbol: [],
      color: 'blue',
      size: 20,
      line: {
        color: 'orange',
        width: 1.5
      }
    },
    text: [],
    hoverinfo: 'text'
  }

  var k = 0
  for (var i = 0; i < rowLen; i++) {
    for (var j = 0; j < colLen; j++) {
      var s = symbols[k] + opt
      
      trace.x.push(i + xOffset)
      trace.y.push(j)
      trace.marker.symbol.push(s)
      trace.text.push(`marker symbol: ${s}<br>number: ${num(k)}`)
      k++
    }
  }
  
  return trace
}