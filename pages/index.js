import Box from "../components/UI/Box";
import TopCoins from "../components/UI/TopCoins";

function HomePage(props) {

  const data = props.topCoins; 

  return (
      <div className='row mt-5'>
        <div className='col-md-6'>
          <Box title="Portfolio"></Box>
        </div>
        <div className='col-md-6 mt-4 mt-md-0'>
          <Box title="Watchlist"/>
        </div>
        <TopCoins topCoinsData={data}/>
      </div>
  )
}

/* export async function getStaticProps(){

  //const fetchApi = await fetch("https://data.messari.io/api/v1/assets?fields=id,name,symbol,metrics/market_data/price_usd");

  const fetchApi = await fetch("https://api.dev.dex.guru/v1/chain/56/tokens/market?api-key=C3aZxKMc-7x5Kq1bGFwgbGDKmlS3n1t3CbaG5v6hLwk"); 
  
  const coins = await fetchApi.json();

  console.log(coins);

  return {
    props: {
      coins: coins
    }
  };
} */

export async function getServerSideProps(context){

  const fetchApi = await fetch("https://data.messari.io/api/v1/assets");

  const response = await fetchApi.json();

  return {
      props: {
          topCoins: response.data.map(coin => {
            return {
              id: coin.id,
              name: coin.name,
              price: coin.metrics.market_data.price_usd,
              priceVariation: coin.metrics.market_data,
              symbol: coin.symbol
            }
          })  
      }
  }
}

export default HomePage;