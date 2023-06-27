import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import theme from '../theme/theme';
import { lookForVariable } from '../services/SeleccionesService';
import { GlobalContext } from "../context/GlobalContext";

export const ProgressBar = ({currentStep}) => {
  console.log("---------CURRENT STEP------------",currentStep);
   const {
    setHadSaveBriefCase,
    handleClearWorkFlow,
    handleDoesClientHaveVariable,
    CountClientVariable
  } = useContext(GlobalContext);
  const [arrayPasos, setVariables] = useState([]);
  
  useEffect(() => {
    const checkNumVarible=async( )=>{
      const totalVariables= await CountClientVariable()
      //console.log("VariablesCountProgress:",totalVariables)  
      for (let i = 1; i <= totalVariables; i++) {
        arrayPasos.push(`Paso ${i}`);
      }
      //console.log("APOS")
      //console.log("PASOS:",arrayPasos)
    }
    checkNumVarible();
  }, []);


  

const labels=['']

  return (
    <View style={{ width:'100%', height:'10%',  justifyContent:'center' }}>
      <StepIndicator
        stepCount={arrayPasos.length}
        currentPosition={currentStep}
        labels={arrayPasos}
        customStyles={{
          stepIndicatorSize: 30,
          currentStepIndicatorSize: 40,
          separatorStrokeWidth: 2,
          currentStepStrokeWidth: 3,
          stepStrokeCurrentColor: theme.colors.modernaGreen,
          stepStrokeWidth: 3,
          stepStrokeFinishedColor: theme.colors.modernaGreen,
          stepStrokeUnFinishedColor: '#aaaaaa',
          separatorFinishedColor: theme.colors.modernaGreen,
          separatorUnFinishedColor: '#aaaaaa',
          stepIndicatorFinishedColor: theme.colors.modernaGreen,
          stepIndicatorUnFinishedColor: '#ffffff',
          stepIndicatorCurrentColor: '#ffffff',
          stepIndicatorLabelFontSize: 15,
          currentStepIndicatorLabelFontSize: 15,
          stepIndicatorLabelCurrentColor: theme.colors.modernaGreen,
          stepIndicatorLabelFinishedColor: '#ffffff',
          stepIndicatorLabelUnFinishedColor: '#aaaaaa',
          labelColor: '#999999',
          labelSize: 12,
          currentStepLabelColor: 'black',
        }}
      />
      
    </View>
  );
};
