import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateMemory } from '../store/MemoryQuery';
import '../css/createMemory.css';

export default function CreateMemory() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    const createMemory = useCreateMemory();
    const navigate = useNavigate();

    async function handleCreateMemory(event) {
        event.preventDefault();

        if (!title.trim() || !description.trim()) return;
        if (!file) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("media", file);

        createMemory.mutate(formData, {
            onSuccess: () => {
                setTitle("");
                setDescription("");
                setFile(null);
                navigate("/");
            }
        });
    }

    return (
        <div className="memory_page">
            <div className="memory_form">

                <form onSubmit={handleCreateMemory}>

                    <h3>Créer un souvenir</h3>

                    <p className="separator">
                        <span></span>
                    </p>

                    <div className="input_box">
                        <label>Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="input_box">
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="input_box">
                        <label>Fichier</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <button type="submit">
                        {createMemory.isPending ? "Création..." : "Créer"}
                    </button>

                </form>

            </div>
        </div>
    );
}