import { Fragment, useContext, useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import { UserContext } from "../../store/user-context";
import styles from '../../styles/Modal.module.css'


const Modal = (props) => {

    const [isBrowser, setIsBrowser] = useState(false);


    const ctx = useContext(UserContext);

    const inputEmail = useRef();
    const inputPassword = useRef();

    useEffect(() => { 
        setIsBrowser(true);
    }, []);

    const closeModal = () => {
        props.closeModal();
    }

    const formHandler = async (event) => {
        event.preventDefault();

        try{
            const fetchApiAuth = await fetch('/api/auth-api', {
                method: 'POST',
                body: JSON.stringify({
                    email: inputEmail.current.value,
                    password: inputPassword.current.value,
                    type: props.type
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
                
            const response = await fetchApiAuth.json();

            if(response.localId){
                ctx.changeIsLoggedIn({type: "NewToken", token: response.idToken, localId: response.localId})
        
                props.getToken();
                props.closeModal();
                return;
            } else {
                throw response.error;
            }
        } catch(error){
            console.log(error.message);
        
            const alertError = error.message.replaceAll('_', ' ');

            alert(alertError);

            return;
        }

        
    }
    

    const modalContent = props.show ? <Fragment><div className={`${styles.overlay} ${styles.active}`}></div>
            <div className={styles.modal_backdrop}>
            <div className={`${styles.modal} ${styles.active}`}>
                 <button className={`btn text-white ${styles.btn_closeModal}`} onClick={closeModal}>X</button>
                <div className={styles.modal_title}>
                    <h2 className="text-center">{props.title}</h2>
                </div>
                <form className="container">
                    <div className={styles.modal_content}>
                            <div className="mb-4">
                                <label className="d-block">Email</label>
                                <input type="email" ref={inputEmail}/>
                            </div>
                            <div>
                                <label className="d-block">Password</label>
                                <input type="password" ref={inputPassword}/>
                            </div>
                    </div>
                    <div className="btn_group mt-5">
                        <button type="submit" onClick={formHandler} className="btn text-custom">{props.title}</button>
                    </div>
                </form>
            </div>
            </div>
            </Fragment>: null;

    if (isBrowser){
        return reactDom.createPortal(
            modalContent,
            document.getElementById("modal-root"))
    } else {
        return null;
    }
    
}

export default Modal;