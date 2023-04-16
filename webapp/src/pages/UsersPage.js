/* eslint-disable prefer-template */
/* eslint-disable camelcase */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
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
    TextField,
    Grid,
    CardContent,
    Modal,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
// components
import ReportIcon from '@mui/icons-material/Report';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IosShareIcon from '@mui/icons-material/IosShare';
import axios from 'axios';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import { storage } from '../_mock/Firebase';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { getActiveUserList } from '../_mock/user';
import { baseUrl } from '../_mock/baseUrl';
import { bearerToken } from '../_mock/bearerToken';
// mui icons
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'age', label: 'Age', alignRight: false },
    { id: 'profession', label: 'Profession', alignRight: false },
    { id: 'hobbies', label: 'Hobbies', alignRight: false },
    { id: 'SDGs', label: 'SDGs', alignRight: false },
    { id: 'investment_frequency', label: 'Investment Frequency', alignRight: false },
    { id: 'company_domains', label: 'Company Domains', alignRight: false },
    { id: 'impact_domains', label: 'Impact Domains', alignRight: false },
    { id: 'mobileNo', label: 'Wallet Address', alignRight: false },
    { id: 'notif_token', label: 'Notification Token', alignRight: false },
    { id: 'dob', label: 'DOB', alignRight: false },
    { id: 'isAuth', label: 'isAuth', alignRight: false },
    { id: 'mintNFT', label: 'Mint NFT', alignRight: false },
];

// ----------------------------------------------------------------------
const API_URL = 'https://api.verbwire.com/v1/nft/mint/quickMintFromFile';
const API_KEY = 'sk_live_750b535e-4774-43c5-a3d9-b5ebfb20821b';

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

