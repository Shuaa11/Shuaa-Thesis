import React from "react";
import ReactApexChart from "react-apexcharts"
import {Col, Row} from "antd";

class CandleChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
            series: [{
              data:[]
            }],
            options: {
              chart: {
                type: 'candlestick',
                height: 400,
                  margin:"auto"
              },
              title: {
                text: 'Bitcoin Historical Data'
              },
              xaxis: {
                type: 'datetime'
              },
              yaxis: {
                tooltip: {
                  enabled: true
                }
              },
                theme: {
              mode: 'dark',

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
           fetch('http://localhost:5000/btc_candlestick')
        .then((response) => response.json())
        .then(data => {
            let numbers =[]
            for (var i =0;i<data.length;i++){
                numbers.push([data[i].Date,data[i].Open,data[i].High,data[i].Low,data[i].Close])
            }
            console.log(numbers)
           this.updateState(numbers)
        });
        }


        render() {
          return (

          <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={550}
          />





          );
        }
}
export default CandleChart;