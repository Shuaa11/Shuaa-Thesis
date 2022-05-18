import React from "react";
import ReactApexChart from "react-apexcharts"
import * as ApexCharts from "apexcharts";

  function resetData(){
    // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
    data = data.slice(data.length - 10, data.length);
  }
 let lastDate = 0;
  let points =[]
  let action
  let data = []
  let TICKINTERVAL = 86400000
  let XAXISRANGE = 777600000

class LiveLineChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
            logs:[],
            series: [{
                name:"$",
              data: data.slice()
            }],
            options: {

              chart: {
                id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                  enabled: true,
                  easing: 'linear',
                  dynamicAnimation: {
                    speed: 1000
                  }
                },
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Live Trading',
                align: 'left'
              },
                grid: {
                padding: {
                  right: 30,
                  left: 20
                }
              },
              markers: {
                size: 0
              },
              xaxis: {
                  type: 'datetime',
                   range: XAXISRANGE,
              },
             itle: {
                   text : "Price $",
                   style:{
                       color : "#A300D6"
                   }
               },
              legend: {
                show: false
              },
            },


          };
        }

        componentWillReceiveProps(nextProps, nextContext) {

            if (nextProps.logs !== this.state.logs){
                this.setState({logs : nextProps.logs})
                if (this.state.logs.length!=0){

                    data.push({
                  x: this.state.logs[0].today_date,
                  y: Number(this.state.logs[0].price).toFixed(0)
                    })

                    action = this.state.logs[0].result
                    if(points.length==10){
                        points.shift()
                    }
                    points.push({
                  x: new Date(data[data.length-1].x).getTime(),
                  y: data[data.length-1].y,
                  marker: {
                    size: 8,
                    fillColor: '#fff',
                    strokeColor: action==="SELL" ? "red" : action==="BUY"? "green":"#87CEEB" ,
                    radius: 2,
                    cssClass: 'apexcharts-custom-class',
                    strokeWidth:4
                  },
                  label: {
                    offsetY: 0,
                    style: {
                      color: '#fff',
                      background: action==="SELL" ? '#FF4560' : action==="BUY"? "green":"#87CEEB",
                    },

                    text: action ==="BUY" ? "BUY": action==="SELL"? "SELL":"HOLD",
                  }
                })
                }
            }
        }


    componentDidMount() {
          setInterval(() => {
            if (this.state.logs.length==0){
                data=[]
                   ApexCharts.exec('realtime', 'updateSeries', [{
              data: data
            }])


            }else{

                ApexCharts.exec('realtime', 'updateSeries', [{
              data: data
            }])
                ApexCharts.exec('realtime', 'updateOptions', {
                  annotations: {
                      points: points
                  }
                }, false, true);
            }


          }, 5000)
        }


        render() {
          return (


      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>

          );
        }
}
export default LiveLineChart;