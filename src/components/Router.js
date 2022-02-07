import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

function AppRouter({ isLoggedIn, userObj, refreshUser }) {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route
                                exact
                                path="/"
                                element={<Home userObj={userObj} />}
                            ></Route>
                            <Route
                                exact
                                path="/profile"
                                element={
                                    <Profile
                                        userObj={userObj}
                                        refreshUser={refreshUser}
                                    />
                                }
                            ></Route>
                        </>
                    ) : (
                        <Route exact path="/" element={<Auth />}></Route>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;
