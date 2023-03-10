import jwtDecode from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IMAGE_BASEURL } from "../../constants/baseURL";
import { selectLoggedInUser } from "../../redux/features/authSlice";

const ProfileDetails = () => {
  const { user, accessToken } = useSelector(selectLoggedInUser);
  const { UserInfo } = jwtDecode(accessToken);

  return (
    <section className="user-dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="dashboard-wrapper dashboard-user-profile">
              <div className="media">
                <div className="pull-left text-center">
                  <img
                    className="media-object user-img"
                    src={IMAGE_BASEURL + user.avatar.url}
                    alt=""
                  />
                </div>
                <div className="media-body mb-4">
                  <ul className="user-profile-list">
                    <li>
                      <span>Full Name:</span> {user.name}
                    </li>
                    <li>
                      <span>Role:</span>
                      {UserInfo.roles}
                    </li>
                    <li>
                      <span>Email:</span>
                      {UserInfo.email}
                    </li>
                    <li>
                      <span>Joined Date:</span>
                      {String(user.createdAt).substr(0, 10)}
                    </li>
                  </ul>
                </div>
                <div className=" d-flex justify-content-around">
                  <Link to="/me/update" className=" btn2">
                    Change Profile
                  </Link>
                  <Link to="/password/update" className=" btn2">
                    Change Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
