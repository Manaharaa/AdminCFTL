import { useCallback, useState } from 'react';
import React from 'react';

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


// const states = [
//   {
//     value: 'alabama',
//     label: 'Alabama'
//   },
//   {
//     value: 'new-york',
//     label: 'New York'
//   },
//   {
//     value: 'san-francisco',
//     label: 'San Francisco'
//   },
//   {
//     value: 'los-angeles',
//     label: 'Los Angeles'
//   }
// ];

export const AccountProfileDetails = () => {
  // const [values, setValues] = useState({
  //   firstName: 'Anika',
  //   lastName: 'Visser',
  //   address: '1,Los Angeles',
  //   email: 'demo@devias.io',
  //   phone: '',
  //   state: 'los-angeles',
  //   country: 'USA',
  //   district: '',
  //   gender:'',
  //   marital:'',
  //   branch:'',
  //   bank:'',
  //   account:''
  // });
  const [city, setCity] = React.useState('');

  const handleChanges = (event) => {
    setCity(event.target.value);
  };

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Theinformation can be edited"
          title="You"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={""}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={""}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <FormControl  fullWidth name="gender">
      <FormLabel  fullWidth id="demo-row-radio-buttons-group-label">Gender</FormLabel>
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
              <Grid
                xs={12}
                md={6}
              >
                 <FormControl  fullWidth name="marital">
      <FormLabel  fullWidth id="demo-row-radio-buttons-group-label">Marital Status</FormLabel>
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
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                fullWidth
          id="outlined-multiline-flexible"
          label="Address"
          name="address"
          multiline
          maxRows={4}
          onChange={handleChange}
                  required
                  value={""}
        />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                    <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
        <Select
        fullWidth
        required
          name='district'
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Anuradhapura
          </MenuItem>
          <MenuItem value={10}>Colombo</MenuItem>
          <MenuItem value={20}>Gampaha</MenuItem>
          <MenuItem value={30}>Kalutara</MenuItem>
        </Select>
        <FormHelperText>Select the District</FormHelperText>
      </FormControl>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChanges}
                  required
                  value={""}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={""}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
        <Select
        fullWidth
        required
          name='branch'
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
          Bandaragama
          </MenuItem>
          <MenuItem value={10}>Pelawtte</MenuItem>
          <MenuItem value={20}>Piliyandala</MenuItem>
          {/* <MenuItem value={30}></MenuItem> */}
        </Select>
        <FormHelperText>Select the Branch</FormHelperText>
      </FormControl>
                
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                {/* <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                > 
                   {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField> */}
              </Grid>

<Grid
                xs={12}
                md={6}
              >
                <CardHeader
          subheader="Enter the Bank Details"
          title="Bank Details"
        />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                     <FormControl required fullWidth sx={{ m: 1, minWidth: 120 }}>
        <Select
        fullWidth
        required
          name='bank'
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Bank
          </MenuItem>
          <MenuItem value={10}>Bank Of Ceylon</MenuItem>
          <MenuItem value={20}>Commercial Bank PLC</MenuItem>
          <MenuItem value={30}>Peoples Bank</MenuItem>
        </Select>
        <FormHelperText>Select the Bank</FormHelperText>
      </FormControl>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Account Number"
                  name="account"
                  onChange={handleChange}
                  type="number"
                  value={""}
                />
                
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Branch Name"
                  name="branchBank"
                  onChange={handleChanges}
                  required
                  // value={values.email}
                />
              </Grid>
              
              
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Add Teacher
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
