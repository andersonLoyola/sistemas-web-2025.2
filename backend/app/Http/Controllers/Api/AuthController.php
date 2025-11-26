<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
	public function register(Request $request)
	{
		$request->validate([
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|max:255|unique:users',
			'password' => 'required|string|min:8',
			'role' => 'required|in:user,company'
		]);

		$user = User::create([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password),
			'role' => $request->role
		]);

		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'data' => $user,
			'access_token' => $token,
			'token_type' => 'Bearer'
		]);
	}

	public function login(Request $request)
	{
		if(!Auth::attempt($request->only('email', 'password'))) {
			return response()->json([
				'message' => 'Login inválido'
			], 401);
		}

		$user = User::where('email', $request['email'])->firstOrFail();
		$token = $user->createToken('auth_token')->plainTextToken;

		return response()->json([
			'message' => 'Login realizado com sucesso', 
			'access_token' => $token,
			'token_type' => 'Bearer',
			'user' => $user
		]);
	}

	public function logout()
	{
		auth()->user()->tokens()->delete();
		return response()->json(['message' => 'Deslogado com sucesso']);
	}
}
