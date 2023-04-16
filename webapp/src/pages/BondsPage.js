import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
} from '@mui/material';
// components
import ReportIcon from '@mui/icons-material/Report';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { getActiveUserList } from '../_mock/user';

// mui icons

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'value', label: 'Value', alignRight: false },
    // {id: },
    // { id: 'text', label: 'Description', alignRight: false },
    { id: 'expiryDate', label: 'Expiry Date', alignRight: false },
    { id: 'importDate', label: 'Import Date', alignRight: false },
    { id: 'actions', label: 'Actions', alignRight: false }

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
        // console.log(array);
        return filter(array, (_user) => _user.id.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function BondPage() {
    useEffect(() => {
        getActiveUserList().then((val) => {
            setUserList(val);
        });
    }, []);
    useEffect(() => {

    }, [])
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    // const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('text');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [userList, setUserList] = useState([]);
    const [currId, setcurrId] = useState();
    const handleOpenMenu = (event, id) => {
        setOpen(event.currentTarget);
        setcurrId(id);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const updateOrDelete = async (type) => {
        if (type === 'resolve') {
            const apiRes = await fetch(`http://localhost:5000/admin/reports/update/${currId}`, {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGhvbmUiOiJpN2NkeTA4MWptIiwiaWF0IjoxNjY4NzYyMTYyLCJleHAiOjE2NjkzNjIxNjJ9.WT2mz04A4vxYErseXzWdihHkz0avT-D8_8DZpJLXN20',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    isActive: false,
                }),
            });
            const response = await apiRes.json();
            if (response.status === 'SUCCESS') {
                getActiveUserList().then((val) => {
                    setUserList(val);
                });
            }
        } else {
            console.log(currId);
        }
    };

    // fetching the api from swagger to populate the table [product list]


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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title> Bonds </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Bonds
                    </Typography>
                    {/* <Button
            onClick={() => window.open('https://adityapai18.github.io/unl_project/report_page/', '_blank')}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Raise an Issue
          </Button> */}
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
                                    // numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, name, value, expiryDate, importDate, } = row;
                                        // const selectedUser = selected.indexOf(text) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" >
                                                <TableCell padding="checkbox">
                                                    {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, text)} /> */}
                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        {/* <Avatar alt={text} src={avatarUrl} /> */}
                                                        <Typography variant="subtitle2" noWrap>
                                                            {id}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{name}</TableCell>
                                                <TableCell align="left">{value}</TableCell>
                                                <TableCell align="left">{expiryDate}</TableCell>
                                                <TableCell align="left">{importDate}</TableCell>

                                                <TableCell align="left">
                                                    <Stack spacing={2} direction={row}>
                                                        <IconButton component="label">
                                                            <ReportIcon />
                                                        </IconButton>
                                                        <IconButton component="label">
                                                            <RemoveCircleIcon />
                                                        </IconButton>
                                                        <IconButton component="label">
                                                            <IosShareIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
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

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem sx={{ color: 'success.main' }} onClick={() => updateOrDelete('resolve')}>
                    <Iconify icon={'material-symbols:done-rounded'} sx={{ mr: 2 }} />
                    Resolved
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }} onClick={() => updateOrDelete('delete')}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
