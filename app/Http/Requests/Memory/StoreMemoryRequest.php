<?php

namespace App\Http\Requests\Memory;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class StoreMemoryRequest extends FormRequest {
     public function rules(): array
    {
        return [
            // required veut dire que le champs DOIT exister et ne peut pas être null
            // nullable veut dire que la valeur peut être null, elle sera accepté quand même
            'title' => 'required|string',
            'description' => 'nullable|string',
            // mimes spécifie le type de fichier autorisé et on limite leur taille a 20480KB max
            'media' => 'required|file|mimes:jpeg,jpg,bmp,png,gif,mp4|max:204800',
            'memory_date' => 'nullable',
            'memory_time' => 'nullable',
            'location' => 'nullable|string',
            ];

        
    }
}