<?php

namespace App\Http\Requests\Authentification;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class RegisterRequest extends FormRequest {
     public function rules(): array
    {
        return [
            'name' => 'required|min:2',
            'email' => 'required|email|unique:users',// l'email doit être unique dans toute la table users
            'password' => 'required|min:6'
        ];
    }
}