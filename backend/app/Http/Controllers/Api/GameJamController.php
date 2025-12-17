<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\GameJam;

class GameJamController extends Controller
{
    public function index()
    {
        $official = GameJam::where('type', 'official')->orderBy('start_date')->take(3)->get();
        $open = GameJam::where('type', 'open')->orderBy('start_date')->get();

        return response()->json([
            'official' => $official,
            'open' => $open
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:official,open',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $jam = $request->user()->gamejams()->create($validated);

        return response()->json($jam, 201);
    }

    public function show($id)
    {
        $jam = GameJam::with('user')->withCount('participants')->findOrFail($id);

        $isJoined = false;
        if (Auth::guard('sanctum')->check()) {
            $isJoined = $jam->participants()->where('user_id', Auth::guard('sanctum')->id())->exists();
        }

        return response()->json([
            'jam' => $jam,
            'is_joined' => $isJoined
        ]);
    }

    public function join($id)
    {
        $jam = GameJam::findOrFail($id);
        $user = Auth::guard('sanctum')->user();

        $jam->participants()->syncWithoutDetaching([$user->id]);
        return response()->json(['message' => 'Inscrição realizada com sucesso!']);
    }
}
