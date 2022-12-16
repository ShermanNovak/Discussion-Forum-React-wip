import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../../firebase/firebase.js";

import AuthContext from "../../store/auth-context";

import classes from "./SideBar.module.css";

const SideBar = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/auth");
  };

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      let loadedCourses = [];

      // hardcoded user filter
      const q = query(collection(db, "courses"), where("user_id", "==", 1));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        loadedCourses.push(doc.data());
      });

      setCourses(loadedCourses);
      console.log(courses);
      setIsLoading(false);
    };

    fetchCourses().catch((error) => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);

      let loadedCategories = [];

      const q = query(
        collection(db, "categories"),
        where("course_code", "==", params.courseCode)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        loadedCategories.push(doc.data());
      });

      setCategories(loadedCategories);
      console.log(categories);
      setIsLoading(false);
    };

    fetchCategories().catch((error) => {
      setIsLoading(false);
    });
  }, [params.courseCode]);

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-3 p-0">
          <div className={`${classes.sidebar} p-3`}>
            {isLoading && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}

            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item dropdown py-0">
                <span
                  className="nav-link dropdown-toggle fw-bold fs-1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 {params.courseCode}
                </span>
                <ul className="dropdown-menu">
                  {courses.map((course) => (
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to={`/${course.course_code}/1`}
                        key={course.course_code}
                      >
                        {course.course_code}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {categories.map((category) => (
                <li className="nav-item">
                  <NavLink
                    className={(navData) =>
                      navData.isActive
                        ? `${classes.nav_isactive} nav-link`
                        : "nav-link"
                    }
                    to={`/${category.course_code}/${category.category_id}`}
                    key={category.category_id}
                  >
                    {category.category_name}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item">
                <span className="nav-link" onClick={logoutHandler}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAApElEQVRIid2UvQ2DMBCFT1E6VsgKGQSWIJXXIspS9JgZKPNRIVnoktwZUzivsk7v3fP92CJ/B6ADIn5EoLUY5CTfMFkMAMioXNVdvIm8qMrgaWJ5ZwA8tHNJA4AX0HgEXgOAEbgfMjC8gwUIqeb0Lfp4Sy+/SIu+8E8dcrqmfXGDRDeYdAcM3pquqr9IxVWJzSJyy2mTiMR9QKsgaERj8vCTVR1WkyZV6XFIVx4AAAAASUVORK5CYII="
                    alt="logout"
                    className="pe-2"
                  />
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-9 p-4">{props.children}</div>
      </div>
    </div>
  );
};

export default SideBar;
