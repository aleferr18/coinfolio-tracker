const Coin = (props) => {

    const name = props.name.includes('-') ? props.name.replace('-',' ') : props.name;

    const price = props.price;

    const priceVariation = props.priceVariation.percent_change_usd_last_24_hours;

    const removeCoin = (id) => {
        props.removeCoin(id);
    }


    return (
        <li style={{
            padding: "10px",
            borderBottom:"1px solid rgba(211, 211, 211, 0.5)"
        }} className="row">
            <div className="col-2 col-md-1">
                {props.symbol}
            </div>
            <div className="col col-md-3">
                {name}
            </div>
            { <div className="col col-md-6">
                {priceVariation ? <p className="mb-0" style={priceVariation > 0 ? {color: "#7cfd1e"} : {color: "red"}}>{priceVariation > 0 ? "+" : null} 
                {priceVariation.toFixed(4)}
                <span style={{fontFamily: "'Bebas Neue', sans-serif", fontSize: "14px"}}>%</span></p> : null}
                {!priceVariation ? <span>not available</span> : null}
            </div>}
            <div className="col col-md-2 d-flex justify-content-between">
                <p className="m-0">{price.toFixed(2)}</p>
                {props.isRemovable ? <div className="btn-remove" onClick={() => removeCoin(props.id)}>X</div> : null}
            </div>
        </li>
    )
}

export default Coin;