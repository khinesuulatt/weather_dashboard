import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import { CircularProgress, Typography } from '@mui/material';
import FetchUserLists from './UserListApi';

export default function UserListsTable() {
    const { users, loading, error } = FetchUserLists();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = React.useState('');

    console.log(users, "usersssssuserlist")

    const Names = [];

    users.forEach(user => {
        const firstname = user?.firstname.split(" ")[0] || '';
        const lastname = user?.lastname.split(" ")[0] || '';
        const fullName = `${firstname} ${lastname}`;
        Names.push(fullName);
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };


    const filteredRows = Names.filter(fullName =>
        fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' , backgroundColor: '#E3F2FD' }}>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <h2>User Lists</h2>
                <TextField
                    id="search-user-bar"
                    label="Search Name"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={clearSearch} aria-label="clear search">
                                    <ClearIcon sx={{color: '#000'}}/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Name</TableCell>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Email</TableCell>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Address</TableCell>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Company</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                    <Typography>Data is unavailable because of connection, please try again...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredRows
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((fullName, index) => (

                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell>{fullName}</TableCell>
                                        <TableCell>{users[index]?.email}</TableCell>
                                        <TableCell>{`${users[index]?.address?.street}, ${users[index]?.address?.city}`}</TableCell>
                                        <TableCell>{users[index]?.company?.name}</TableCell>
                                    </TableRow>

                                ))
                        )}
                    </TableBody>
                    {/* <TableBody>
                        {filteredRows
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((fullName, index) => (

                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    <TableCell>{fullName}</TableCell>
                                    <TableCell>{users[index]?.email}</TableCell>
                                    <TableCell>{`${users[index]?.address?.street}, ${users[index]?.address?.city}`}</TableCell>
                                    <TableCell>{users[index]?.company?.name}</TableCell>
                                </TableRow>

                            ))}
                    </TableBody> */}

                </Table>

            </TableContainer>


            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredRows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
