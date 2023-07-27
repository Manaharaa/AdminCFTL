import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const TeachersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    selectedCell,
    onEditCell,
    onSaveCell,
    onCancelEdit,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  const handleEditCell = (id) => {
    onEditCell?.(id);
  };

  const handleSaveCell = (id, fieldName, value) => {
    onSaveCell?.(id, fieldName, value);
  };

  const handleCancelEdit = () => {
    onCancelEdit?.();
  };

  return (
    <Card>
      <Scrollbar sx={{ flexGrow: 1 }}>
        <TableContainer sx={{ minWidth: 800 }}>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.();
                        } else {
                          onDeselectAll?.();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Marital Status</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Bank</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Branch Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((customer) => {
                  const isSelected = selected.includes(customer.id);
                  const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow hover key={customer.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(customer.id);
                            } else {
                              onDeselectOne?.(customer.id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={customer.avatar}>
                            {getInitials(customer.name)}
                          </Avatar>
                          <Typography variant="subtitle2">{customer.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{customer.fName}</TableCell>
                      <TableCell>{customer.lName}</TableCell>
                      <TableCell>{customer.gender}</TableCell>
                      <TableCell>{customer.marital}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.district}</TableCell>
                      <TableCell>{customer.mobile}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.branchScl}</TableCell>
                      <TableCell>{customer.bank}</TableCell>
                      <TableCell>{customer.accountNo}</TableCell>
                      <TableCell>{customer.branchBank}</TableCell>
                      <TableCell>
                        {selectedCell === customer.id ? (
                          <>
                            <Button onClick={() => handleSaveCell(customer.id)}>Save</Button>
                            <Button onClick={handleCancelEdit}>Cancel</Button>
                          </>
                        ) : (
                          <Button onClick={() => handleEditCell(customer.id)}>Edit</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

TeachersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  selectedCell: PropTypes.string,
  onEditCell: PropTypes.func,
  onSaveCell: PropTypes.func,
  onCancelEdit: PropTypes.func,
};

export default TeachersTable;
