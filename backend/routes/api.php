<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameJamController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/gamejams', [GamejamController::class, 'index']);

// rotas protegidas
Route::middleware('auth:sanctum')->group(function () {
	Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/gamejams', [GamejamController::class, 'store']);
	Route::get('/user', function (Request $request) {
		return $request->user();
	});
});


