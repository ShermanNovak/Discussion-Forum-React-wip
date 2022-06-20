import classes from './Content.module.css'

const Content = props => {
    return (
        <div className={classes.content}>
            <span className={classes.page_title}>{props.pageTitle}</span>
            {props.children}
        </div>
    )
}

export default Content;