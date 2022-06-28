import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Tabs from './Tabs'
import dp2 from '../../assets/dp2.png'
import Button from '../UI/Button'
import AuthContext from '../../store/auth-context';

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
                <div className={classes.profile_photo}>
                    {showLogout && 
                        <Button 
                            onClick={logoutHandler}
                            className={classes.logout}
                        >Logout</Button>
                    }
                    <img onClick={showLogoutHandler} className={classes.user} src={dp2} />
                </div>
            </nav>
            <Tabs />
        </div>
    )
}

export default Header;