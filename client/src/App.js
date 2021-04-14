/* eslint-disable no-lone-blocks */
import React from 'react';
import './App.css';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from './component/LandingPage/LandingPage';

import { useQuery } from 'react-query';
import { useAtom } from 'jotai';
import { loggedIn } from './store';
import axios from 'axios';

export default function App() {
  const [loggedInCheck, setLogged] = useAtom(loggedIn);

  const checkLoggedIn = async () => {
    const res = await axios.get('/api/auth/isLoggedIn', {
      withCredentials: true
    });

    setLogged(res.data);
  };

  const { data } = useQuery('checkAuth', checkLoggedIn);

  console.log('logged here = ', loggedInCheck);

  return (
    <Router>
      <Box h="100%" bgGradient="linear(to-t, blue.800, blue.900)">
        <Landing />
      </Box>
    </Router>
  );
}
