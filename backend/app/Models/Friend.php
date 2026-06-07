<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Friend extends Model
{
    public function user(){
        return $this->belongsTo(User::class);
    }

     public function friend(){
        return $this->belongsTo(User::class, 'friend_id');
    }
}
