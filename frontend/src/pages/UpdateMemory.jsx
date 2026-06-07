import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useMemory, useUpdateMemory } from '../store/MemoryQuery';
import '../css/updateMemory.css';


export default function UpdateMemory() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [fileView, setFileView] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, error, data } = useMemory(id);
    const memory = data?.data?.memory

    useEffect(() => {
        if (memory) {
            setTitle(memory.title)
            setDescription(memory.description)
            setFileView(memory.media)
        }
    }, [memory]);
    const updateMemory = useUpdateMemory();

    async function handleUpdateMemory(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);

        if (file) {
            formData.append("media", file);
        }
        updateMemory.mutate({ id, formData }, {
            onSuccess: () => {
                navigate("/")
            }
        });
    }

    return (
        <div className="update_page">

            <div className="update_form">

                <form onSubmit={handleUpdateMemory}>

                    <h3>Modifier le souvenir</h3>

                    <div className="input_box">
                        <label>Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input_box">
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {fileView && (
                        <div className="preview_box">
                            <img
                                src={
                                    fileView.startsWith("blob:")
                                        ? fileView
                                        : `/storage/${fileView}`
                                }
                                alt="preview"
                            />
                        </div>
                    )}

                    <div className="input_box">
                        <label>Changer le fichier</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <button type="submit">
                        Mettre à jour
                    </button>

                </form>

            </div>

        </div>
    );
}