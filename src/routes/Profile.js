import React, { useEffect } from "react";
import { authService, dbService } from "../fbase";
import { Link, useNavigate } from "react-router-dom";
import { getDocs, query, collection } from "firebase/firestore";

function Profile({ userObj }) {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate.push("/");
    };
    const getMyTweets = async () => {
        const q = query(
            collection(dbService, "tweets").where(
                "creatorId",
                "==",
                userObj.uid
            )
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    };
    useEffect(() => {
        getMyTweets();
    }, []);
    return (
        <>
            <button onClick={onLogOutClick}>
                <Link to="/">Log Out</Link>
            </button>
        </>
    );
}
export default Profile;
