<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\GroupController;
use App\Http\Controllers\Api\SearchController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/memories', [MemoryController::class, 'index']);
    Route::post('/memories', [MemoryController::class, 'store']);
    Route::put('/memories/{id}', [MemoryController::class, 'update']);
    Route::delete('/memories/{id}', [MemoryController::class, 'destroy']);

    Route::get('/group', [GroupController::class, 'index']);
    Route::post('/group', [GroupController::class, 'store']);
    Route::post('/group/{id}', [GroupController::class, 'update']);
    Route::delete('/group/{id}', [GroupController::class, 'destroy']);

    Route::get('/search/users', [SearchController::class, 'searchUsers']);
});
