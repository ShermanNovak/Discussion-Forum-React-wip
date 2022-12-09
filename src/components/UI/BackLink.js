import { Link } from 'react-router-dom';

import classes from './BackLink.module.css'

const BackLink = props => {
    return (
        <Link to={props.to} className={classes.back}>
            {props.children}
        </Link>
    );
};

export default BackLink;