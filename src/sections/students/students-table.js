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

export const StudentsTable = (props) => {
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

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

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
                  <TableCell>
                    Full Name
                  </TableCell>
                  <TableCell>
                    Name with Initials
                  </TableCell>
                  <TableCell>
                    Date of Birth
                  </TableCell>
                  <TableCell>
                    Gender
                  </TableCell>
                  <TableCell>
                    N.I.C.
                  </TableCell>
                  <TableCell>
                    Address
                  </TableCell>
                  <TableCell>
                    City
                  </TableCell>
                  <TableCell>
                    School Attended
                  </TableCell>
                  <TableCell>
                    Medium
                  </TableCell>
                  <TableCell>
                    Academic Year
                  </TableCell>
                  <TableCell>
                    Syllabus
                  </TableCell>
                  <TableCell>
                    Guardian
                  </TableCell>
                  <TableCell>
                    Guardian Name
                  </TableCell>
                  <TableCell>
                    Guardian Address
                  </TableCell>
                  <TableCell>
                    Guardian City
                  </TableCell>
                  <TableCell>
                    Guardian Occupation
                  </TableCell>
                  <TableCell>
                    Guardian NIC
                  </TableCell>
                  <TableCell>
                    Contact Home
                  </TableCell>
                  <TableCell>
                    Contact Mobile
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((student) => {
                  const isSelected = selected.includes(student.id);
                  const createdAt = format(student.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow hover key={student.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(student.id);
                            } else {
                              onDeselectOne?.(student.id);
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {selectedCell === student.id ? (
                          <TextField
                            value={student.name}
                            onChange={(event) =>
                              handleSaveCell(student.id, 'name', event.target.value)
                            }
                          />
                        ) : (
                          <Stack alignItems="center" direction="row" spacing={2}>
                            <Avatar src={student.avatar}>
                              {getInitials(student.name)}
                            </Avatar>
                            <Typography variant="subtitle2">{student.name}</Typography>
                          </Stack>
                        )}
                      </TableCell>
                     <TableCell>
                        {student.nameI}
                      </TableCell>
                      <TableCell>
                        {student.dob}
                      </TableCell>
                      <TableCell>
                        {student.gender}
                      </TableCell>
                      <TableCell>
                        {student.nic}
                      </TableCell>
                      <TableCell>
                      <div style={{ whiteSpace: 'nowrap' }}>
                        {student.address.city}, {student.address.state}, {student.address.country}
                      </div>
                      </TableCell>
                      <TableCell>
                        {student.city}
                      </TableCell>
                      <TableCell>
                        {student.school}
                      </TableCell>
                      <TableCell>
                        {student.medium}
                      </TableCell>
                      <TableCell>
                        {student.year}
                      </TableCell>
                      <TableCell>
                        {student.syllubus}
                      </TableCell>
                      <TableCell>
                        {student.guardian}
                      </TableCell>
                      <TableCell>
                      {selectedCell === student.id ? (
                          <TextField
                            value={student.guardianName}
                            onChange={(event) =>
                              handleSaveCell(student.id, 'guardianName', event.target.value)
                            }
                          />
                        ) 
                        : (
                          // <Stack alignItems="center" direction="row" spacing={2}>
                          //   <Avatar src={customer.avatar}>
                          //     {getInitials(customer.name)}
                          //   </Avatar>
                           <Typography variant="subtitle2">{student.guardianName}</Typography>
                          // </Stack>
                          
                        )}
                       {student.guardianName}
                      </TableCell>
                      <TableCell>
                      <div style={{ whiteSpace: 'nowrap' }}>
                        {student.guardianAddress.city}, {student.guardianAddress.state}, {student.guardianAddress.country}
                      </div>
                      </TableCell>
                      <TableCell>
                        {student.guardianCity}
                      </TableCell>
                      <TableCell>
                        {student.guardianOccupation}
                      </TableCell>
                      <TableCell>
                        {student.guardianNIC}
                      </TableCell>
                      <TableCell>
                        {student.contactHome}
                      </TableCell>
                      <TableCell>
                        {student.contactMobile}
                      </TableCell>
                      <TableCell>
                        {student.email}
                      </TableCell>
   
                      <TableCell>
                        {selectedCell === student.id ? (
                          <>
                            <Button onClick={handleSaveCell}>Save</Button>
                            <Button onClick={handleCancelEdit}>Cancel</Button>
                          </>
                        ) : (
                          <Button onClick={() => handleEditCell(student.id)}>Edit</Button>
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

StudentsTable.propTypes = {
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
