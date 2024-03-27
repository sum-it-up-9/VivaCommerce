import React, { useState } from "react";
import VaraintButton from "./VaraintButton";


const TabComponent = ({optionDisplayNames, option, handleVariantClick }) => {
  const [currIndex, setCurrIndex] = useState(-1);
  let index=0;
  return (
    <div>
      {option?.node?.values?.edges.map((label) => {
       optionDisplayNames.add(option?.node?.displayName);
        index++;
        // console.log(index,'tab');
        return (
          
          <VaraintButton key={index} index={index} currIndex={currIndex} setCurrIndex={setCurrIndex}
            handleVariantClick={handleVariantClick}
            handleVariantClickProps={{ option, label }}
          />
        );
      })}
    </div>
  );
};

export default TabComponent;
