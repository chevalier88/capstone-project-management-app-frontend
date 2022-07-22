/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { UserContext } from './UserContext.jsx';

const steps = ['contracting', 'sourcing', 'in-progress', 'client-review', 'payment-pending', 'completed'];

export default function HorizontalStepper({ stage }) {
  console.log(`current project stage: ${stage}`);
  const { user } = useContext(UserContext);
  const [activeStep, setActiveStep] = useState((steps.indexOf(stage)));
  console.log((steps.indexOf(stage)));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {user.accountType === 'manager'
      && (
      <>
        {activeStep === steps.length ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Previous Stage
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </>
      )}
    </Box>
  );
}
