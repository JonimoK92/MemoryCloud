<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Http\Requests\Authentification\LoginRequest;
use App\Http\Requests\Authentification\RegisterRequest;
use App\Services\AuthService;

class AuthController extends Controller {
     
    public function __construct(
        protected AuthService $authService
    ) {} // crée une instance de Authservice dans mon controller
    
    public function login(LoginRequest $request) {
        $data = $request->validated(); // récupère les données qui ont passé la validation Laravel
         return response()->json(
            $this->authService->login($data)
         ); // transforme la réponse en json et appelle la méthode login sur l'objet authService en lui passant $data
        }

    public function register(RegisterRequest $request) {
            $data = $request->validated();
            return response()->json(
                    $this->authService->register($data)
            );
    }

    public function logout(Request $request) {
            
        //if ($request->user() && $request->user()->currentAccessToken()) {
        //$request->user()->currentAccessToken()->delete();
    //}
        $request->user()->currentAccessToken()->delete(); //supprime le token d'authentification
             
        return response()->json([
                'message' => 'Déconnexion'
            ]);
    } 
}

