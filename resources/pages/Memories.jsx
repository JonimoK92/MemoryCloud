import { useNavigate, Link } from 'react-router-dom';
import { useMemories, useDeleteMemory } from '../store/MemoryQuery';
import '../css/memories.css';

export default function Memories() {
    const { isLoading, error, data } = useMemories();
    const deleteMemory = useDeleteMemory();

    //if (isLoading) return <p>Chargement...</p>;
    //if (isError) return <p>Erreur de chargement</p>;

    // si data existe, essaye d'accéder a data.data, si tu y arrives alors
    // essaye d'accéder a memories, sinon liste vide
    const memories = data?.data?.memories || []
    //const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    return (
        <div className="memories_page">

            <div className="memories_container">

                <h1 className="memories_title">Mes souvenirs</h1>

                {memories.length === 0 ? (
                    <p className="empty">
                        Aucun souvenir pour le moment
                    </p>
                ) : (
                    <div className="memories_grid">

                        {memories.map((memory) => (
                            <div key={memory.id} className="memory_card">

                                {memory.media && (
                                    <img
                                        src={memory.media}
                                        alt="memory"
                                        className="memory_image"
                                    />
                                )}

                                <div className="memory_content">

                                    <h3>Titre : {memory.title}</h3>

                                    <p>Description : {memory.description}</p>

                                    <div className="memory_meta">
                                        <span>{memory.location}</span>
                                        <small>{memory.memory_date}</small>
                                    </div>

                                    <div className="memory_actions">

                                        <Link
                                            to={`/update/memory/${memory.id}`}
                                            className="btn update"
                                        >
                                            Modifier
                                        </Link>

                                        <button
                                            onClick={() => deleteMemory.mutate(memory.id)}
                                            className="btn delete"
                                        >
                                            Supprimer
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}