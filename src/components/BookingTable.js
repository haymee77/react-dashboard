import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableFooter, TableCell, TableRow, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';

// const sharingApiUrl = 'http://localhost:8200';
const sharingApiUrl = 'https://sharing-api.dev.zzimcar.co.kr';

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const pageRows = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [lastPageNo, setLastPageNo] = useState(0);

  const getBookingPaging = (pageNo) => {
    axios
      .post(sharingApiUrl + '/client/token', {
        apiKey: 's01oINszUdkAfDxuXLAcC2c4mDNpegnL',
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        axios
          .post(
            sharingApiUrl + '/admin/booking',
            {
              pageNo: pageNo,
              pageRows: pageRows,
            },
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            const data = response.data.data;
            setBookings(data.rows);
            setPageNo(data.pageNo);
            setLastPageNo(Math.ceil(data.totalRows / data.pageRows));
            setTotalRows(data.totalRows);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBookingPaging(1);
  }, []);

  const handlePaging = (evt, page) => getBookingPaging(page);

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 600,
    },
    head: {
      '& tr': {
        backgroundColor: theme.palette.common.black,
        '& th': {
          color: theme.palette.common.white,
          textAlign: 'center',
        },
      },
    },
    cancelRow: {
      backgroundColor: theme.palette.warning.light,
      color: theme.palette.warning.contrastText,
    },
    failRow: {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.contrastText,
    },
    successRow: {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.contrastText,
    },
    pagination: {
      '& ul': {
        justifyContent: 'center',
      },
    },
  }));

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='예약목록' size='small'>
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell width={70}>예약일시</TableCell>
            <TableCell width={200}>예약번호</TableCell>
            <TableCell width={50}>예약상태</TableCell>
            <TableCell width={60}>차량번호</TableCell>
            <TableCell width={60}>대여일시</TableCell>
            <TableCell width={60}>반납일시</TableCell>
            <TableCell width={50}>예약자명</TableCell>
            <TableCell width={50}>연락처</TableCell>
            <TableCell width={60}>총결제금액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking.bookingNo}
              className={booking.bookingStatus !== 'SUCCESS' ? (booking.bookingStatus === 'CANCEL' ? classes.cancelRow : classes.failRow) : classes.successRow}
            >
              <TableCell>{booking.createdAt.replace('T', ' ')}</TableCell>
              <TableCell>{booking.bookingNo}</TableCell>
              <TableCell>{booking.bookingStatus}</TableCell>
              <TableCell>{booking.vehicleNo}</TableCell>
              <TableCell>{booking.startAt.replace('T', ' ')}</TableCell>
              <TableCell>{booking.returnAt.replace('T', ' ')}</TableCell>
              <TableCell>{booking.subscriberName}</TableCell>
              <TableCell>{booking.subscriberContact}</TableCell>
              <TableCell align={'right'}>
                <NumberFormat displayType={'text'} thousandSeparator={true} value={booking.payAmount} />원
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <Pagination className={classes.pagination} count={lastPageNo} page={pageNo} onChange={handlePaging} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
