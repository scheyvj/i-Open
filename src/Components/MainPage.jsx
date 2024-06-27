// MainPage.jsx
import React, { useState , useEffect} from 'react';
import axios from 'axios';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar'; // Import the Sidebar component
import Box from '@mui/material/Box';
import './MainPage.css'; // Import CSS for styling
import SimpleBarChart from './SimpleBarChart'; // Import the SimpleBarChart component
import TotalPackageCostPage from './TotalPackageCostPage';
import BasicPie from './PieChart';
import StackedBarChartsWithTables from './BarChart';

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontWeight: 'bold',
    },
}));

const MainPage = () => {
    const [selectedOption, setSelectedOption] = useState('Government Account');

    const handleChange = (event) => {
        {setSelectedOption(event.target.value);
            setFormData(prev => ({
                ...prev,
                account_type: event.target.value
            }))
        }
    };

    const [formData, setFormData] = useState({
        account_type: "Government Account",
        drugs_selected: ["Drug 1", "Drug 2", "Drug 3", "Drug 4", "Drug 5"],
        disease_indication: "WET AMD",
        time_horizon: "1",
        government_ac: "Yes",
        patient_support: "Yes",
        naive_switch: "Naive",
        clinical_status: "Per Label",
        drug1_dosage: 3,
        drug2_dosage: 3,
        drug3_dosage: 5,
        drug4_dosage: 8,
        drug5_dosage: 8,
        procedure_cost: 1000,
        oct_cost: 200,
        consulting_charges: 200,
        miscellaneous_cost: 100,
        travel_cost: 100,
        food_cost: 100,
        patient_lost_opportunity_cost: 1000,
        caregiver_lost_opportunity_cost: 1000,
        First_Drug: "Drug 1",
        Second_Drug: "Drug 2",
      });

      const [responseData, setResponseData] = useState(null);
      useEffect(() => {
        const fetchData = async () => {
          console.table("INPUT DATA", formData);
          try {
            const response = await axios.post('http://127.0.0.1:8000/submit', formData);
            setResponseData(response.data);
    
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching data from API', error);
          }
        };
    
        fetchData();
      }, [formData]);

    return (
        <Box display="flex" className="main-page" style={{ height: '100vh' }}>
            {/* Sidebar Section */}
            <Box component="aside" className="sidebar-container">
                <Sidebar formData={formData} setFormData={setFormData} responseData={responseData} setResponseData={setResponseData} />
                
            </Box>
            
            {/* Main Content Section */}
            <Box component="main" className="content-container">
                <RadioGroup value={selectedOption} onChange={handleChange} row>
                    <StyledFormControlLabel
                        value="Government Account"
                        control={<Radio />}
                        label="Government Account"
                    />
                    <StyledFormControlLabel
                        value="Trade Account"
                        control={<Radio />}
                        label="Trade Account"
                    />
                </RadioGroup>
                
                {/* Include the SimpleBarChart component below the RadioGroup */}
                <SimpleBarChart responseData={responseData} setResponseData={setResponseData} />

                {/* <BasicPie responseData={responseData} setResponseData={setResponseData}  /> */}
                {/* <TotalPackageCostPage responseData={responseData} setResponseData={setResponseData}  /> */}
                
                {/* <StackedBarChartsWithTables responseData={responseData} setResponseData={setResponseData}  /> */}
            </Box>
        </Box>
    );
};

export default MainPage;