export default function UserPage() {
    useEffect(() => {
        getActiveUserList().then((val) => {
            setUserList(val);
        });
    }, []);

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

    const updateOrDelete = async (type, id) => {
        if (type === 'resolve') {
            const apiRes = await fetch(`${baseUrl}/admin/user/update/${id}`, {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXJmaUBnbWFpbC5jb20iLCJpYXQiOjE2ODE1NTkwMTAsImV4cCI6MTY4MjE1OTAxMH0.Vj9Jzislqm4qvCFVTLeqy1lluoUxPh6hrIHIrmwTN4g`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // isActive: true,
                    // isDeleted: false,
                    isAuth: true,
                }),
            });
            const response = await apiRes.json();
            console.log(response);
            if (response.status === 'SUCCESS') {
                console.log('success');
                getActiveUserList().then((val) => {
                    setUserList(val);
                });
                console.log('The updated user is: ');
                console.log(userList);
            } else {
                console.log('error');
            }
        } else {
            console.log(id);
        }
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
    const [open, setOpen] = useState(false);

    const handleMintOnClick = (obj) => {
        console.log(obj)
        setcurrId(obj);
        console.log(currId);
        setOpen(true);


    };
    const handleClose = () => {
        setOpen(false);
    };

    const [file, setFile] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        recipientAddress: '',
        allowPlatformToOperateToken: '',
        chain: '',
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleFormChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    function getBase64(file) {
        // eslint-disable-next-line no-var
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('description', formValues.description);
        formData.append('recipientAddress', formValues.recipientAddress);
        formData.append('allowPlatformToOperateToken', formValues.allowPlatformToOperateToken);
        formData.append('chain', formValues.chain);
        formData.append('filePath', file);

        try {
            setSnackbarOpen(true);
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-API-Key': API_KEY,
                },
            });
            console.log(response.data)
            setResponse(response.data);
            const storageRef = ref(storage, `/files/${file.name}`)

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    // update progress
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        submitResponseToBlob(currId.id, url)
                    });
                }
            );
            // console.log(URL.createObjectURL(file))
            setSuccess(true);
            setError(null);
            setSnackbarOpen(false);
        } catch (error) {
            setResponse(null);
            setSuccess(false);
            setError(error.response?.data?.message || 'Something went wrong');
            setSnackbarOpen(false);
        }
    };

    const submitResponseToBlob = async (id, transactionResponse) => {
        console.log(transactionResponse)
        const apiRes = await fetch(`${baseUrl}/admin/user/update/${id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiYXJmaUBnbWFpbC5jb20iLCJpYXQiOjE2ODE1NTkwMTAsImV4cCI6MTY4MjE1OTAxMH0.Vj9Jzislqm4qvCFVTLeqy1lluoUxPh6hrIHIrmwTN4g`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blob: transactionResponse })
        });
        const response = await apiRes.json();
        console.log(response);
        if (response.status === 'SUCCESS') {
            console.log('success');
            getActiveUserList().then((val) => {
                setUserList(val);
            });
            console.log('The updated user is: ');
            console.log(userList);
        } else {
            console.log('error');
        }
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title> Active Users </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Active Users
                    </Typography>
                </Stack>

                <Card>
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
                                        const {
                                            id,
                                            name,
                                            email,
                                            address,
                                            age,
                                            profession,
                                            hobbies,
                                            SDGs,
                                            investment_frequency,
                                            company_domains,
                                            impact_domains,
                                            notif_token,
                                            mobileNo,
                                            dob,
                                            isAuth,
                                        } = row;
                                        // const selectedUser = selected.indexOf(text) !== -1;
                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox">
                                                <TableCell padding="checkbox">
                                                    {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, text)} /> */}
                                                </TableCell>

                                                {!isAuth ? (
                                                    <></>
                                                ) : (
                                                    <>
                                                        <TableCell align="left">{id}</TableCell>
                                                        <TableCell align="left">{name}</TableCell>
                                                        <TableCell align="left">{email}</TableCell>
                                                        <TableCell align="left">{address}</TableCell>
                                                        <TableCell align="left">{age}</TableCell>
                                                        <TableCell align="left">{profession}</TableCell>
                                                        <TableCell align="left">{hobbies}</TableCell>
                                                        <TableCell align="left">{SDGs}</TableCell>
                                                        <TableCell align="left">{investment_frequency}</TableCell>
                                                        <TableCell align="left">{company_domains}</TableCell>
                                                        <TableCell align="left">{impact_domains}</TableCell>
                                                        <TableCell align="left">{mobileNo}</TableCell>
                                                        <TableCell align="left">{notif_token}</TableCell>
                                                        <TableCell align="left">{dob}</TableCell>
                                                        <TableCell align="left">{isAuth ? 'Authorized' : <></>}</TableCell>
                                                        {/* mint nft by a btn */}
                                                        <TableCell align="left">
                                                            <Button
                                                                variant="contained"
                                                                onClick={() =>
                                                                    handleMintOnClick({
                                                                        id,
                                                                        name,
                                                                        email,
                                                                        address,
                                                                        age,
                                                                        profession,
                                                                        hobbies,
                                                                        SDGs,
                                                                        investment_frequency,
                                                                        company_domains,
                                                                        impact_domains,
                                                                        mobileNo,
                                                                        notif_token,
                                                                        dob,
                                                                    })
                                                                }
                                                            >
                                                                Mint NFT
                                                            </Button>
                                                            <Dialog open={open} onClose={handleClose}>
                                                                {/* how to get user MobNo */}
                                                                <DialogTitle>Mint NFT for {name}</DialogTitle>
                                                                <DialogContent>
                                                                    <div style={{ padding: 16 }}>
                                                                        <Grid container justifyContent="center">
                                                                            <Grid item xs={12} sm={8} md={6}>
                                                                                <form onSubmit={handleSubmit}>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid item xs={12}>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                label="NFT Name"
                                                                                                name="name"
                                                                                                value={formValues.name}
                                                                                                onChange={handleFormChange}
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={12}>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                label="NFT Description"
                                                                                                name="description"
                                                                                                value={formValues.description}
                                                                                                onChange={handleFormChange}
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={12}>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                label="Recipient Wallet Address"
                                                                                                name="recipientAddress"
                                                                                                value={formValues.recipientAddress}
                                                                                                onChange={handleFormChange}
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={12}>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                label="Allow Platform To Operate Token"
                                                                                                name="allowPlatformToOperateToken"
                                                                                                value={formValues.allowPlatformToOperateToken}
                                                                                                onChange={handleFormChange}
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={12}>
                                                                                            <TextField
                                                                                                fullWidth
                                                                                                label="Type of Blockchain"
                                                                                                name="chain"
                                                                                                value={formValues.chain}
                                                                                                onChange={handleFormChange}
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={12}>
                                                                                            <input type="file" accept="image/*" onChange={handleFileChange} />
                                                                                        </Grid>
                                                                                        <Grid item xs={12}>
                                                                                            <DialogActions>
                                                                                                <Button
                                                                                                    fullWidth
                                                                                                    variant="contained"
                                                                                                    color="primary"
                                                                                                    type="submit"
                                                                                                    size="large"
                                                                                                    style={{ backgroundColor: '#1a1a1a' }}
                                                                                                >
                                                                                                    Mint NFT
                                                                                                </Button>
                                                                                            </DialogActions>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </form>
                                                                            </Grid>
                                                                        </Grid>
                                                                        {response && (
                                                                            <Card style={{ marginTop: 16 }}>
                                                                                <CardContent>
                                                                                    <Typography variant="h6">Response</Typography>
                                                                                    <pre>{JSON.stringify(response, null, 2)}</pre>





                                                                                </CardContent>
                                                                            </Card>
                                                                        )}
                                                                        {error && (
                                                                            <Card style={{ marginTop: 16 }}>
                                                                                <CardContent>
                                                                                    <Typography variant="h6">Error</Typography>
                                                                                    <pre>{JSON.stringify(error, null, 2)}</pre>
                                                                                </CardContent>
                                                                            </Card>
                                                                        )}
                                                                        <Snackbar
                                                                            open={snackbarOpen}
                                                                            autoHideDuration={6000}
                                                                            onClose={() => setSnackbarOpen(false)}
                                                                        >
                                                                            <Alert severity="info">Minting NFT...</Alert>
                                                                        </Snackbar>
                                                                        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                                                                            <Alert severity="success">NFT Minted Successfully!</Alert>
                                                                            {/* append to the blob of that user */}

                                                                        </Snackbar>
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </TableCell>
                                                    </>
                                                )}
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
