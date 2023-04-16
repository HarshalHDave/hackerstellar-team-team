/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
/* eslint-disable camelcase */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Chip
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

// import json
// eslint-disable-next-line import/extensions
import nseData from '../data/nseBonds.json';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'qty', label: 'Quantity', alignRight: false },
    { id: 'blob', label: 'Blob', alignRight: false },
    { id: 'isSell', label: 'Sell', alignRight: false },
    { id: 'isOpen', label: 'Open', alignRight: false },
    { id: 'strike_price', label: 'Strike Price', alignRight: false },
    { id: 'isin', label: 'ISIN', alignRight: false },
    { id: 'createdAt', label: 'Created At', alignRight: false },


];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.id.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
const handleMapCLick = (lat, lng) => {
    console.log(lat, lng);
    let loc = lng;
    loc += ',';
    loc += lat;
    let url = 'https://adityapai18.github.io/unl_project/landing_page/';
    url += '?loc=';
    url += window.btoa(loc);
    console.log(url);
    window.open(url, '_blank');
};

export default function TransactionsPage() {




    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('text');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [userList, setUserList] = useState([]);

    const [currId, setcurrId] = useState();
    const handleOpenMenu = (event, id) => {
        setcurrId(id);
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = userList.map((n) => n.text);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, text) => {
        const selectedIndex = selected.indexOf(text);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, text);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
        console.log(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    useEffect(() => {
        const userTransactions = [];
        const getUserTransactions = async () => {
            const apiRes = await fetch('http://192.168.137.173:5000/admin/open_order/list', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZGl0eWEucGFpQGdtYWlsLmNvbSIsImlhdCI6MTY3NjExNTAwOCwiZXhwIjoxNzA3NjcyNjA4fQ._HLJq29WfVOvCTPE88RrZ0I4nD7TbZwJbm4c-_Wd1AM',
                    'Content-Type': 'application/json',
                },
            });
            const result = await apiRes.json();
            console.log(result.data.data);
            result.data.data.forEach((val) => {
                userTransactions.push({
                    id: val.id,
                    qty: val.qty,
                    blob: val.blob,
                    isSell: val.isSell,
                    isCancelled: val.isCancelled,
                    isOpen: val.isOpen,
                    strike_price: val.strike_price,
                    isin: val.isin,
                    createdAt: val.createdAt,
                });
            });
            setUserList(userTransactions);
            // users.push();
        };

        getUserTransactions()

    }, []);

    return (
        <>
            <Helmet>
                <title> My Transactions </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        My Transactions
                    </Typography>

                </Stack>

                <Card>
                    {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={userList.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        // eslint-disable-next-line camelcase
                                        const { id, qty, blob, isSell, isCancelled, isOpen, strike_price, isin, createdAt } = row;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                                                <TableCell><></></TableCell>
                                                <TableCell align='left'>{id}</TableCell>
                                                <TableCell align="left">{qty}</TableCell>
                                                <TableCell align="left">{blob}</TableCell>
                                                <TableCell align="left">{isSell ? <Chip sx={{ color: 'error.main' }} variant="outlined" label="Sell" /> : <Chip sx={{ color: 'success.main' }} variant="outlined" label="Buy" />}</TableCell>
                                                <TableCell align="left">{isOpen ? (isCancelled ? <Chip sx={{ color: 'error.main' }} variant="outlined" label="Order Cancelled" /> : <Chip sx={{ color: `#ed8911` }} variant="outlined" label="Order Pending" />) : (!isCancelled ? <Chip sx={{ color: 'success.main' }} variant="outlined" label="Order Successful" /> : <></>)}</TableCell>
                                                <TableCell align="left">{strike_price}</TableCell>
                                                <TableCell align="left">{isin}</TableCell>
                                                <TableCell align="left">{createdAt}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Try checking for typos or using complete words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={userList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>


        </>
    );
}
