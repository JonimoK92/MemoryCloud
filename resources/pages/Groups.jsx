import { useNavigate, Link } from 'react-router-dom';
import { useGroups, useDeleteGroup } from '../store/GroupQuery';

export default function Groups() {
    const { isLoading, error, data } = useGroups();
    const deleteGroup = useDeleteGroup();

    //if (isLoading) return <p>Chargement...</p>;
    //if (isError) return <p>Erreur de chargement</p>;

    // si data existe, essaye d'accéder a data.data, si tu y arrives alors
    // essaye d'accéder a groups, sinon liste vide
    const groups = data?.data?.groups || []
    return (
        <div>
            <h1>Mes souvenirs</h1>

            {groups.length === 0 ? (
                <p>Aucun souvenir pour le moment</p>
            ) : (
                <div style={{ display: "grid", gap: "20px" }}>
                    {groups.map((group) => (

                        <div key={group.id} style={{ border: "1px solid #ccc", padding: "10px" }}>

                            <h3>Titre : {group.title}</h3>
                            <p>Description : {group.description}</p>
                            <button onClick={() => deleteGroup.mutate(group.id)}>
                                Supprimer
                            </button>
                            <Link to={`/update/group/${group.id}`}>
                                Update
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}