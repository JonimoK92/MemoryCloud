import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

        console.log(file);
        console.log(file?.type);

        if (!file) {
            alert("Fichier obligatoire");
            return;
        }

        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)
        formData.append("media", file)
        createMemory.mutate(formData, {
            onSuccess: () => {
                navigate("/")
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
                            placeholder="Titre du souvenir"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_box">
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_box">
                        <label>Fichier</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                    </div>

                    <button type="submit">
                        Créer
                    </button>

                </form>

            </div>

        </div>
    );
}