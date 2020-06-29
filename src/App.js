import React from 'react';
import { Container, List, Card, CardContent, Typography, CardMedia, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import axios from 'axios';

const mobilityCardStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    marginBottom: '-1px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '45%',
    maxWidth: 210,
    backgroundSize: 'contain',
    padding: 16,
    backgroundOrigin: 'content-box',
  },
  details: {
    paddingTop: 0,
    marginTop: -16,
  },
}));

function MobilityItem({
  name,
  price,
  thumbnail,
  mobiNo,
  bookingNo,
  startAt,
  returnAt,
  rentalAdrs,
  rentalAdrsDetail,
  rentalAdrsExtra,
  returnAdrs,
  returnAdrsDetail,
  returnAdrsExtra,
  insuranceName,
  limitAge,
  limitExperience,
  liability,
}) {
  const classes = mobilityCardStyles();
  return (
    <Card className={classes.card} variant='outlined'>
      <div className={classes.header}>
        <CardContent className={classes.content}>
          <Typography component='h6' variant='h6'>
            {name}
          </Typography>
          <Typography variant='subtitle2' color='primary'>
            예약번호: {bookingNo}
            <br /> 차량번호: {mobiNo}
            <br /> 결제금액: <NumberFormat value={price} thousandSeparator={true} displayType={'text'} />
            <br /> 대여시각: {startAt.replace('T', ' ')}
            <br /> 반납시각: {returnAt.replace('T', ' ')}
          </Typography>
        </CardContent>
        <CardMedia className={classes.cover} image={thumbnail} title='{name} cover'></CardMedia>
      </div>
      <Divider variant='middle' />
      <div>
        <CardContent className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            <br /> 보험: {insuranceName}({limitAge}세/{limitExperience}년) 보상한도{' '}
            <NumberFormat value={liability} thousandSeparator={true} displayType={'text'} />
            만원
            <br /> 대여장소: {rentalAdrs} {rentalAdrsExtra ? `${rentalAdrsExtra} ${rentalAdrsDetail}` : rentalAdrsDetail}
            <br /> 반납장소: {returnAdrs} {returnAdrsExtra ? `${returnAdrsExtra} ${returnAdrsDetail}` : returnAdrsDetail}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

function renderBookingList(booking, idx) {
  return (
    <MobilityItem
      bookingNo={booking.bookingNo}
      name={booking.bikeName}
      price={booking.liability}
      key={booking.bookingPid}
      thumbnail={booking.thumbnailImgUrl}
      mobiNo={booking.bikeNo}
      startAt={booking.startAt}
      returnAt={booking.returnAt}
      rentalAdrs={booking.rentalAddress}
      rentalAdrsDetail={booking.rentalAddressDetail}
      rentalAdrsExtra={booking.rentalAddressExtra}
      returnAdrs={booking.returnAddress}
      returnAdrsDetail={booking.returnAddressDetail}
      returnAdrsExtra={booking.returnAddressExtra}
      insuranceName={booking.insuranceDpName}
      limitAge={booking.limitAge}
      limitExperience={booking.limitDrivingExperience}
      liability={booking.liability}
    />
  );
}

const mobList = [
  {
    name: 'bike A',
    mobiNo: '11H3432',
    price: '3000',
    thumbnail: 'https://zzimcar-prod.s3.ap-northeast-2.amazonaws.com/zzimcar/car_model/20180809110616_10_MTM.png',
  },
  {
    name: 'car C',
    mobiNo: '33E3456',
    price: '5000',
    thumbnail: 'https://zzimcar-prod.s3.ap-northeast-2.amazonaws.com/zzimcar/car_model/20180724131110_10_Mg.png',
  },
  {
    name: 'bycicle B1',
    mobiNo: '67G2342',
    price: '7000',
    thumbnail: 'https://zzimcar-prod.s3.ap-northeast-2.amazonaws.com/zzimcar/car_model/20180724173109_10_MjI.png',
  },
];

class App extends React.Component {
  state = {
    isLoading: true,
    bookings: [],
  };

  componentDidMount() {
    const askToken = axios
      .post('https://sharing-api.dev.zzimcar.co.kr/client/token', {
        apiKey: 'apitest',
        grantType: 'access_token',
      })
      .then((response) => {
        const token = response.data.data.accessToken;
        const getBookings = axios
          .post(
            'https://sharing-api.dev.zzimcar.co.kr/booking/paging',
            {
              pageNo: 1,
              pageRows: 10,
              targetReqDto: {
                memberPid: 5496,
                mobilityType: 'BIKE',
              },
            },
            { headers: { xClientToken: token } }
          )
          .then((response) => {
            console.log(response);
            this.setState({ bookings: response.data.data.rows });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, bookings } = this.state;
    return (
      <div className='App'>
        <div className='loading'>{isLoading ? 'Loading...' : ''}</div>
        <Container maxWidth='sm'>
          <List component='nav' aria-label='secondary mailbox folders'>
            {bookings.map(renderBookingList)}
          </List>
        </Container>
      </div>
    );
  }
}

export default App;
