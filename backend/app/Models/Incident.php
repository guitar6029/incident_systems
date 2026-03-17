<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\IncidentStatus;

class Incident extends Model
{
    protected $casts = [
        'status' => IncidentStatus::class
    ];

    protected $attributes = [
        'status' => 'open',
    ];

    protected $fillable = [
        'title',
        'description',
        'severity',
        'status'
    ];

    public function scopeSeverity($query, $severity)
    {
        return $query->where("severity", strtolower($severity));
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
