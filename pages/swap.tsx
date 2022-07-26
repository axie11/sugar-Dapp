import * as React from 'react';
import type { NextPage } from 'next';
import { Container } from '@mui/material';

const Swap: NextPage = () => {

  return (
    <Container maxWidth="xl" sx={{mt: 1, p: 0, pl:0, pr: 0, justifyContent: 'center', alignItems: 'center'}}>
      <iframe width="100%" height="600" src="https://www.flooz.trade/embedded/0xcb2adbca6f15e9b3f1d98fce57ac48a093f34fa9/?backgroundColor=transparent" title="Flooz Trade" frameBorder="0" allow="clipboard-read; clipboard-write; web-share; accelerometer *; autoplay *; camera *; gyroscope *; payment *"> </iframe>
    </Container>
  );
};

export default Swap;
