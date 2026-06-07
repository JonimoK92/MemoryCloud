<?php

namespace App\Http\Requests\Group;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class StoreGroupRequest extends FormRequest {
     public function rules(): array
    {
        return [
            'title' => 'required|string',
            'users'=> 'required|array', #users est un tableau
            'users.*' => 'exists:users,id' #chaque élément du tableau doit exister dans users.id
            ];

        
    }
}