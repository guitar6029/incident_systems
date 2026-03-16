<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $fillable = [
        'title',
        'description',
        'severity'
    ];

    public function scopeSeverity($query, $severity)
    {
        return $query->where("severity", $severity);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
