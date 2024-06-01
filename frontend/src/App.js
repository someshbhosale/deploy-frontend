import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';

const AppContainer = styled('div')({
  flexGrow: 1,
});

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Title = styled(Typography)({
  flexGrow: 1,
});

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      const response = await axios.get('https://deploy-backend-hazel.vercel.app/api/results');
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Error fetching results. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <AppContainer>
      <AppBarStyled position="static">
        <Toolbar>
          <Title variant="h6">
            Election Results Dashboard
          </Title>
        </Toolbar>
      </AppBarStyled>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            {results.map((result, index) => (
              <CardStyled key={index}>
                <CardContent>
                  <Typography variant="h6">{result.constituency} - {result.state}</Typography>
                  <TableContainerStyled component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Party</TableCell>
                          <TableCell>Won</TableCell>
                          <TableCell>Leading</TableCell>
                          <TableCell>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{result.party}</TableCell>
                          <TableCell>{result.won}</TableCell>
                          <TableCell>{result.leading}</TableCell>
                          <TableCell>{result.total}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainerStyled>
                </CardContent>
              </CardStyled>
            ))}
          </>
        )}
      </Container>
    </AppContainer>
  );
}

export default App;
