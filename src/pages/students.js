//old one

import { useCallback, useMemo, useState , useEffect} from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpOnSquareIcon from '@mui/icons-material/ArrowUpward';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StudentsTable } from 'src/sections/students/students-table';
import { CustomersSearch } from 'src/sections/register/reg-search';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const useCustomers = (page, rowsPerPage, apiData) => {
  return useMemo(() => {
    const formattedData = apiData.map((item) => ({
      id: `ALM/2023/${item.Std_ID}`,
      address: item.Address,
      avatar: '/assets/avatars/avatar-carson-darrin.png', // Use a default avatar or fetch from the API response if available
      createdAt: new Date(item.DOB).getTime(), // Assuming DOB is in the format "yyyy-MM-dd"
      name: item.Full_Name,
      nameI: item.Name_in,
      dob: item.DOB,
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
  const [apiData, setApiData] = useState([]); // Store the data fetched from the API
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [selectedCell, setSelectedCell] = useState(null); // Track selected cell for editing

   // Fetch data from API when the component mounts
   useEffect(() => {
    fetch('http://127.0.0.1:8000/api/admin/viewStudents')
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

  const handleEditCell = useCallback((id) => {
    setSelectedCell(id);
  }, []);

  const handleSaveCell = useCallback((id, fieldName, value) => {
    // Update the data with the new value
    const updatedData = apiData.map((customer) => {
      if (customer.id === id) {
        return {
          ...customer,
          [fieldName]: value,
        };
      }
      return customer;
    });
    // Update the data array with the updated data
    setData(updatedData);
    // Reset selected cell
    setSelectedCell(null);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setSelectedCell(null); // Reset selected cell
  }, []);

  return (
    <>
      <Head>
        <title>Students</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Students</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={<ArrowUpOnSquareIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<ArrowDownOnSquareIcon />}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CustomersSearch />
            <StudentsTable
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
              selectedCell={selectedCell} // Pass selected cell to table component
              onEditCell={handleEditCell} // Pass event handler to table component
              onSaveCell={handleSaveCell} // Pass event handler to table component
              onCancelEdit={handleCancelEdit} // Pass event handler to table component
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
