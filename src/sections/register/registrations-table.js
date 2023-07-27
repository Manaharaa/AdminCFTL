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
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const RegisteredTable = (props) => {
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
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const handleCheckboxChange = (event, registrationId) => {
    if (event.target.checked) {
      onSelectOne?.(registrationId);
    } else {
      onDeselectOne?.(registrationId);
    }
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
                  <TableCell>
                    Signed Up
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((registration) => {
                  const isSelected = selected.includes(registration.id);
                  const createdAt = format(registration.createdAt, 'dd/MM/yyyy');

                  return (
                    <TableRow
                      hover
                      key={registration.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => handleCheckboxChange(event, registration.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          <Avatar src={registration.avatar}>
                            {getInitials(registration.name)}
                          </Avatar>
                          <Typography variant="subtitle2">
                            {registration.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {registration.nameI}
                      </TableCell>
                      <TableCell>
                        {registration.dob}
                      </TableCell>
                      <TableCell>
                        {registration.gender}
                      </TableCell>
                      <TableCell>
                        {registration.nic}
                      </TableCell>
                      <TableCell>
                        {registration.address}
                      </TableCell>
                      <TableCell>
                        {registration.city}
                      </TableCell>
                      <TableCell>
                        {registration.school}
                      </TableCell>
                      <TableCell>
                        {registration.medium}
                      </TableCell>
                      <TableCell>
                        {registration.year}
                      </TableCell>
                      <TableCell>
                        {registration.syllubus}
                      </TableCell>
                      <TableCell>
                        {registration.guardian}
                      </TableCell>
                      <TableCell>
                        {registration.guardianName}
                      </TableCell>
                      <TableCell>
                        {registration.guardianAddress}
                      </TableCell>
                      <TableCell>
                        {registration.guardianCity}
                      </TableCell>
                      <TableCell>
                        {registration.guardianOccupation}
                      </TableCell>
                      <TableCell>
                        {registration.guardianNIC}
                      </TableCell>
                      <TableCell>
                        {registration.contactHome}
                      </TableCell>
                      <TableCell>
                        {registration.contactMobile}
                      </TableCell>
                      <TableCell>
                        {registration.email}
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

RegisteredTable.propTypes = {
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
  selected: PropTypes.array
};
