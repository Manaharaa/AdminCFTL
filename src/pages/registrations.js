import { useCallback, useMemo, useState, useEffect , useRef} from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { FormControl, FormHelperText,Box, Button, Container, Stack, SvgIcon, Typography, TextField } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { RegisteredTable } from 'src/sections/register/registrations-table';
import { RejectedTable } from 'src/sections/register/reg-rejected-table';
import { CustomersSearch } from 'src/sections/register/reg-search';
import { applyPagination } from 'src/utils/apply-pagination';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import dayjs from 'dayjs';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { af } from 'date-fns/locale';
import emailjs from '@emailjs/browser';
const http = require('http');

const now = new Date();
const { URL } = require('url');

const useCustomers = (page, rowsPerPage, apiData) => {
  return useMemo(() => {
    const formattedData = apiData.map((item) => ({
      originalId: item.Std_reg_ID,
      id: item.Std_reg_ID,
      address: item.Address,
      avatar: '/assets/avatars/avatar-carson-darrin.png', // Use a default avatar or fetch from the API response if available
      createdAt: new Date(item.DOB).getTime(), // Assuming DOB is in the format "yyyy-MM-dd"
      name: item.Full_Name,
      nameI: item.Name_in,
      dob: dayjs(item.DOB).format('YYYY-MM-DD'),
      gender: item.Gender,
      nic: item.NIC,
      city: item.City,
      school: item.Pre_Scl,
      medium: item.Medium,
      year: item.Aca_Year,
      syllubus: item.Syllubus,
      guardian: item.Guardian,
      guardianName: item.G_Name,
      guardianAddress: item.G_Address,
      guardianCity: item.G_City,
      guardianOccupation: item.G_Work,
      guardianNIC: item.G_NIC,
      contactHome: item.Contact_Home,
      contactMobile: item.Contact_Num,
      email: item.Email,
    }));
    return applyPagination(formattedData, page, rowsPerPage);
  }, [apiData, page, rowsPerPage]);
};


const useCustomerEmails = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.email);
  }, [customers]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [apiData, setApiData] = useState([]); // Store the API response data here
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const buttonRef = useRef();

  // Fetch data from API when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin/viewRegStudents')
      .then((response) => response.json())
      .then((apiData) => {
        setApiData(apiData.data); // Update the state with the data fetched from the API
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const customers = useCustomers(page, rowsPerPage, apiData);
  const customersEmails = useCustomerEmails(customers);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const customersSelectionEmail = useSelection(customersEmails);
  const [showTable, setShowTable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedEmail, setSelectedDate] = useState(null);
 

  const handleButtonClick = () => {
    setShowTable((prevShowTable) => !prevShowTable); // Toggle the value of showTable
  };
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSendMail = () => {
    // Check if any customer is selected
    if (customersSelection.selected.length === 0) {
      console.log('No customers selected.');
      console.log('Selected Emails:', customersSelection.selected[0]);
      return;
    }
  
    // Here you can use the selectedDate to generate and send the mail.
    // You can use any method or library for sending mails, like 'nodemailer' for Node.js backend.
    console.log('Selected Emails:', customersSelectionEmail.selected[0]);
    console.log('Selected Emails:', customersSelection.selected[0]);
    // For demonstration purposes, we'll log the selectedDate and the selected emails to the console.
    // console.log('Selected Emails:', customersSelection.selectedEmails);
    // console.log('Selected Date:', selectedDate);
  
    // Call the function to send the emails
    // sendEmailToSelected(customersSelection.selectedEmails);
  };
  


  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleImportClick = () => {
    const selectedIds = customersSelection.selected;
  const selectedEmails = apiData
    .filter((customer) => customersSelection.isSelected(customer.id))
    .map((customer) => customer.email);

  console.log('Selected Emails:', selectedEmails); // Check if the selectedEmails array contains valid email addresses

  // sendEmailToSelected(selectedEmails);
    // Send API request to move selected items
    fetch('http://127.0.0.1:8000/api/admin/studentRealReg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedIds }), // Send selected IDs array in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data); // Handle the API response as required
        // After the successful API response, you can do any additional actions if needed
      })
      .catch((error) => {
        console.error('Error moving data:', error);
      });
  };

  // Define a separate function to handle the "Reject" button click
  const handleRejectButtonClick = () => {
    const selectedIds = customersSelection.selected;
  const selectedEmails = apiData
    .filter((customer) => customersSelection.isSelected(customer.id))
    .map((customer) => customer.email);

  console.log('Selected Emails:', selectedEmails); // Check if the selectedEmails array contains valid email addresses

  // sendEmailToSelected(selectedEmails);
    // Send API request to move selected items
    fetch('http://127.0.0.1:8000/api/admin/updateStudentStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedIds }), // Send selected IDs array in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data); // Handle the API response as required
        // After the successful API response, you can do any additional actions if needed
      })
      .catch((error) => {
        console.error('Error moving data:', error);
      });
  };
  

  const handleSearch = (searchValue) => {
    console.log('Search value:', searchValue);
    // Perform any logic based on the search value
    // For example, filter the customers based on the search value
    const filteredCustomers = apiData.filter((customer) =>
      customer.Full_Name.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log('Filtered customers:', filteredCustomers);
  };

 
  // const sendEmailToSelected = async (selectedEmails) => {
  //   const serviceId = 'service_m9gjpqu';
  //   const templateId = 'template_f7m4der';
  //   const userId = 'GwY9SqjX3s-m8Apt9';
  
  //   try {
  //     const promises = selectedEmails.map(async (customerEmail) => {
  //       const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           service_id: serviceId,
  //           template_id: templateId,
  //           user_id: userId,
  //           template_params: {
  //             sp_email: customerEmail,
  //           },
  //         }),
  //       });
  //       return response.json();
  //     });
  
  //     const responses = await Promise.all(promises);
  //     console.log('Email responses:', responses); // Check the responses from the email sending requests
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  

 
  return (
    <>
      <Head>
        <title>Registrations | CFTL</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Registrations</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    ref={buttonRef} 
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                    onClick={handleImportClick}
                  >
                    Approve
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                    onClick={handleRejectButtonClick}
                  >
                    Reject
                  </Button>
                </Stack>
              </Stack>
            
               <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Send Mail
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <div style={{ padding: '16px' }}>
                <DatePicker
                  label="Select Interview Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(props) => <TextField {...props} />}
                />
              </div>
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <Button variant="contained" onClick={handleSendMail}>
                  Send
                </Button>
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
    </LocalizationProvider>
            </Stack>
            <CustomersSearch onSearch={handleSearch} />
            <RegisteredTable
              count={apiData.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
          <br></br>
          <div>
      <Button variant="contained" onClick={handleButtonClick}>
        Rejected Students
      </Button>
      <br></br>
      {showTable && (
        <RejectedTable
          count={apiData.length}
          items={customers}
          onDeselectAll={customersSelection.handleDeselectAll}
          onDeselectOne={customersSelection.handleDeselectOne}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onSelectAll={customersSelection.handleSelectAll}
          onSelectOne={customersSelection.handleSelectOne}
          page={page}
          rowsPerPage={rowsPerPage}
          selected={customersSelection.selected}
        />
      )}
    </div>
              
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
