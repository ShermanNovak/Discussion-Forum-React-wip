import classes from './Header.module.css'

import Tabs from './Tabs'
import dp2 from '../../assets/dp2.png'

const Header = props => {
    return (
        <div>
            <nav className={classes.header}>
                {props.pageheader ? <span className={classes.pageheader}>{props.pageheader}</span> : ''}
                <div className={classes.profile_photo}>
                    <img className={classes.user} src={dp2} />
                </div>
            </nav>
            <Tabs 
                selectedTab={props.selectedTab}
                changeSelectedTabHandler={props.changeSelectedTabHandler}
            />
        </div>
    )
}

export default Header;