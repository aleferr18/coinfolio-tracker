import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../store/user-context";
import AddCoinModal from "../../components/UI/AddCoinModal";
import Coin from "../../components/UI/Coin";
import Loader from "../../components/UI/Loader";

const WatchList = (props) => {

    const ctx = useContext(UserContext);
    
    const [userWatchlist, setUserWatchlist] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const localId = ctx.localId;

    useEffect(() => {
        setIsLoggedIn(ctx.isLoggedIn);

        if(ctx.isLoggedIn){
            getWatchlistData();
        }
    },[]);

    useEffect(() => {
        setIsLoggedIn(ctx.isLoggedIn)

        if (!ctx.isLoggedIn){
            setUserWatchlist([]);
        }
    }, [ctx.isLoggedIn])
 

    const getWatchlistData = async () => {
        setIsLoading(true);
        try {           
        const fetchWatchlist = await fetch('/api/watchlist-api', {
            method: 'POST',
            body: JSON.stringify({
                    localId: localId,
                    type: 'fetch'
                }),
            headers: {
                    "Content-type": "application/json"
            }
        });

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
    } catch(e) {
        console.log(e);
    }}

    const getWatchlistPrice = async (currentWatchlist) => {

        const fetchApi = await fetch("https://data.messari.io/api/v1/assets");

        const response = await fetchApi.json();

        
        const actualWatchlist = [...currentWatchlist];
        const sanitizeData = response.data.map(coin => {
            return {...coin, name: coin.name.toLowerCase()}
        });

        for(let i=0; i < actualWatchlist.length; i++){
            for(let x=0; x < sanitizeData.length; x++){
                if (actualWatchlist[i].name === sanitizeData[x].name ){
                    actualWatchlist[i].price = sanitizeData[x].metrics.market_data.price_usd;
                    actualWatchlist[i].priceVariation = sanitizeData[x].metrics.market_data;
                    actualWatchlist[i].symbol = sanitizeData[x].symbol;
                    }
                }
            }
 
        setUserWatchlist(actualWatchlist);
        ctx.changeWatchlist(actualWatchlist);
        setIsLoading(false);
    }

    const addCoinToWatchlist = (data) => {
        const newWatchList = [...userWatchlist, {
            name: data,
            chain: 1
        }];
        getWatchlistPrice(newWatchList);
    }

    const removeCoinFromWatchlist = async (id) => {
        const index = userWatchlist.findIndex(el => el.id == id);
        const newWatchlist = [...userWatchlist];
        newWatchlist.splice(index, 1);
        
        try {
            const removeCoin = await fetch('/api/watchlist-api', {
            method: 'POST',
            body: JSON.stringify({
                    localId: localId,
                    removeCoinId: id,
                    type: 'remove'
                }),
            headers: {
                    "Content-type": "application/json"
            }
            }); 
        }
        catch(e){
            console.log(e);
        }

        setUserWatchlist(newWatchlist);
        ctx.changeWatchlist(newWatchlist);
    }

    return (
        <Fragment>
            <div className="my-5 d-flex justify-content-between align-items-center">
                <div className="col-md-6">
                    {isLoggedIn ? <p className="mb-0">N. coins: {userWatchlist.length}</p> : null}
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    {isLoggedIn ? <button 
                        type="button" 
                        className="btn text-custom btn_add" 
                        onClick={() => setShowModal(true)}>Add</button> : null}    
                </div>
            </div>
            <ul>
                <AddCoinModal 
                    show={showModal} 
                    closeModal={() => setShowModal(false)} 
                    localId={localId} 
                    addCoinToWatchlist={addCoinToWatchlist}/>
                {(userWatchlist.length > 0 && isLoggedIn && !isLoading) ? userWatchlist.map((coin,i) => <Coin 
                    key={i}
                    id={coin.id}
                    name={coin.name} 
                    price={coin.price} 
                    priceVariation={coin.priceVariation}
                    symbol={coin.symbol}
                    isRemovable={true}
                    removeCoin={removeCoinFromWatchlist}
                    >{coin.tokenAddress}
                    </Coin>) : null}
                {(userWatchlist.length < 1 && isLoggedIn && !isLoading) ? <p className="text-center">No coins.</p> : null}
                {(!isLoggedIn && !isLoading) ? <p className="text-center">Login or sign up to view your watchlist.</p> : null}   
                {isLoading ? <Loader/> : null}    
            </ul>
        </Fragment>
    )
}

export default WatchList;