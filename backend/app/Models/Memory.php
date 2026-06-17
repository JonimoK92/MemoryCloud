<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Group;


class Memory extends Model {
     protected $fillable = [
        'title',
        'description',
        'media',
        'media_id',
        'memory_date',
        'memory_time',
        'location',
        'user_id',
        //'group_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function group() {
        return $this->belongsto(Group::class);
    }
}
