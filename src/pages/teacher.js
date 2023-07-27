import React, { useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Button, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import ArrowDownOnSquareIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpOnSquareIcon from '@mui/icons-material/ArrowUpward';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/teacher/account-profile';
import { AccountProfileDetails } from 'src/sections/teacher/account-profile-details';
import { TeachersTable } from 'src/sections/teacher/teachers-table';
import { useCallback, useMemo, useState } from 'react';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';

const now = new Date();

const useCustomers = (page, rowsPerPage, apiData) => {
  return useMemo(() => {
    const formattedData = apiData.map((item) => ({
      id: item.Teacher_ID,
      fName: item.F_Name,
      avatar: '/assets/avatars/avatar-carson-darrin.png', // Use a default avatar or fetch from the API response if available
      createdAt: new Date(item.DOB).getTime(), // Assuming DOB is in the format "yyyy-MM-dd"
      lName: item.L_Name,
      gender: item.Gender,
      marital: item.Marital_Status,
      address: item.Address,
      district: item.District,
      mobile: item.Mobile,
      email: item.Email,
      branchScl: item.Branch_Scl,
      bank: item.Bank_Name,
      accountNo: item.Account_No,
      branchBank: item.Branch_Bank,
    }));
    return applyPagination(formattedData, page, rowsPerPage);
  }, [apiData, page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage, apiData);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [showTable, setShowTable] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null); // Track selected cell for editing

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

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleRejectButtonClick = () => {};

  const handleButtonClick = () => {
    setShowTable((prevShowTable) => !prevShowTable); // Toggle the value of showTable
  };

  const handleEditCell = useCallback((id) => {
    setSelectedCell(id);
  }, []);

  const handleSaveCell = useCallback((id, fieldName, value) => {
    // Update the data with the new value
    const updatedData = customers.map((customer) => {
      if (customer.id === id) {
        return {
          ...customer,
          [fieldName]: value,
        };
      }
      return customer;
    });
    // Update the data array with the updated data
    setApiData(updatedData);
    // Reset selected cell
    setSelectedCell(null);
  }, [customers]);

  const handleCancelEdit = useCallback(() => {
    setSelectedCell(null); // Reset selected cell
  }, []);

  return (
    <>
      <Head>
        <title>Teachers</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">New Teacher</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <AccountProfile />
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails />
                </Grid>
              </Grid>
            </div>
            <Stack spacing={1}>
              <Typography variant="h4">Teachers</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button color="inherit" startIcon={<ArrowUpOnSquareIcon />}>
                  Edit
                </Button>
                <Button
                  color="inherit"
                  startIcon={<ArrowDownOnSquareIcon />}
                  onClick={handleRejectButtonClick}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
            <TeachersTable
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
              selectedCell={selectedCell} // Pass selected cell to the table component
              onEditCell={handleEditCell} // Pass event handler to the table component
              onSaveCell={handleSaveCell} // Pass event handler to the table component
              onCancelEdit={handleCancelEdit} // Pass event handler to the table component
            />
          </Stack>
          <br />
          <div>
            <Button variant="contained" onClick={handleButtonClick}>
              Deleted Teachers
            </Button>
            <br />
            {/* {showTable && (
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
            )} */}
          </div>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
