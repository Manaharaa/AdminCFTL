import { useCallback, useState } from 'react';
import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const districts = [
  { id: 1, name: 'Anuradhapura' },
  { id: 2, name: 'Colombo' },
  { id: 3, name: 'Gampaha' },
  { id: 4, name: 'Kalutara' },
  { id: 5, name: 'Mannar' },
  { id: 6, name: 'Jaffna' },
  { id: 7, name: 'Vavuniya' },
  { id: 8, name: 'Mullaitivu' },
  { id: 9, name: 'Kilinochchi' },
  { id: 10, name: 'Batticaloa' },
  { id: 11, name: 'Trincomalee' },
  { id: 12, name: 'Polonnaruwa' },
  { id: 13, name: 'Matale' },
  { id: 14, name: 'Kandy' },
  { id: 15, name: 'Nuwara Eliya' },
  { id: 16, name: 'Kurunegala' },
  { id: 17, name: 'Puttalam' },
  { id: 18, name: 'Ratnapura' },
  { id: 19, name: 'Kegalle' },
  { id: 20, name: 'Badulla' },
  { id: 21, name: 'Monaragala' },
  { id: 22, name: 'Hambantota' },
  { id: 23, name: 'Matara' },
  { id: 24, name: 'Galle' },
];

const banks = [
  { id: 1, name: 'Bank of Ceylon' },
  { id: 2, name: 'Commercial Bank PLC' },
  { id: 3, name: 'Peoples Bank' },
  { id: 4, name: 'Hatton National Bank' },
  { id: 5, name: 'Sampath Bank' },
  { id: 6, name: 'National Savings Bank' },
  { id: 7, name: 'Nations Trust Bank' },
  { id: 8, name: 'Seylan Bank' },
  { id: 9, name: 'DFCC Bank' },
  { id: 10, name: 'Pan Asia Banking Corporation PLC' },
  { id: 11, name: 'Union Bank of Colombo PLC' },
  { id: 12, name: 'Commercial Credit & Finance PLC' },
  // Add more banks as needed
];


const initialValues = {
  firstName: '',
  lastName: '',
  gender: '',
  marital: '',
  address: '',
  district: '',
  email: '',
  phone: '',
  branch: '',
  bank: '',
  account: '',
  branchBank: '',
};
export const AccountProfileDetails = () => {
 
  const [values, setValues] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


  const [selectedDistrict, setSelectedDistrict] = useState('');
  const handleDistrict = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const [selectedBank, setSelectedBank] = useState('');
  const handleBank = (event) => {
    setSelectedBank(event.target.value);
  };

  // const handleChanges = (event) => {
  //   setCity(event.target.value);
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // const handleChange = useCallback(
  //   (event) => {
  //     setValues((prevState) => ({
  //       ...prevState,
  //       [event.target.name]: event.target.value
  //     }));
  //   },
  //   []
  // );

  // const handleSubmit = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //   },
  //   []
  // );

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid =
      values.firstName &&
      values.lastName &&
      values.gender &&
      values.marital &&
      values.address &&
      values.district &&
      values.email &&
      values.phone &&
      values.branch &&
      values.bank &&
      values.account &&
      values.branchBank;

    setIsFormValid(isFormValid);
    if (isFormValid) {
      // Perform any further actions (e.g., submit the form to the server) here
      // For this example, I'm just showing the success alert
      setIsFormSubmitted(true); // This state tracks whether the form was successfully submitted
    }
  };

  return (
    <div>
       
     <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="All the details are required" title="Teacher details" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth name="gender">
                  <FormLabel fullWidth id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    fullWidth
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl fullWidth name="marital">
                  <FormLabel fullWidth id="demo-row-radio-buttons-group-label">
                    Marital Status
                  </FormLabel>
                  <RadioGroup
                    fullWidth
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Single" />
                    <FormControlLabel value="male" control={<Radio />} label="Married" />
                    {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Address"
                  name="address"
                  multiline
                  maxRows={4}
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    fullWidth
                    required
                    name="district"
                    value={selectedDistrict}
                    onChange={handleDistrict}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Select the District
                    </MenuItem>
                    {districts.map((district) => (
                      <MenuItem key={district.id} value={district.name}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select the District</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    fullWidth
                    required
                    name="branch"
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="">Bandaragama</MenuItem>
                    <MenuItem value={10}>Pelawatte</MenuItem>
                    <MenuItem value={20}>Piliyandala</MenuItem>
                    {/* <MenuItem value={30}></MenuItem> */}
                  </Select>
                  <FormHelperText>Select the Branch</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}></Grid>
              <Grid xs={12} md={6}>
                <CardHeader subheader="Enter the Bank Details" title="Bank Details" />
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    fullWidth
                    required
                    name="bank"
                    value={selectedBank}
                    onChange={handleBank}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Select the Bank
                    </MenuItem>
                    {banks.map((bank) => (
                      <MenuItem key={bank.id} value={bank.name}>
                        {bank.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select the Bank</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="account"
                  onChange={handleChange}
                  type="number"
                  value={values.account}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  name="branchBank"
                   onChange={handleChange}
                  required
                  value={values.branchBank}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Add Teacher
          </Button>
        </CardActions>
        {/* {isFormValid && !isFormSubmitted && (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Please fill all the required fields to proceed.
      </Alert>
    )}
    {isFormSubmitted && (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>Teacher added successfully!</strong>
      </Alert>
    )} */}
      </Card>
      
    </form>
    {isFormValid && !isFormSubmitted && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Please fill all the required fields to proceed.
        </Alert>
      )}
      {isFormSubmitted && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>Teacher added successfully!</strong>
        </Alert>
      )}
    </div>
  );
};
