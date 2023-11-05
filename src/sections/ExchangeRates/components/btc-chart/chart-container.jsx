import { useRef, useState, useEffect } from 'react';

import {
  Card,
  Grid,
  List,
  Alert,
  Slide,
  Button,
  Snackbar,
  useTheme,
  Skeleton,
  CardHeader,
  ButtonGroup,
  useMediaQuery,
  ListItemButton,
} from '@mui/material';

import './btc-chart.css';
import BtcChart from './chart';
import ApiFetch from '../../utils/apiFetch';
import CoinListChart from './coin-list-chart';

const ChartContainer = () => {
  const [error, setError] = useState(false);
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [coinsListData, setCoinsListData] = useState([]);
  const [coinsListStart, setCoinsListStart] = useState(0);

  const periodRef = useRef('24h');

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const pageOfCoinsListSize = isMobileScreen ? 5 : 10;

  const dateSwitch = [
    {
      label: '1 Hour',
      period: '1h',
    },
    {
      label: '24h',
      period: '24h',
    },
    {
      label: '7 Days',
      period: '7d',
    },
    {
      label: '30 Days',
      period: '30d',
    },
    {
      label: '1 Year',
      period: '1y',
    },
  ];

  const getEthValue = () => {
    ApiFetch.getEthRate(periodRef.current)
      .then((res) => {
        setEthData(res.data.history.reverse());
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const handleGetBtcRate = (timePeriod) => {
    periodRef.current = timePeriod;
    ApiFetch.getBtcRate(periodRef.current)
      .then((res) => {
        setBtcData(res.data.history.reverse());
        if (ethData.length > 0) {
          getEthValue();
        }
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const getCoinsList = () => {
    ApiFetch.getCoinsList()
      .then((res) => {
        setCoinsListData(res.data.coins);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  useEffect(() => {
    handleGetBtcRate('24h');
    getCoinsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card className="btc-chart__card">
        <CardHeader title="Coins History" />
        <Grid container direction="row" width="100%">
          {btcData.length < 1 ? (
            <Skeleton
              variant="rounded"
              width="96%"
              height={300}
              style={{
                margin: 'auto',
                marginBottom: '2%',
              }}
            />
          ) : (
            <>
              <Grid sm={2} xs={12} item>
                <List
                  sx={{
                    display: {
                      xs: 'flex',
                      sm: 'block',
                    },
                  }}
                >
                  {dateSwitch.map((el) => (
                    <ListItemButton
                      selected={el.period === periodRef.current}
                      onClick={() => handleGetBtcRate(el.period)}
                      key={el.period}
                    >
                      {el.label}
                    </ListItemButton>
                  ))}
                  <Button
                    variant="contained"
                    style={{
                      margin: '10px auto',
                      display: 'flex',
                    }}
                    onClick={() => (ethData.length > 0 ? setEthData([]) : getEthValue())}
                  >
                    {ethData.length > 0 ? 'Remove ETH' : 'Add ETH'}
                  </Button>
                </List>
              </Grid>
              <Grid sm={10} xs={12} item>
                <BtcChart btcData={btcData} ethData={ethData} />
              </Grid>
            </>
          )}
        </Grid>
      </Card>
      <Card className="btc-chart__card">
        <CardHeader title="Coins List" />
        {coinsListData.length < 1 ? (
          <Skeleton
            variant="rounded"
            width="96%"
            height={300}
            style={{
              margin: 'auto',
              marginBottom: '2%',
            }}
          />
        ) : (
          <>
            <Grid xs={12} item>
              <CoinListChart
                coinsListData={coinsListData}
                coinsListStart={coinsListStart}
                pageOfCoinsListSize={pageOfCoinsListSize}
              />
            </Grid>
            <Grid item container justifyContent="center" marginBottom={2}>
              <ButtonGroup variant="contained">
                <Button
                  disabled={coinsListStart <= 0}
                  onClick={() =>
                    setCoinsListStart((prev) => (prev <= 0 ? 0 : prev - pageOfCoinsListSize))
                  }
                >
                  Prev {pageOfCoinsListSize}
                </Button>
                <Button
                  disabled={coinsListStart + pageOfCoinsListSize >= coinsListData.length}
                  onClick={() =>
                    setCoinsListStart((prev) =>
                      prev >= coinsListData.length
                        ? coinsListData.length
                        : prev + pageOfCoinsListSize
                    )
                  }
                >
                  Next {pageOfCoinsListSize}
                </Button>
              </ButtonGroup>
            </Grid>
          </>
        )}
      </Card>
      <Snackbar
        open={error}
        onClose={() => setError(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert severity="error">Error while receiving data</Alert>
      </Snackbar>
    </>
  );
};
export default ChartContainer;
