import classes from './Tabs.module.css'

const Tabs = props => {

    const COURSES = [
        {   
            course_id: 1,
            course: "IS112"
        },
        {
            course_id: 2,
            course: "IS113"
        },
        {
            course_id: 3,
            course: "COR2100"
        },
        {
            course_id: 4,
            course: "COR1305"
        },
        {
            course_id: 5,
            course: "COR3001"
        }
    ]

    return (
        <div className={classes.tabline}>
            <div className={classes.tabs}>
                {COURSES.map((course) => (
                    <a 
                        key={course.course_id}
                        data-courseid={course.course_id}
                        className={`${classes.tab} ${props.selectedTab === course.course ? classes.selected : ''}`}
                        onClick={props.changeSelectedTabHandler}
                    >{course.course}</a>
                ))}
            </div>
        </div>
    )
}

export default Tabs;