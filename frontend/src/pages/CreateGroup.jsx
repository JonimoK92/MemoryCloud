import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreateGroup } from '../store/GroupQuery';
import { useSearchUsers } from '../store/SearchQuery';

export default function CreateGroup() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    const createGroup = useCreateGroup();
    const { data: users } = useSearchUsers(search)
    const navigate = useNavigate();

    console.log("SEARCH =", search);
    console.log("USERS =", users);

    async function handleCreateGroup(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)
        createGroup.mutate(formData, {
            onSuccess: () => {
                navigate("/")
            }
        });
    }
    console.log(users);
    console.log(search);

    return (
        <>
            <h1>Create Group</h1>
            <form onSubmit={handleCreateGroup}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Ajouter des utilisateurs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {users?.users?.map((user) => (
                    <div key={user.id}>
                        {user.name}
                    </div>
                ))}
                <button type="submit">Create</button>
            </form>
        </>

    )
}