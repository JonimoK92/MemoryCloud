<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService {
    public function login(array $data) {

          $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        Auth::login($user);
        request()->session()->regenerate();

        return [
            'message' => 'Connexion réussie',
            'data' => [
                'user' => $user->makeHidden(['password'])
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

     public function logout() {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return [
            'message' => 'Déconnexion réussie'
        ];
     }
}