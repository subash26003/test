import React, { useEffect, useState } from 'react'
import "./filter.css"
import {  useLocation } from 'react-router-dom' 
import { useDataContext } from "../../DataContextProvider/DataContextProvider"
import SingleSelect from '../SingleSelect/SingleSelect' 
import MultipleSelect from "../MutipleSelect/MultipleSelect"
import BarChart from '../BarChart/BarChart'
import FullScreenIcon from "../../assests/Logo/FullScreenIcon.png"
import CancelIcon from "../../assests/Logo/cancel-icon.png"
import PieChart from '../PieChart/PieChart'
import LineChart from '../LineChart/LineChart'

const Filter = ({chartSelection}) => {
  const {DataLabels,isLoading,setXlabels,setYlabels,setLimit} = useDataContext() 
   
  const Location = useLocation()

  const [labels,setLabels] = useState([])   // Store the Chart selected by the user
  const [xLabels , setXLabels] = useState([])       // To store the Xlabel when selected 
  const [yLabels,setYLabels] = useState([])         // To store the Ylabel when selected
  const [showXlableCard,setShowXlabelCard] = useState(false)  // To provide condition to display and not to display the Xlabel selection component based on the Chart pages
  const [showYlableCard,setShowYlabelCard] = useState(false)  // To provide condition to display and not to display the Ylabel selection component based on the Chart pages
  
  const [isFullScreen,setIsFullScreen] = useState(false)
  const [minLimit,setMinLimit] = useState(0)
  const [maxLimit,setMaxLimit] = useState(20)

  const [applyButton,setApplyButton] = useState(false)

  const [limitBtn,setLimitBtn] = useState(false)

  const LimitCardClass = limitBtn ? "flex" : "hidden"


  useEffect(() =>{
    setLabels(DataLabels)   // set the DataLabels provided by the DataContext Provider
    if(chartSelection === "Bar chart" || Location.pathname ==="/analyse/barchart"){    // To prevent from reload 
        // navigate to barchart page along withe label data
      setShowXlabelCard(true)   // To show the Xlabel and Ylabel selection in Barchart
      setShowYlabelCard(true)
    }else if(chartSelection === "Pie chart" || Location.pathname ==="/analyse/piechart"){
      // navigate to Pie Chart page along withe label data
      setShowXlabelCard(true)   // To show the Xlabel and not to Ylabel selection in Pie Chart
      setShowYlabelCard(false)
    }else if(chartSelection === "Line chart" || Location.pathname ==="/analyse/linechart" ){  
         // navigate to Line Chart page along withe label data
      setShowXlabelCard(true)      // To show the Xlabel and Ylabel selection in Barchart
      setShowYlabelCard(true)
    }
    setXlabels(xLabels)
    setYlabels(yLabels)
    setLimit([minLimit,maxLimit+1])
     // eslint-disable-next-line 
  },[isLoading,chartSelection,applyButton,Location.pathname])  // run the useEffect when the given variable changed


  return (
    <div className='editor-container w-full h-full font-light border border-x-gray-100 md:border-y-gray-100 '>
      <p className='hidden md:block filter-title  border-b border-gray-600 '>Customize</p>
      <div className='w-full m-auto  flex md:mt-3 md:flex-col items-center gap-1 md:justify-stretch  mt-0.5 '>
          {showXlableCard && 
            <div className='customize-cards hover:border-blue-500 h-5 md:w-11/12 w-16 grid grid-cols-2 border-b pb-7'>
              <p className='customize-cards-title text-xxs col-start-1 col-end-1 mt-1'>X-label</p>
              <div className='customize-cards-input label-select col-start-2 col-end-2 rounded border border-gray-300 hover:border hover:border-blue-500 hover:shadow-lg'>
              <SingleSelect labels={labels} title={"choose"} setSlectedValue={setXLabels}/>
              </div>
            </div>}
          {showYlableCard && 
            <div className='customize-cards hover:border-blue-500 h-5 md:w-11/12 w-16 grid grid-cols-2 border-b pb-7'>
              <p className='customize-cards-title text-xxs  col-start-1 col-end-1 mt-1'>Y-label</p>
              <div className='customize-cards-input label-select col-start-2 col-end-2 rounded border border-gray-300 hover:border hover:border-blue-500 hover:shadow-lg'>
              <MultipleSelect labels={labels} title={"choose"} setSlectedValue={setYLabels}/>
              </div>
            </div>}
            <div className='customize-cards hover:border-blue-500 h-8 md:w-11/12 w-16 grid grid-cols-2 border-b pb-7'>
              <p className='customize-cards-title text-xxs  col-start-1 col-end-1 mt-1'>Minimum</p>
              <div className='label-select col-start-2 col-end-2 h-5/6'>
                <input 
                  type="number" className='customize-cards-input limit-input-element  w-full h-full pl-1 rounded border border-gray-300 shadow hover:border hover:border-blue-500 hover:shadow-lg  outline-none '
                  placeholder='minimum'
                  onChange={(e) => setMinLimit(parseInt(e.target.value))}
                ></input>
              </div>
            </div>
            <div className='customize-cards hover:border-blue-500 h-8 md:w-11/12 w-16 grid grid-cols-2 border-b pb-7'>
              <p className='customize-cards-title text-xxs  col-start-1 col-end-1 mt-1'>Maximum</p>
              <div className='label-select col-start-2 col-end-2 h-5/6'>
                <input 
                  type="number" className='customize-cards-input limit-input-element  w-full h-full pl-1 rounded border border-gray-300 shadow hover:border hover:border-blue-500 hover:shadow-lg  outline-none '
                  placeholder='minimum'
                  onChange={(e) => setMaxLimit(parseInt(e.target.value))}
                ></input>
              </div>
            </div>
            <div className='customize-cards hover:border-blue-500 h-8 md:w-11/12 w-16 grid grid-cols-2 border-b pb-7'>
              <p className='customize-cards-title text-xxs  col-start-1 col-end-1 mt-1'>Full-View</p>
              <div className='label-select col-start-2 col-end-2 h-5/6 flex justify-end items-center pt-2 pr-3'>
                <button className='flex justify-center items-center gap-2 hover:cursor-pointer'
                  onClick={() => setIsFullScreen(true)}><img src={FullScreenIcon} alt="fullscreen" className='full-screen-icon '/></button>
              </div>
            </div>
        <div className=' w-16 h-5 rounded shadow font-semibold md:hidden flex justify-center items-center hover:border-blue-500 hover:border text-white hover:bg-white hover:text-black bg-black'>
          <button className='text-xxs outline-none'
            onClick={() => setLimitBtn(!limitBtn)}
          >Set limit</button>
          <div className={`${LimitCardClass} setLimit-dropdown shadow-md absolute w-28 top-24 flex gap-1 justify-around items-center h-10 rounded-md`}>
            <input type="number" className='limit-input-element  pl-1 w-5/12 h-4 shadow-md  hover:border hover:border-blue-500   outline-none rounded-sm border-gray-500'
            placeholder='minimum'
            onChange={(e) => setMinLimit(parseInt(e.target.value))}
            ></input>
            <input type="number" className='limit-input-element pl-1 w-5/12 h-4 border hover:border-blue-500 hover:border  outline-none rounded-sm border-gray-500'
            placeholder='maximum'
            onChange={(e) => setMaxLimit(parseInt(e.target.value))}
            ></input>
        </div>
        </div>
        <div className='w-8  rounded flex  md:hidden '>
          <button className='flex justify-center items-center gap-2 hover:cursor-pointer'
          onClick={() => setIsFullScreen(true)}><img src={FullScreenIcon} alt="fullscreen" className='full-screen-icon '/></button>
        </div>
        <div className=' md:hidden border-gray-500 justify-end flex ml-auto'>
          <button className='w-16 mr-2 shadow font-semibold text-xxs button-element apply-filter-button  hover:border-blue-500 hover:border text-white hover:bg-white hover:text-black bg-slate-300 '
          onClick={() => setApplyButton(!applyButton)}
          >Apply</button>
          </div>
        
      </div>
      
      {isFullScreen && 
        <div className='fixed top-0 left-0 z-50 w-screen h-screen bg-gray-50  flex justify-center items-center'> 
              <p onClick={() => setIsFullScreen(false)} className='pr-5 pt-1 absolute top-0 right-0'>
                <img src={CancelIcon} alt="cancel" className='cancel-icon ml-auto' />
              </p>
            <div className='w-screen h-screen pb-10 flex justify-center items-center mt-5'>
              
              {Location.pathname ==="/analyse/barchart" && <BarChart />}
              {Location.pathname ==="/analyse/piechart" && <PieChart />}
              {Location.pathname ==="/analyse/linechart" && <LineChart />}
              
            </div>
            
        </div>
      }
      
      <div className='mt-5 justify-end pr-2 hidden md:flex'>
        <button className='w-16 mt-1 mb-1 text-xxs font-semibold button-element apply-filter-button hover:border-blue-500 hover:border text-white hover:bg-white hover:text-black bg-gray-400 '
        onClick={() => setApplyButton(!applyButton)}
        >Apply</button>
      </div>

    </div>
  )
}

export default Filter



/*  

  <div className='bg-white border shadow  w-full flex justify-center items-center'>
          <button 
            className='text-xs h-7 w-full font-semibold transition-all duration-500 hover:tracking-wider'
            onClick={() => setLabelSelectionBtn(!labelSelectionBtn)}
          >Label Selection</button>
        </div>
        <div className={`${LabelOuterClass} overflow-hidden bg-gray-200 w-full h-0`}>
          <div className={`${LabelsClass} labels-card mt-1 pt-1 gap-3 bg-gray-200 w-full flex flex-col items-center  justify-center`}>
          {showXlableCard && 
            <div className='text-black h-5 md:w-11/12 w-16 bg-gray-300  shadow'>
              <SingleSelect labels={labels} title={"X-label"} setSlectedValue={setXLabels}/>
            </div>}
            {showYlableCard && 
            <div className=' text-black h-5 md:w-11/12 w-16 shadow bg-gray-300'>
              <MultipleSelect labels={labels} title={"Y-Label"} setSlectedValue={setYLabels}/>
            </div>
          }
          </div>
        </div>

*/