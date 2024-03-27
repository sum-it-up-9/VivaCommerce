
import { Box, Typography,Button, styled,Grid,Table, TableBody, TableRow, TableCell, } from "@mui/material";
import { useState } from "react";


const VaraintButton = ({handleVariantClick,handleVariantClickProps,index,setCurrIndex,currIndex}) => {
    const {option,label}=handleVariantClickProps;
    // console.log(currIndex,index,'cd')


    function VariantClick(){
        setCurrIndex(index);
        handleVariantClick(option?.node?.displayName,label?.node?.label)
    }
  

  return (
    <>
      <Button style={{margin:'4px 15px 10px 0px'}}  variant={index===currIndex ? 'contained' : 'outlined'} onClick={VariantClick} value={label?.node?.label} key={label?.node?.entityId}>{label?.node?.label}</Button>
    </>
  )
}

export default VaraintButton
