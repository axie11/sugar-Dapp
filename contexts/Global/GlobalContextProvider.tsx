import { useEffect, useState } from 'react';
import { ProviderProps } from '../../types';
import GlobalContext from './GlobalContext';
import { useCoingecko } from '../../hooks';
import { useMoralis } from 'react-moralis';
import { SUGAR_ADDRESS, SUGAR_GENESIS_BLOCK, MORALIS_SERVER_URL, MORALIS_APP_ID } from '../../config';

const GlobalContextProvider = ( props: ProviderProps) => {
  const { fetchCoinData } = useCoingecko();
  const { Moralis } = useMoralis();
  const [sugarPrice, setSugarPrice] = useState<number | null>(null);
  const [tokenHolders, setTokenHolders] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [burndSupply, setBurndSupply] = useState<number>(0);

  useEffect(() => {
    

    async function getCoinData() {
      const sugarland = await fetchCoinData('sugarland-token');
      setSugarPrice(sugarland.current_price.usd.toFixed(10));
      setTotalSupply(sugarland.total_supply);
      setMarketCap(Number((sugarland.current_price.usd * sugarland.total_supply).toFixed()));
      // setBurndSupply(sugarland.)
      return sugarland;
    }
    getCoinData();

    const getHolders = async () => {
      const GetBlockTokenHoldersDto  = {
        chainId: 56,
        contractAddress: SUGAR_ADDRESS,
        pageSize: 10000,
        blockHeight: 'latest',
      };
      try {
        const holders = await Moralis.Plugins.covalent.getBlockTokenHolders(
          GetBlockTokenHoldersDto 
        );
        setTokenHolders(holders.data.pagination.total_count);
      } catch (error) {
        setTokenHolders(0);
      }
    }

    Moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID}).then(() => {
      Moralis.initPlugins();
      getHolders();
    });

  }, []);

  return <GlobalContext.Provider value={{ sugarPrice, tokenHolders, totalSupply, marketCap }}>{ props.children }</GlobalContext.Provider>;
};

export default GlobalContextProvider;
