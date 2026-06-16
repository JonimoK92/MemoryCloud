import { Link } from 'react-router-dom';
import { useMemories, useDeleteMemory } from '../store/MemoryQuery';
import '../css/memories.css';

export default function Memories() {
    const { isLoading, error, data } = useMemories();
    const deleteMemory = useDeleteMemory();

    const memories = data?.memories || data?.data?.memories || [];

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur de chargement</p>;

    return (
        <div className="memories_page">
            <h1 className="memories_title">Mes souvenirs</h1>

            {memories.length === 0 ? (
                <p className="empty">Aucun souvenir pour le moment</p>
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
                                <div>
                                    <h3>{memory.title}</h3>
                                    <p>{memory.description}</p>
                                </div>

                                <div>
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
                                            onClick={() => {
                                                if (confirm("Supprimer ce souvenir ?")) {
                                                    deleteMemory.mutate(memory.id);
                                                }
                                            }}
                                            disabled={deleteMemory.isPending}
                                            className="btn delete"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}