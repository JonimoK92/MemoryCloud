<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthService {
    public function login(array $data) {
        $user= User::where('email', $data['email'])->first();
        
        // vérifie si l'utilisateur existe et si le mot de passe est le bon
        // Hash::check permet de compare les version hashé des 2 mots de passe
        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
            'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }
        
        // crée un token d'authification pour l'utilisateur
        $token = $user->createToken('api-token')->plainTextToken;

        return [
            'message' => 'Connexion réussie',
            'data' => [
                'token' => $token,
                'user' => $user->makeHidden(['password']) // renvoie l'utilisateur sans le password
            ]
        ];
    }

    public function register(array $data) {
        // création de l'utilisateur
        $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']), // transforme le mot de passe en version sécurité (hashé) avant de le stocker
            ]);

            // event(new UserRegistered($user));

             return [
                'message' => 'Création du compte',
                'data' => [
                    'user' => $user->makeHidden(['password'])
                    ]
                ];
    }
}