import React from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { FaUserPlus, FaUserAlt, FaLock, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/MultiStepForm.css';

const MultiStepForm = () => {
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleNext = () => {
        if (checked) {
            // Navigate to the next step
            navigate('/next-step-path'); // Change this to the actual path of the next step
        } else {
            alert('Please confirm the details to proceed.');
        }
    };

    return (
        <Box className="form-container">
            {/* Top Bar */}
            <Box className="top-bar">
                <FaUserPlus className="top-bar-icon" />
                <Typography variant="h6" className="top-bar-title">Create Profile</Typography>
            </Box>

            {/* Progress Indicator */}
            <Box className="progress-indicator">
                <div className="progress-circle completed"><FaUserPlus /></div>
                <div className="progress-line" />
                <div className="progress-circle"><FaUserAlt /></div>
                <div className="progress-line" />
                <div className="progress-circle"><FaLock /></div>
                <div className="progress-line" />
                <div className="progress-circle"><FaCheck /></div>
            </Box>

            {/* Form Content */}
            <Box className="form-content">
                <Typography variant="h4" className="form-title">Agree Terms of Use and Continue</Typography>
                <Typography variant="body1" className="form-description">
                    To create a profile, we need to verify your identity and validate your Identity Document.
                </Typography>

                <ul className="form-instructions">
                    <li>Green barcoded ID book or Smartcard ID;</li>
                    <li>A mobile device that you will receive a text message with OTP to confirm your cellphone number.</li>
                </ul>

                <Typography variant="body2" className="form-warning">
                    I confirm that the details are correct. In terms of Section 97 of Electoral Act 73 of 1998, it is a criminal offence to provide false information. It is also an offence to register on behalf of a voter or use their details without their prior consent. This amounts to impersonation in terms of section 88 of the Electoral Act, Act 73 of 1998 and is punishable by a fine or imprisonment for a period not exceeding 5 years.
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
                            color="primary"
                        />
                    }
                    label="I agree to the terms and conditions"
                    className="checkbox-label"
                />

                <Box className="form-footer">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<FaArrowRight />}
                        onClick={handleNext}
                        disabled={!checked}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MultiStepForm;
