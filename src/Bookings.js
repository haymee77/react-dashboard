import React from 'react';
import axios from 'axios';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableFooter,
  TableCell,
  TableRow,
  Paper,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';

class Bookings extends React.Component {
  state = {
    bookings: [],
    pageNo: 0,
    pageRows: 0,
    lastPage: true,
    totalRows: 0,
  };

  localSharingApiUrl = 'http://localhost:8200';
  prodSharingApiUrl = 'https://sharing-api.dev.zzimcar.co.kr';

  handlePaging = (evt, page) => {
    console.log(evt);
    console.log(page);
  };

  componentDidMount() {
    axios
      .post(this.localSharingApiUrl + '/client/token', {
        apiKey: 's01oINszUdkAfDxuXLAcC2c4mDNpegnL',
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        axios
          .post(
            this.localSharingApiUrl + '/admin/booking',
            {
              pageNo: 3,
              pageRows: 10,
            },
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            this.setState({
              bookings: response.data.data.rows,
              pageNo: response.data.data.pageNo,
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  render() {
    const bookingTableStyles = makeStyles((theme) => ({
      table: {
        minWidth: 600,
      },
      pagination: {
        '& ul': {
          justifyContent: 'center',
        },
      },
    }));

    const { bookings, pageNo } = this.state;

    return (
      <TableContainer component={Paper}>
        <Table className={bookingTableStyles.table} aria-label='예약목록'>
          <TableHead>
            <TableRow>
              <TableCell>예약번호</TableCell>
              <TableCell>차량번호</TableCell>
              <TableCell>대여일시</TableCell>
              <TableCell>반납일시</TableCell>
              <TableCell>예약자명</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>총결제금액</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.bookingNo}>
                <TableCell>{booking.bookingNo}</TableCell>
                <TableCell>{booking.vehicleNo}</TableCell>
                <TableCell>{booking.startAt}</TableCell>
                <TableCell>{booking.returnAt}</TableCell>
                <TableCell>{booking.subscriberName}</TableCell>
                <TableCell>{booking.subscriberContact}</TableCell>
                <TableCell>
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    value={booking.payAmount}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>
                <Pagination
                  className={bookingTableStyles.pagination}
                  count={10}
                  page={pageNo}
                  onChange={this.handlePaging}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }
}

export default Bookings;
