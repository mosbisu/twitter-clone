import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";

function Home({ userObj }) {
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        onSnapshot(
            query(
                collection(dbService, "tweets"),
                orderBy("createdAt", "desc")
            ),
            (snapshot) => {
                const tweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTweets(tweetArray);
            }
        );
    }, []);
    return (
        <div className="container">
            <TweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweetObj={tweet}
                        isOwner={tweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}
export default Home;
