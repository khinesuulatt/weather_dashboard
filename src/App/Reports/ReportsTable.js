import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, Typography, TextField } from '@mui/material';
import FetchWeatherApi from './WeatherMapApi';

export default function UserListsTable() {
    const { weather, loading, error } = FetchWeatherApi();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const city = weather?.city;
    const cityname = city?.name;

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const filteredWeatherData = weather.list?.filter(item => {
        const itemDate = item.dt_txt.split(' ')[0]; 
        return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
    }) || [];

    const paginatedWeatherData = filteredWeatherData.slice(startIndex, endIndex);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#e3f2fd' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <h2>Weather Reports of {cityname}</h2>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(e.target.value);
                            setPage(0); 
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                            setEndDate(e.target.value);
                            setPage(0); 
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            </Box>

            <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead >
                        <TableRow >
                            <TableCell style={{backgroundColor: '#fafafa'}}>Date & Time</TableCell>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Weather</TableCell>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Temperature</TableCell>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Weather Description</TableCell>
                            <TableCell style={{backgroundColor: '#fafafa'}}>Wind Speed</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                                    <Typography>Data is unavailable due to connection issues, please try again...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedWeatherData.map((item) => (
                                <TableRow key={item.dt}>
                                    <TableCell>{item.dt_txt}</TableCell>
                                    <TableCell>{item.weather[0].main}</TableCell>
                                    <TableCell>{item.main.temp}</TableCell>
                                    <TableCell>{item.weather[0].description}</TableCell>
                                    <TableCell>{item.wind.speed}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredWeatherData.length} 
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

