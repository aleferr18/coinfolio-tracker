async function watchlistHandler(req,res) {

    const localId = req.body.localId;

    const url = 'https://mydb.firebaseio.com/${localId}/watchlist';

    if(req.body.type == 'add'){
        try{
            const addWatchlist = await fetch(`${url}.json`, {
                method: 'POST',
                body: JSON.stringify(req.body.watchlist),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const data = await addWatchlist.json();  
            res.json(data);
    
        } catch(e){
            console.log(e);
        }
    } else if(req.body.type == 'fetch') {
        try{
            const fetchWatchlist = await fetch(`${url}.json`);
    
            const data = await fetchWatchlist.json();
            res.json(data);
    
        } catch(e){
            console.log(e);
        }
    } else if(req.body.type == 'remove'){
        try{
            const removeWatchlist = await fetch(`${url}/${req.body.removeCoinId}.json`, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                }
            });

            const data = await removeWatchlist.json();           
    
        } catch(e){
            console.log(e);
        }
    }

    res.end();
    
}

export default watchlistHandler;