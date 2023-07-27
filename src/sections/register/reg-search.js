// import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
// import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

// export const CustomersSearch = () => (
//   <Card sx={{ p: 2 }}>
//     <OutlinedInput
//       defaultValue=""
//       fullWidth
//       placeholder="Search customer"
//       startAdornment={(
//         <InputAdornment position="start">
//           <SvgIcon
//             color="action"
//             fontSize="small"
//           >
//             <MagnifyingGlassIcon />
//           </SvgIcon>
//         </InputAdornment>
//       )}
//       sx={{ maxWidth: 500 }}
//     />
//   </Card>
// );

import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';

export const CustomersSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchValue}
        onChange={handleChange}
        fullWidth
        placeholder="Search"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};
