import styles from '../../styles/Layout.module.css'
import Logo from '../../public/images/logo.svg'
import Menu from '../../public/images/menu.svg'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/user-context';
import Modal from '../UI/Modal';

const Layout = (props) => {

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showMenuResponsive, setShowMenuResponsive] = useState(false);

    const router = useRouter();

    const activeNav = styles.active;

    const ctx = useContext(UserContext);

    const [token, setToken] = useState();
    const [localId, setLocalId] = useState();

    useEffect(() => {
         setToken(localStorage.getItem("token"));
    }, [])

    const logoutHandler = () => {
        ctx.changeIsLoggedIn({type: 'Logout'});
        localStorage.removeItem("token");
        localStorage.removeItem("localId");
        setToken(null);
    }

    const getToken = () => {
        setToken(localStorage.getItem("token"));
        setLocalId(localStorage.getItem("localId"));
    }

    const showMenuResponsiveHandler = () => {
        setShowMenuResponsive(!showMenuResponsive);
    }


    return (
        <div className="container">
            <div className={styles.header_top}>
                <ul className='d-none d-md-block'>
                    {!token ? <Fragment>
                        <li>
                            <button className='btn' onClick={() => setShowLoginModal(true)}>
                            Login
                            </button>
                            <Modal 
                            type="login" 
                            show={showLoginModal} 
                            getToken={getToken} 
                            closeModal={() => setShowLoginModal(false)} 
                            title="login"/>
                        </li>
                        <li>
                        <button className='btn' onClick={() => setShowSignUpModal(true)}>
                            Sign Up
                            </button>
                            <Modal 
                            type="signUp" 
                            show={showSignUpModal} 
                            getToken={getToken} 
                            closeModal={() => setShowSignUpModal(false)} 
                            title="sign up"/>
                        </li>
                    </Fragment> : <li className={styles.li_logout}>
                        <button className="btn pe-0" onClick={logoutHandler}>Logout</button>
                        </li>
                    }
                    
                </ul>
            </div>
            <header className='header'>
                <div className="row">
                    <div className='col-9 col-md-4 d-flex align-items-center'>
                        <Logo id={styles.logo}/>
                        <h1 id={styles.logo_title}>coinfolio</h1>
                    </div>
                    <div className='col-md-8 d-none d-md-flex align-items-center'>
                        <nav className={styles.nav}>
                            <ul>
                                <li>
                                    <Link href="/">
                                    <a className={router.pathname == "/" ? activeNav : ""}>
                                        Dashboard
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/portfolio">
                                    <a className={router.pathname == "/portfolio" ? activeNav : ""}>
                                        Portfolio
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/watchlist">
                                    <a className={router.pathname == "/watchlist" ? activeNav : ""}>
                                        Watchlist
                                    </a>
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link href="/tools">
                                    <a className={router.pathname == "/tools" ? activeNav : ""}>
                                        Tools
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bonus">
                                    <a className={router.pathname == "/bonus" ? activeNav : ""}>
                                        Bonus
                                    </a>
                                    </Link>
                                </li> */}
                            </ul>
                        </nav>                        
                    </div>
                    <div className="col-3 d-md-none d-flex align-items-center justify-content-end">
                        <Menu id={styles.logo_menu} onClick={showMenuResponsiveHandler}/>
                    </div>
                </div>
            </header>
            <div className={`${styles.menu_responsive} ${showMenuResponsive ? styles.active : null }`}>
                <div className={styles.btn_close} onClick={showMenuResponsiveHandler}>X</div>
                <div className="container mt-5">
                    <div className="row pt-5">   
                        <nav className={`${styles.nav} d-flex d-md-none justify-content-center align-items-center`}>
                                <ul className='d-flex flex-column'>
                                    <li>
                                        <Link href="/">
                                        <a onClick={showMenuResponsiveHandler} className={router.pathname == "/" ? activeNav : ""}>
                                            Dashboard
                                        </a>
                                        </Link>
                                    </li>
                                    <li className="ms-0">
                                        <Link href="/portfolio">
                                        <a onClick={showMenuResponsiveHandler} className={router.pathname == "/portfolio" ? activeNav : ""}>
                                            Portfolio
                                        </a>
                                        </Link>
                                    </li>
                                    <li className="ms-0">
                                        <Link href="/watchlist">
                                        <a onClick={showMenuResponsiveHandler} className={router.pathname == "/watchlist" ? activeNav : ""}>
                                            Watchlist
                                        </a>
                                        </Link>
                                    </li>
                                    {/* <li className="ms-0">
                                        <Link href="/tools">
                                        <a onClick={showMenuResponsiveHandler} className={router.pathname == "/tools" ? activeNav : ""}>
                                            Tools
                                        </a>
                                        </Link>
                                    </li>
                                    <li className="ms-0">
                                        <Link href="/bonus">
                                        <a onClick={showMenuResponsiveHandler} className={router.pathname == "/bonus" ? activeNav : ""}>
                                            Bonus
                                        </a>
                                        </Link>
                                    </li> */}
                                </ul>
                        </nav> 
                        <ul className='d-flex d-md-none mt-5 justify-content-center'>
                            {!token ? <Fragment>
                                <li>
                                    <button className='btn text-white' onClick={() => {setShowLoginModal(true); showMenuResponsiveHandler()}}>
                                    Login
                                    </button>
                                    <Modal 
                                    type="login" 
                                    show={showLoginModal} 
                                    getToken={getToken} 
                                    closeModal={() => setShowLoginModal(false)} 
                                    title="login"/>
                                </li>
                                <li>
                                <button className='btn text-white' onClick={() => {setShowSignUpModal(true); showMenuResponsiveHandler()}}>
                                    Sign Up
                                    </button>
                                    <Modal 
                                    type="signUp" 
                                    show={showSignUpModal} 
                                    getToken={getToken} 
                                    closeModal={() => setShowSignUpModal(false)} 
                                    title="sign up"/>
                                </li>
                            </Fragment> : <li className={styles.li_logout}>
                                <button className="btn text-white pe-0" onClick={logoutHandler}>Logout</button>
                                </li>
                            }
                        </ul>    
                    </div>
                </div>
            </div>
            <main className="pb-5">{props.children}</main>
            {/* <footer className={styles.footer}>
                <p className='text-center'>
                    Powered by Messari.io - DexGuru API
                </p>
            </footer> */}
        </div>

    )
}

export default Layout;