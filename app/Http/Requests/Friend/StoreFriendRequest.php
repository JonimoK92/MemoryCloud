<?php

namespace App\Http\Requests\Friend;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class StoreFriendRequest extends FormRequest {
     public function rules(): array
    {
        return [
            'friend_id' => 'required|exists:users,id',
        ]; 
    }
}