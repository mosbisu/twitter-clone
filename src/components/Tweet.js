import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

function Tweet({ tweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const TweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm(
            "Are you sure you want to delete this tweet?"
        );
        if (ok) {
            await deleteDoc(TweetTextRef);
            await deleteObject(ref(storageService, tweetObj.attachmentUrl));
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(TweetTextRef, {
            text: newTweet,
        });
        setEditing(false);
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewTweet(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    placeholder="Edit yout tweet"
                                    value={newTweet}
                                    required
                                    onChange={onChange}
                                />
                                <input type="submit" value="Update Tweet" />
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img
                            src={tweetObj.attachmentUrl}
                            width="50px"
                            height="50px"
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Tweet
                            </button>
                            <button onClick={toggleEditing}>Edit Tweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Tweet;
