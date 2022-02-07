import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="tweet">
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form
                                onSubmit={onSubmit}
                                className="container tweetEdit"
                            >
                                <input
                                    type="text"
                                    placeholder="Edit yout tweet"
                                    value={newTweet}
                                    required
                                    onChange={onChange}
                                />
                                <input
                                    type="submit"
                                    value="Update Tweet"
                                    className="formBtn"
                                />
                            </form>
                            <span
                                onClick={toggleEditing}
                                className="formBtn cancelBtn"
                            >
                                Cancel
                            </span>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.attachmentUrl && (
                        <img src={tweetObj.attachmentUrl} />
                    )}
                    {isOwner && (
                        <div className="tweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Tweet;
