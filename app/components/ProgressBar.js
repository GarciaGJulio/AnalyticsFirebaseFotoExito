import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import theme from '../theme/theme';
import { lookForVariable } from '../services/SeleccionesService';

export const ProgressBar = ({currentStep}) => {
 
  
  const labels = ['Paso 1', 'Paso 2', 'Paso 3','Paso 4'];

  return (
    <View style={{ width:'100%', height:'10%',  justifyContent:'center' }}>
      <StepIndicator
        stepCount={labels.length}
        currentPosition={currentStep}
        labels={labels}
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
