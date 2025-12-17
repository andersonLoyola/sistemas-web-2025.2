<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameJam extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'description', 'cover_image', 'type', 'start_date', 'end_date', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'game_jam_user', 'game_jam_id', 'user_id');
    }
}
