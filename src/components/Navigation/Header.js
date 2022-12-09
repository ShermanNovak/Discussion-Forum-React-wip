import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Tabs from './Tabs'
import dp2 from '../../assets/dp2.png'
import Card from '../UI/Card'
import AuthContext from '../../store/auth-context';

// to change logout button to dropdown toggle

import classes from './Header.module.css'

const Header = props => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [showLogout, setShowLogout] = useState(false);    

    const showLogoutHandler = () => {
        setShowLogout((prevState) => !prevState);
    }

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/auth');
    }

    return (
        <div>
            <nav className={classes.header}>
                {props.pageheader ? <span className={classes.pageheader}>{props.pageheader}</span> : ''}
                <div className={classes.profile_photo} onClick={showLogoutHandler}>
                    {showLogout && 
                        <Card 
                            onClick={logoutHandler}
                            className={classes.dropdown}
                        >Logout</Card>
                    }
                    <img className={classes.user} src={dp2} />
                    <span className={classes.arrow}>⌄</span>
                </div>
            </nav>
            <Tabs />
        </div>
    )
}

export default Header;