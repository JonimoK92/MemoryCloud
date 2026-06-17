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

        //Création du souvenir dans la base de donnée
        $memory = Memory::create([
            'title' => $data['title'], // prends la valeur title dans data et met la dans la colonne title
            'description' => $data['description'] ?? null, // si description existe (et n'est pas null) prend sa valeur sinon met null
            'media' => $uploadedFile['secure_url'],
            'media_id' => $uploadedFile['public_id'],
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

    public function update(array $data, $memoryId)  {
        $memory = Memory::where('id', $memoryId)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $cloudinary = new Cloudinary();

        if (isset($data['media']) && $data['media'] instanceof \Illuminate\Http\UploadedFile) {

            $file = $data['media'];

            if (!empty($memory->media_id)) {
                try {
                    $cloudinary->uploadApi()->destroy($memory->media_id);
            } catch (\Exception $e) {
            }
        }

            $uploadedFile = $cloudinary->uploadApi()->upload(
                $file->getPathname(),
                [
                    'folder' => 'memories'
                ]   
            );


            $data['media'] = $uploadedFile->getSecureUrl();
            $data['media_id'] = $uploadedFile->getPublicId();


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
    public function delete($memoryId) {
        $memory = Memory::where('id', $memoryId)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $cloudinary = new Cloudinary();

        if (!empty($memory->media_id)) {
            try {
            $cloudinary->uploadApi()->destroy($memory->media_id);
        } catch (\Exception $e) {
        // log mais ne bloque pas suppression DB
        }
    }

        $memory->delete();

        return [
            'message' => 'Supprimé avec succès'
        ];
    }
}