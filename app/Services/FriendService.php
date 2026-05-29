<?php

namespace App\Services;

use App\Models\Friend;
use Illuminate\Support\Facades\Hash;

class GroupService {
    public function store(array $data, $userId) {
        $friendId = $data['friend_id'];
        
        $relation = Friend::where(function ($q) use ($userId, $data) {
            $q->where('user_id', $userId)
            ->where('friend_id', $friendId);
        })
            ->orWhere(function ($q) use ($userId, $data) {
            $q->where('user_id', $friendId)
            ->where('friend_id', $userId);
        });

        if ((clone $relation)
            ->where('status','pending')
            ->exists()) {
                return [
                    'message' => 'La requête existe déjà',
                ];
            }

        if ((clone $relation)
            ->where('status','accepted')
            ->exists()) {
                return [
                    'message' => 'Cet utilisateur est déjà votre ami',
                ];
            }

        if ((clone $relation)
            ->where('status','blocked')
            ->exists()) {
                return [
                    'message' => 'Vous a bloqué cet utilisateur ou cet utilisateur vous a bloqué',
                ];
            }
        
            if ((clone $relation)
            ->where('status','rejected')
            ->exists()) {
                (clone $relation)
                ->where('status','rejected')
                ->delete();
            }

        $pending = Friend::create([
            'user_id' => $userId, 
            'friend_id' => $friendId,
        ]);

        return [
            'message' => "Demande d'ami envoyé",
            'data' => [
                'pending' => $pending
            ]
        ];
    }
}