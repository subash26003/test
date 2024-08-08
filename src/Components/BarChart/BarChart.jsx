import React ,{useEffect , useState}from 'react'
import "./barchart.css"

import { useDataContext } from '../../DataContextProvider/DataContextProvider'  // to get Data from context provider


// Import necessary components and function required for Bar chart from chart.js
import { Chart ,
  CategoryScale,
  Title,Tooltip,Legend,
  BarElement,LinearScale
 } from 'chart.js'

import { Bar } from 'react-chartjs-2'  // import Bar chart 

// register the components to Chart
Chart.register(
  CategoryScale,
  Title,Tooltip,Legend,
  BarElement,LinearScale
)

const BarChart = () => {

  const {responseData ,isLoading,xLabels,yLabels,limit} = useDataContext()   // access Api response data from Context Provider 
  const [chartXlabelValues , setChartXlabelValues] = useState([])  // set the values of X label
  const [selectedYLabel,setSelectedYLabel] = useState([])  // set the selected Y labels

  useEffect(() =>{
    // to Get the X label values with same type of data like only Age or only one Properties with different value
    if(xLabels ){  
      let x =[]             
      responseData.forEach(e => {
        let value = Math.ceil(e[xLabels])
        if(!x.includes(value)){
          x.push(value)
        }
      })
      setChartXlabelValues(x.sort())
    }

    if(!xLabels || xLabels.length ===0){  // set the Default X values
    
      let defaultXvalues = []
      for(let i=0 ; i<responseData.length ;i++){
        defaultXvalues.push(i)
      }
      setChartXlabelValues(defaultXvalues)
    }
    if(yLabels){
      setSelectedYLabel(yLabels)
     }
      // eslint-disable-next-line 
  },[isLoading,selectedYLabel,window.outerWidth,yLabels,xLabels])

  

  // options for Bar chart
  const options={
    responsive:true,
    layout:{
      padding:2
    },
    plugins:{
      legend:{
        position:'top',
        maxWidth:100,
        labels:{
          boxWidth : 20,
          boxHeight:5,
          font: {
            size: 7
        }
        }
      },
      title:{
        display:true,
        text:'sample Data',
        font: {
          size: 10
      }, 
      }
    },
    animation:{
      duration:1500
    }
   
  }
  // data object for bar chart
  const data = {
    labels:chartXlabelValues.slice(limit[0] || 0,limit[1] ||20),   // selected X label values / Default values
    datasets:selectedYLabel.map((label, idx) => ({
      // iterate through Y labels to get the value from response Data
      label: label,  
      data: responseData.map(item => parseFloat(item[label])), // Y-axis values for each attribute
      backgroundColor: `rgba(${75 + idx * 60}, 192, 192, 0.5)`,
      borderColor: `rgba(${75 + idx * 60}, 192, 192, 1)`,
      borderWidth: 0.5,
    }))
  }
 
  const handleResize = ()=>{
    if(window.innerWidth > 800){
      Chart.defaults.font.size=10
    }else if(window.innerWidth < 700 && window.innerWidth > 500){
      Chart.defaults.font.size=7
    }else if(window.innerWidth < 500){
      Chart.defaults.font.size=5
    }
    Chart.defaults.font.lineHeight=0
  }
   
  window.addEventListener('resize', handleResize);
  if(window.innerWidth > 800){
    Chart.defaults.font.size=10
  
  }else if(window.innerWidth < 700 && window.innerWidth > 500){
    Chart.defaults.font.size=7

  }else if(window.innerWidth < 500){
    Chart.defaults.font.size=5

  }

  return (
//  {/* Outer container for Bar chart  */}
      <div className='bar-chart-card shadow  bg-white p-1  w-full flex flex-col items-center justify-center'>
      <Bar options={options} data={data} />
      <p className='text-center text-xs text-gray-500 font-semibold'>{xLabels}</p>
      </div>
   
  )
}

export default BarChart




/* 

<div className='bar-chart flex flex-col border-pink-600  justify-center items-center pb-3  pt-3'>  
   
</div>

*/