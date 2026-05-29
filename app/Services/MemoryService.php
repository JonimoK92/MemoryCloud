<?php

namespace App\Services;

use App\Models\Memory;
use Illuminate\Support\Facades\Hash;
use Cloudinary\Cloudinary;

class MemoryService {
    public function store(array $data, $userId) {


        if (!isset($data['media'])) {
            throw new \Exception("Fichier manquant");
        }

        $file = $data['media'];

        if (!$file instanceof \Illuminate\Http\UploadedFile) {
            throw new \Exception("Fichier invalide");
        }

        $cloudinary = new Cloudinary();

        $uploadedFile = $cloudinary->uploadApi()->upload(
            $file->getPathname(),
            [
                'folder' => 'memories'
            ]
        );
        // Stocke le fichier uploadé dans storage/app/public/memories et récupère son chemin relatif
        //path = $file->store('memories', 'public');

        //Crétion du souvenir dans la base de donnée
        $memory = Memory::create([
            'title' => $data['title'], // prends la valeur title dans data et met la dans la colonne title
            'description' => $data['description'] ?? null, // si description existe (et n'est pas null) prend sa valeur sinon met null
            'media' => $uploadedFile['secure_url'],
            'memory_date' => $data['memory_date'] ?? null,
            'memory_time' => $data['memory_time'] ?? null,
            'location' => $data['location'] ?? null,
            'user_id' => $userId,
        ]);

        // event(new MemoryRegistered($memory));

        // retourne une réponse en json
        return [
            'message' => 'Création du souvenir',
            'data' => [
                'memory' => $memory
            ]
        ];
    }

    public function update(array $data, $memoryId) {
        
        $memory = Memory::where('id', $memoryId)
        ->where('user_id', auth()->id())
        ->firstOrFail();

        $cloudinary = new Cloudinary();

        // on vérifie si le fichier a été modifié et si c'est un fichier uploadé valide avant de le stocker
        if (isset($data['media']) && $data['media'] instanceof \Illuminate\Http\UploadedFile) {

            $file = $data['media']; 

            $uploadedFile = $cloudinary->uploadApi()->upload(
                $file->getPathname(),
                [
                    'folder' => 'memories'
                ]
            );

            $data['media'] = $uploadedFile['secure_url'];
        } else {
            unset($data['media']);
        }
        $memory->update($data);

        return [
            'message' => 'Souvenir mis à jour',
            'data' => [
                'memory' => $memory
            ]
        ];
    }
}