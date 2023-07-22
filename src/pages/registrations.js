import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { RegisteredTable } from 'src/sections/customer/registrations-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import dayjs from 'dayjs';

const now = new Date();

const useCustomers = (page, rowsPerPage, apiData) => {
  return useMemo(() => {
    const formattedData = apiData.map((item) => ({
      originalId :item.Std_reg_ID,
      id: `ALM/2023/${item.Std_reg_ID}`,
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

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [apiData, setApiData] = useState([]); // Store the API response data here
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleImportClick = () => {
    console.log(customersSelection.selected);
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
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
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
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Decline
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
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
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
