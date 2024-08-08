import React, { useState } from 'react'
import "./multipleselect.css"
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";// icons for dropdown and dropup

const MultipleSelect = ({labels,title,setSlectedValue}) => { // access values from parent
  const [showSelectCard , setShowSelectCard] = useState(false)  // state for display and not to display the dropdown card
  const LabelCardClass = showSelectCard ? "block" : "hidden"// dropdown card class for hide and display
   // Icons to display and hide
  const dropDownIconClass = showSelectCard ? "hidden" : "block"
  const dropUpIconClass = showSelectCard ? "block" : "hidden"


  const handleLabelSelection = (label) =>{ // to set value to parent function
    setSlectedValue((previousLable) => {
        if(previousLable.includes(label)){
          return previousLable.filter( e => e!== label )
        }else{
          return [...previousLable , label]
        }
      })
      setShowSelectCard(!showSelectCard)
  }


  return (
    <div className='w-full h-5 '> {/* Outer div */}
      <div className=' w-full h-full '>
         {/* button for selection*/}
         <button 
         className='text-xxs duration-100 h-full text-xs font-thin pb-0.5 pt-0.5 min-w-full  flex justify-center items-center outline-none overflow-hidden'
         onClick={() => setShowSelectCard(!showSelectCard)}>{title}
                 <span className={`${dropDownIconClass} mt-1`}><IoMdArrowDropdown /></span> {/* Icons */}
                 <span className={`${dropUpIconClass} mt-1`}><IoMdArrowDropup /></span>
         </button>
          {/* Drop Down Card */}
         <div className={`${LabelCardClass} select-card max-h-32 rounded w-full shadow-lg  border mt-0.5 overflow-y-auto overflow-x-hidden relative z-20`}>
          {labels.map(each =>   // traverse through each label provided by the parent
            <span key={each}
            className=' flex p-0.5 hover:bg-gray-200 hover:cursor-pointer'
            >
                <input type="checkbox" id={each}   // checkbox to select
                className='w-2.5'
                onChange={() => handleLabelSelection(each) }  // call the function which pass the selected values to the parent
                
                ></input>
                <label htmlFor={each}  // label for each checkboxes
                className='text-xs text-black'
                >{each}</label>
            </span>
          )}
         </div>
      </div> 
    </div>
  )
}

export default MultipleSelect
