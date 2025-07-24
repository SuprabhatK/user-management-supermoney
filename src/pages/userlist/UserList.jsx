import { useEffect, useState } from "react";
import "./userlist.css";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(savedUsers);
    }, []);

    if (users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <section className="user-list__section">
            <h2>User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        {Object.keys(users[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            {Object.values(user).map((val, idx) => (
                                <td key={idx}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default UserList;