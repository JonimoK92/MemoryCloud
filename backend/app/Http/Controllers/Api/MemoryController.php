<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Memory;
use App\Http\Requests\Memory\StoreMemoryRequest;
use App\Http\Requests\Memory\UpdateMemoryRequest;
use App\Services\MemoryService;

class MemoryController extends Controller
{
    public function __construct(
        protected MemoryService $memoryService
    ) {} // crée une instance de MemoryService dans ton controller
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // on récupère l'id de l'utilisateur actuellement connecté, get sert a obtenir plusieurs résultat
        // on utilise la colonne user_id de memories pour trouver les souvenirs de cet utilisateur
        $memories = auth()->user()->memories()->get();;
        return response()->json([
        'data' => [
            'memories' => $memories
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMemoryRequest $request) {
        $data = $request->validated(); // récupère les données qui ont passé la validation Laravel
        $userId = $request->user()->id; // récupère l'id de l'utilisateur actuellement connecté
        $data['media'] = $request->file('media'); // récupère le fichier uploadé depuis la requête

        return response()->json(
            $this->memoryService->store($data,$userId)
        );
        // transforme la réponse en json et appelle la méthode store sur l'objet memoryService en lui passant $data et $userId

    }

    /**
     * Display the specified resource.
     */

     public function show(string $id) {
        $memory = auth()->user()->memories()->findOrFail($id); // erreur 404 si rien n'est trouvé contrairement a first qui renvoie null

        return response()->json([
        'data' => [
            'memory' => $memory
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemoryRequest $request, string $id) {
        $data = $request->validated();
        // hasFile vérifie qu'un fichier a bien été envoyer dans le champs média
        if ($request->hasFile('media')) {
            $data['media'] = $request->file('media');
         }

        return response()->json(
            $this->memoryService->update($data,$id)
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        return response()->json(
            $this->memoryService->delete($id)
        );
    }
}
