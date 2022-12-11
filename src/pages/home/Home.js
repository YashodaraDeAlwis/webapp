import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widget  from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
//import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
//import ChartViewer from "../../components/graph";
import React, { useEffect, useState } from 'react';
import Graph from "../../components/Graph"
import { Chart } from "chart.js";
//mport ChartSample02 from './components/chartsample02';
import ScatterPlot from "../../components/scatterplot/Scatterplot";



const Home = () => {

  const [accelration_x, set_accelation_x] = useState(15.45678);
  const [accelration_y, set_accelation_y] = useState(15.45678);
  const [accelration_z, set_accelation_z] = useState(15.45678);
  const [gyro_x, set_gyro_x] = useState(15.45678);
  const [gyro_y, set_gyro_y] = useState(15.45678);
  const [gyro_z, set_gyro_z] = useState(15.45678);
  

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

  const [data, updateData] = useState([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const interval = setInterval(() => {
      const val = Math.floor(Math.random() * (100 - 30 + 1)) + 30;
      let array = [...data, accelration_z];
      array.shift();
      updateData(array);
    }, 2000);
    return () => {
      window.clearInterval(interval); // clear the interval in the cleanup function
    };
  }, [data]); // pass the data as a dependency (because you are using it inside the effect)


  return(
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="info-tab"> </div>
          <div className="widgets"> 
             <Widget/>
             
          {/* </div>
          <div className="visuals">
          <ScatterPlot/> 
          <div className="charts"> */}
          
        
           {/* <Featured/> */}
            {/* <ChartViewer data={data} title="Product Trends by Month" /> */}
            {/* <chart/> 
          </div>  
          </div> */}
          {/* <div className="listContainer">
            <div className="listTitle">Latest Update</div>
            <Table/> */}
          </div>
        </div>
      </div>
  )

}

export default Home