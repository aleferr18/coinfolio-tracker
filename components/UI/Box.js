import { useContext, useEffect } from 'react';
import { UserContext } from '../../store/user-context';
import Link from 'next/link';
import styles from '../../styles/Box.module.css'
import Coin from './Coin';
import { useState } from 'react';

const Box = (props) => {

    const ctx = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [watchlist, setWatchlist] = useState([]);
    const localId = ctx.localId;

    useEffect(() => {
        setIsLoggedIn(ctx.isLoggedIn);
        setWatchlist(ctx.watchlist);
    }, [ctx.isLoggedIn]);

    useEffect(() => {
        setIsLoggedIn(ctx.isLoggedIn);
        setWatchlist(ctx.watchlist);
        
        if(props.title === 'Watchlist' && ctx.isLoggedIn)
            getWatchlistData();
    }, []);

    const getWatchlistData = async () => {
        try {           
        const fetchWatchlist = await fetch('/api/watchlist-api', {
            method: 'POST',
            body: JSON.stringify({
                    localId: localId,
                    type: 'fetch'
                }),
            headers: {
                    "Content-Type": "application/json"
            }
        });

        if(fetchWatchlist.ok){
            const data = await fetchWatchlist.json(); 

            if (data) {
                const newWatchList = [];

                for (const key in data) {
                    newWatchList.push({
                    id: key,
                    name: data[key].name,
                    chain: data[key].chain
                    });
                }
                getWatchlistPrice(newWatchList);
            }
        }
    } catch(e) {
        console.log(e);
    }}

    const getWatchlistPrice = async (currentWatchlist) => {

        const fetchApi = await fetch("https://data.messari.io/api/v1/assets");

        const response = await fetchApi.json();

        const newWatchlist = [];
        const actualWatchlist = [...currentWatchlist];
        const sanitizeData = response.data.map(coin => {
            return {...coin, name: coin.name.toLowerCase()}
        });

        for(let i=0; i < actualWatchlist.length; i++){
            for(let x=0; x < sanitizeData.length; x++){
                if (sanitizeData[x].name === actualWatchlist[i].name){
                    newWatchlist.push({
                        id: sanitizeData[x].id,
                        name: sanitizeData[x].name,
                        price: sanitizeData[x].metrics.market_data.price_usd,
                        priceVariation: sanitizeData[x].metrics.market_data,
                        symbol: sanitizeData[x].symbol
                    })
                }
            }
        }

        ctx.changeWatchlist(newWatchlist);
    }
    
    return (
        <div className={styles.box}>
            <div className="row">
                <div className="col-6">
                    <h2 className='mb-0'>
                        {props.title}
                    </h2>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end">
                     <Link href={`/${props.title.toLowerCase()}`}>                         
                            <a className="text-white">
                                see more {">"}
                            </a>
                    </Link>
                </div>
            </div>
            
            {props.title === 'Watchlist' ? <ul className='mt-3'>
                { (watchlist.length > 0 && isLoggedIn) ? watchlist.map((coin,i) => {
                    if (i < 3){
                        return <Coin 
                                key={i}
                                name={coin.name} 
                                price={coin.price} 
                                priceVariation={coin.priceVariation}
                                symbol={coin.symbol}
                                >{coin.tokenAddress}
                                </Coin>
                    }}) : (watchlist.length == 0 && isLoggedIn) ? <p className='mt-3'>Add your coins in the "Watchlist" section to view them here.</p> : <p className='mt-3'>Login or sign up to view your watchlist.</p>
                }  
            </ul> : <ul className='mt-3'>Coming soon..</ul>}
        </div>
    )
}

export default Box;