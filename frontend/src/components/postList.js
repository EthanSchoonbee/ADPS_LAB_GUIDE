import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import "./postList.css";

const Post = (props) => {
    return (
        <tr>
            <td>{props.post.user}</td>
            <td>{props.post.content}</td>
            <td>
                {props.post.image && (
                    <img
                        src={`data:image/jpeg;base64,${props.post.image}`}
                        alt="Post Image"
                        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                    />
                )}
            </td>
            <td>
                <button className="btn btn-link"
                    onClick={() => {
                        props.deletePost(props.post._id);
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default function PostList() {
    const [posts, setPosts] = useState([]);

    // Fetch posts from the database
    useEffect(() => {
        async function getPosts() {
            const token = localStorage.getItem("jwt");
            const response = await fetch('https://localhost:3001/post/', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
            console.log('data: ',response);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const posts = await response.json();

            if (!posts) {
                window.alert("No data found!");
            }
            setPosts(posts);
        }

        getPosts();

        return;
    }, [posts.length]); // Only run once on mount

    // Delete a post
    async function deletePost(id) {
        const token = localStorage.getItem("jwt");
        await fetch(`https://localhost:3001/post/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const newPosts = posts.filter((el) => el._id !== id);
        setPosts(newPosts);
    }

    // Map out the posts
    function PostList() {
        return posts.map((post) => {
            return (
                <Post
                    post={post}
                    deletePost={() => deletePost(post._id)}
                    key={post._id}
                />
            );
        });
    }

    return (
        <body>
            <div className="container">
                <h3 className="header">ADPS Notice Board</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Caption</th>
                            <th>Image</th>
                            <th>Actions</th> {/* Added column for actions */}
                        </tr>
                    </thead>
                    <tbody>{PostList()}</tbody>
                </table>
            </div>
        </body>
    );
}


   