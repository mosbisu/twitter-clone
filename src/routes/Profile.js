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
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>
                <Link to="/">Log Out</Link>
            </button>
        </>
    );
}
export default Profile;
