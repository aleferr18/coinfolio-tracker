import { useContext } from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import styles from '../../styles/Modal.module.css'
import { UserContext } from "../../store/user-context";


const AddCoinModal = (props) => {

    const [isBrowser, setIsBrowser] = useState(false);
    const ctx = useContext(UserContext);

    const inputCoin = useRef();

    useEffect(() => { 
        setIsBrowser(true);
    }, []);

    const closeModal = () => {
        props.closeModal();
    }

    const addCoinToWatchlist = async (event) => {
        event.preventDefault();

        const name = inputCoin.current.value.toLowerCase().trim();

        const fetchApi = await fetch("https://data.messari.io/api/v1/assets");
        const response = await fetchApi.json();

        const isContained = response.data.findIndex(coin => coin.slug == name);
        const isAlreadyContained = ctx.watchlist.findIndex(coin => coin.name == name)

        if (isContained != -1 && isAlreadyContained == -1){
            try {
                const addCoin = await fetch('/api/watchlist-api', {
                method: 'POST',
                body: JSON.stringify({
                        localId: props.localId,
                        watchlist: {
                            name: name, 
                            chain: 1
                        },
                        type: 'add'
                    }),
                headers: {
                        "Content-type": "application/json"
                }
            });
    
            const data = await addCoin.json();
    
            props.addCoinToWatchlist(name.toLowerCase());
            props.closeModal();
        } catch (e){
                console.log(e);
            }
        } else if (isAlreadyContained != -1) {
            alert("The coin that you\'re trying to add is already added.");
        } else {
            alert("The coin that you\'re trying to add is not one of the top 20 Coins.");
        }
    }
    

    const modalContent = props.show ? <Fragment><div className={`${styles.overlay} ${styles.active}`}></div>
            <div className={styles.modal_backdrop}>
            <div className={`${styles.modal} ${styles.active}`}>
                 <button className={`btn text-white ${styles.btn_closeModal}`} onClick={closeModal}>X</button>
                <div className={styles.modal_title}>
                    <h2 className="text-center">Add coin to your watchlist</h2>
                </div>
                <form className="container">
                    <div className={styles.modal_content}>
                            <div className="mb-4">
                                <input type="text" ref={inputCoin} placeholder="Insert coin name..(bitcoin, ethereum, etc..)"/>
                            </div>
                    </div>
                    <div className="btn_group">
                        <button type="submit" onClick={addCoinToWatchlist} className="btn text-custom">add</button>
                    </div>
                </form>
            </div>
            </div>
            </Fragment>: null;

    if (isBrowser){
        return reactDom.createPortal(
            modalContent,
            document.getElementById("addCoinModal-root"))
    } else {
        return null;
    }
    
}

export default AddCoinModal;