import { NavLink, useParams } from 'react-router-dom';

import classes from './Tabs.module.css'

const Tabs = props => {
    const params = useParams();

    const COURSES = [
        {   
            course_id: 1,
            course_code: "IS112"
        },
        {
            course_id: 2,
            course_code: "IS113"
        },
        {
            course_id: 3,
            course_code: "COR2100"
        },
        {
            course_id: 4,
            course_code: "COR1305"
        },
        {
            course_id: 5,
            course_code: "COR3001"
        }
    ]

    return (
        <div className={classes.tabline}>
            <div className={classes.tabs}>
                {COURSES.map((course) => (
                    <NavLink 
                        to={`/${course.course_code}`}
                        key={course.course_id}
                        className={(navData) => navData.isActive? `${classes.selected} ${classes.tab}` : classes.tab}
                    >{course.course_code}</NavLink>
                ))}
            </div>
        </div>
    )
}

export default Tabs;