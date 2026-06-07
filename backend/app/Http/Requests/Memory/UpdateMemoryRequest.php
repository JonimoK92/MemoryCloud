<?php

namespace App\Http\Requests\Memory;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;


class UpdateMemoryRequest extends FormRequest {
     public function rules(): array
    {
        return [
            //sometimes prends en compte l'élément uniquement si il y a une requête dessus sinon il l'ignore
            'title' => 'sometimes|string', 
            'description' => 'sometimes|nullable|string',
            'media' => 'sometimes|file|mimes:jpeg,jpg,bmp,png,gif,mp4|max:204800',
            'memory_date' => 'sometimes|nullable|date',
            'memory_time' => 'sometimes|nullable|date',
            'location' => 'sometimes|nullable|string',
            //'group_id' => 'nullable'
            ];

        
    }
}