<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Memory;

class Group extends Model
{
    public function owner() {
        return $this->belongsTo(User::class, 'owner_id'); // pour récupérer le créateur du groupe vient la clé étrangère owner_id
    }

    public function users(){
        return $this->belongsToMany(User::class);
    }

    public function memories() {
        return $this->hasMany(Memory::class);
    }
}
