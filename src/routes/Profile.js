import React, { useState } from "react";
import { authService } from "../fbase";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "@firebase/auth";

function Profile({ userObj, refreshUser }) {
    const navigate = useNavigate();
    const [newDisplayName, setNewdisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate.push("/");
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewdisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateProfile(authService.currentUser, {
            displayName: newDisplayName,
        });
        refreshUser();
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                <Link to="/">Log Out</Link>
            </span>
        </div>
    );
}
export default Profile;
