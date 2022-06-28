import { Link, useParams } from 'react-router-dom';

import classes from './Tabs.module.css'

// to fix link styling

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
                    <Link 
                        to={`/${course.course_code}`}
                        key={course.course_id}
                        className={`${classes.tab} ${params.courseCode === course.course_code ? classes.selected : ''}`}
                    >{course.course_code}</Link>
                ))}
            </div>
        </div>
    )
}

export default Tabs;