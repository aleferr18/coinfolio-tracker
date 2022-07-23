import Coin from './Coin';

const TopCoins = (props) => {

    const data = props.topCoinsData;

    return (
        <div className="mt-5">
            <h2 className='text-center'>Top 20 Coins</h2>
            <ul className='mt-3'>
                {data.map((coin) => {
                    return <Coin 
                    key={coin.id}
                    name={coin.name} 
                    price={coin.price} 
                    priceVariation={coin.priceVariation}
                    symbol={coin.symbol}/>
                })}
            </ul>
        </div>
    )
}



export default TopCoins;