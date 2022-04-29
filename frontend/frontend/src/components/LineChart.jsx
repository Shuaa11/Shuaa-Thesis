import React from "react";
import ReactApexChart from "react-apexcharts"
import CandleChart from "./CandleChart";
import {Col, Row} from "antd";

class LineChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {

            series: [{
                name:"Price",
              data: []
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Chart',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                 type: 'datetime'
              },
                yaxis: {
               title: {
                   text : "Price $",
                   style:{
                       color : "#A300D6"
                   }
               }

              },
            theme: {
                    palette: 'palette10' // upto palette10
               }

            },


          };
          this.updateState = this.updateState.bind(this)
        }
        updateState(numbers){
            //
            // // Changing state
          this.setState({

               series: [{
              data: numbers

            }]
          })
        }
        componentDidMount() {
           fetch('http://localhost:5000/'+ this.props.name+'_candlestick')
        .then((response) => response.json())
        .then(data => {
            let numbers =[]
            for (var i =0;i<data.length;i++){
                numbers.push({
                  x:data[i].Date,
                  y:data[i].Close
                })

            }
            console.log(numbers)
           this.updateState(numbers)
        });
        }


        render() {
          return (



  <ReactApexChart options={this.state.options} series={this.state.series} type="line"/>



          );
        }
}
export default LineChart;