import React from 'react';
import { Container, List, Card, CardContent, Typography, CardMedia, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';

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

function MobilityItem({ name, price, thumbnail, mobiNo }) {
  const classes = mobilityCardStyles();
  return (
    <Card className={classes.card} variant='outlined'>
      <div className={classes.header}>
        <CardContent className={classes.content}>
          <Typography component='h6' variant='h6'>
            {name}
          </Typography>
          <Typography variant='subtitle2' color='primary'>
            예약번호: //NO
            <br /> 차량번호: {mobiNo}
            <br /> 결제금액: <NumberFormat value={price} thousandSeparator={true} displayType={'text'} />
            <br /> 대여시각: 2020-06-20 13:30
            <br /> 반납시각: 2020-06-20 15:30
          </Typography>
        </CardContent>
        <CardMedia className={classes.cover} image={thumbnail} title='{name} cover'></CardMedia>
      </div>
      <Divider variant='middle' />
      <div>
        <CardContent className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            <br /> 보험: 일반자차(26세/1년) 보상한도 300만원
            <br /> 대여장소: 서울 강남구 봉은사로 438 (삼성동) 5층 네이처모빌리티
            <br /> 반납장소: 서울 강남구 봉은사로 438 (삼성동) 5층 네이처모빌리티
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}

function renderBookingList(mob, idx) {
  return <MobilityItem name={mob.name} price={mob.price} key={idx} thumbnail={mob.thumbnail} mobiNo={mob.mobiNo} />;
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

function App() {
  return (
    <div className='App'>
      <Container maxWidth='sm'>
        <List component='nav' aria-label='secondary mailbox folders'>
          {mobList.map(renderBookingList)}
        </List>
      </Container>
    </div>
  );
}

export default App;
