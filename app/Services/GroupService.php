<?php

namespace App\Services;

use App\Models\Group;
use Illuminate\Support\Facades\Hash;

class GroupService {
    public function store(array $data, $ownerId) {

         $group = Group::create([
            'title' => $data['title'], 
            'description' => $data['description'] ?? null,
            'owner_id' => $ownerId,
        ]);

        $users = $data['users'] ?? []; #si users existe prend sa valeur sinon tableau vide
        $group->users()->attach($users);

        return $group;
    }
}