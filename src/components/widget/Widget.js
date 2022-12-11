import "./widget.scss" 
import React, { useEffect, useState } from 'react';
import TimelineIcon from '@mui/icons-material/Timeline';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { red } from "@mui/material/colors";
import { style } from "@mui/system";
//import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from "react-circular-progressbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ApexCharts from "apexcharts";
import Graph from "../../components/Graph"
import ChartSample02 from '../../components/chartsample02';


const Widget =() =>{

  const [accelration_x, set_accelation_x] = useState(15.45678);
  const [accelration_y, set_accelation_y] = useState(15.45678);
  const [accelration_z, set_accelation_z] = useState(15.45678);
  const [gyro_x, set_gyro_x] = useState(15.45678);
  const [gyro_y, set_gyro_y] = useState(15.45678);
  const [gyro_z, set_gyro_z] = useState(15.45678);

  var count1 = 0;
  var lasttime = 9 ;

  var server_count = 0 ;
  var previouse_server_count = 0;
  var x_acc_val = 0;
  
  const[data_1, set_data_1] = useState(data)
  const[counter, set_counter] = useState(0)
    
  function getNewSeries(starttime, x_val) {
      var newtime = starttime + 1;
      lasttime = newtime
      console.log("new updated is - ", newtime);
    

      for(var i = 0; i< data.length - 10; i++) {
          console.log("data.length - ", data.length)
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        data[i].x = newtime - 1 - 10 ; //- XAXISRANGE - TICKINTERVAL
      //   data[i].y = 0
        
      }
      
      
     
      data.push({
        x: newtime,
        y: x_val
      });
        
        
        
    } ;
  

  function getCurrentData()
 {
  
    let headers = new Headers();

    console.log("here to update current dtata")
    
    fetch('http://ec2-44-202-34-123.compute-1.amazonaws.com:3000/dataset/current_values')
    .then(res =>{
      if(!res.ok){
        throw Error('clound not fetch the data from the server')
      }
      return res.json();
    })
    .then(data =>{
        
        console.log(data)
        
        set_accelation_x( (0 | (parseFloat(data.acceleration_x) *10000)) /10000);
        set_accelation_y( (0 | (parseFloat(data.acceleration_y) *10000)) /10000);
        set_accelation_z( (0 | (parseFloat(data.acceleration_z) *10000)) /10000);
        set_gyro_x( (0 | (parseFloat(data.gyro_x) *10000)) /10000);
        set_gyro_y( (0 | (parseFloat(data.gyro_y) *10000)) /10000);
        set_gyro_z( (0 | (parseFloat(data.gyro_z) *10000)) /10000);

       
    })
    .catch(err => {
      console.log(err);
  
    })
   
   
 }
 function resetData(){
  // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
  data = data.slice(data.length - 100, data.length);
}

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will be called every 5 seconds');
      getCurrentData();
      
      const interval = setInterval(() => {
       
        // console.log("Time out happens !")
        
        
        fetch('http://ec2-44-202-34-123.compute-1.amazonaws.com:3000/dataset/current_values')
        .then(res =>{
        if(!res.ok){
            throw Error('clound not fetch the data from the server')
        }
        return res.json();
        })
        .then(data =>{
            
            
               x_acc_val = ((0 | (parseFloat(data.acceleration_x) *10000)) /10000)
               server_count = data.count
               console.log("x val is - ", x_acc_val)
        
        })
        .catch(err => {
        console.log(err);
    
        })

        console.log('count from server - ', server_count)
        if (server_count != previouse_server_count)
       
            count1 = count1 +1 ;
            set_counter(count1);

            // console.log("x val is - ", x_acc_val)
            getNewSeries(lasttime, x_acc_val);
            set_data_1(data)
                    previouse_server_count = server_count;
    }}, 5000);
  
    return () => clearInterval(interval);
  }, []);
    

  return(
      <div className="widget">
      <div className="info-tab">
        <div className="info-box">
          <div className="topic-info">Real Time Data </div>
            
          <div className="info-values">
               <div className="val">Acceleration X : {accelration_x}</div>
               <div className="val">Acceleration Y : {accelration_y}</div>
               <div className="val">Acceleration Z : {accelration_z}</div>
               <div className="val">Gyroscope    X : {gyro_x}</div>
               <div className="val">Gyroscope    Y : {gyro_y}</div>
               <div className="val">Gyroscope    Z : {gyro_z}</div>
          <div className="icon"> <TimelineIcon 
           style={{
            color: "#FFFFE0",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
           }}
           /> </div>      
              
          </div>

</div>
        <div className="info-box">
        <div className="topic-info">Accuracy of the Trained Model </div>
        <div className="bottom">
               <div className="featuredChart">
                   <CircularProgressbar value={95} text={"95%"} strokeWidth={10} />
               </div>
               <p className="title">KNN Model</p>
        <div className="icon"> <AlignHorizontalLeftIcon 

         style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
         }}
         /> 
         </div> 
        </div>
        </div>
           {/* <div className="info-percentage"> */}
               {/* <div className="val">95%  {}</div> */}
           {/* </div> */}
        <div className="info-box">
        <div className="topic-info">Real Time Prediction Accuracy</div>
        <div className="bottom">
               <div className="featuredChart">
                   <CircularProgressbar value={70} text={"70%"} strokeWidth={10} />
               </div>
               <p className="title">Real time prediction</p>
        <div className="icon"> <AlignHorizontalLeftIcon 

         style={{
          color: "crimson",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
         }}
         /> 
         </div> 
        </div>
           {/* <div className="info-percentage"> */}
               {/* <div className="val">90%  {}</div> */}
           {/* </div>    */}
       
        </div>
        <div className="info-box">
        <div className="topic-info">Accuracy Deviation</div>
        
           <div className="info-percentage">
               <div className="val">100%  {}</div>
           </div>   
        <div className="icon"> <AlignHorizontalLeftIcon 
         style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        /> </div> 
        </div>
        
      </div>

      <div className="prediction-info">
      <div className="status">
         <div className="topic-info">Condition of the Machine</div>
         <div className="condition">Healthy</div>

         <div className="icon"> <SettingsSuggestIcon
          style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
            alignContent:"right",
          }}
          
      /> </div>
        </div>
         <div className="chart-info">
          <div className="topic-info">Graph comes here</div>
           {/* <Graph/>  */}
           <ChartSample02 
                   
                   // series={this.state.series}
                   data={data_1}
                   counter={counter}
                   width="500"/>


      </div> 
      </div>

      <div className="scatter">
        scatter plot
      </div>


      </div>
    )

}
export default Widget

var data = [
  {
      "x": 1,
      "y": 0
  },
  {
      "x": 2,
      "y": 0.1
  },
  {
      "x": 3,
      "y": 0.2
  },
  {
      "x": 4,
      "y": 0.3
  },
  {
      "x": 5,
      "y": 0.4
  },
  {
      "x": 6,
      "y": 0.5
  },
  {
      "x": 7,
      "y": 0.6
  },
  {
      "x": 8,
      "y": 0.7
  },
  {
      "x": 9,
      "y": 0.8
  },
  {
      "x": 10,
      "y": 0.9
  }
]



