<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Memory;
use App\Models\Group;
use App\Models\Friend;


class User extends Authenticatable {
    /** @use HasFactory<UserFactory> */
    // HasApiTokens permet de crée des tokens
    // HasFactory permet de créer des faux utilisateurs pour les tests
    // Notifiable permet d'envoyer des notifications a l'utilisateur
    use HasApiTokens,HasFactory, Notifiable;

     protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // cache ces champs des réponses JSON et des API
    protected $hidden = [
        'password',
        'remember_token',
    ]; 

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Memories 
    public function memories() {
        return $this->hasMany(Memory::class);
    }

    // Groups

    public function ownedGroup(){
         return $this->hasMany(Group::class, 'owner_id'); // pour récupérer les groupes crées via la clé étrangère owner_id de group
    }
    
     public function group() {
        return $this->belongstoMany(Group::class);
    }

    // Friends

    public function sentFriendRequest(){
        return $this->hasMany(Friend::class, 'user_id');
    }

    public function receivedFriendRequest(){
        return $this->hasMany(Friend::class, 'friend_id');
    }

    public function pending() {
        return $this->sentFriendRequest()->where('status', 'pending');
    }

    public function muted() {
        return $this->sentFriendRequest()->where('status', 'muted');
    }

    public function blockedUser() {
        return $this->sentFriendRequest()->where('status', 'blocked');
    }

    public function blockedByUser() {
        return $this->receivedFriendRequest()->where('status', 'blocked');
    }

    public function rejected() {
        return $this->sentFriendRequest()->where('status', 'rejected');
    }

    public function cancelled() {
        return $this->sentFriendRequest()->where('status', 'cancelled');
    }
    
    public function friends() {
        return $this->sentFriendRequest()->where('status', 'accepted');
    }

    //belongsToMany(
    //related_model,
    //pivot_table,
    //foreign_key_of_current_model,
    //foreign_key_of_related_model
    //)

    //public function friends() {
        //return $this->belongsToMany(
            //User::class,
            //'friends',
            //'user_id',
            //'friend_id'
        //)->wherePivot('status', 'accepted');
    //}

}
