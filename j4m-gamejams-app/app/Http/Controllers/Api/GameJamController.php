<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameJam;
use Illuminate\Http\Request;

class GameJamController extends Controller
{
    public function index()
    {
        $official = Gamejam::where('type', 'official')->orderBy('start_date')->take(3)->get();
        $open = GameJam::where('type', 'open')->orderBy('start_date')->get();

        return response()->json([
            'official' => $official,
            'open' => $open
        ]);
    }
}
