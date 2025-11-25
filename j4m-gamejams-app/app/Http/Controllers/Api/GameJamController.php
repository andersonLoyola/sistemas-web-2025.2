<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameJam;
use Illuminate\Http\Request;

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
}
