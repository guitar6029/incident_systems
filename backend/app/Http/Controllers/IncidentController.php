<?php

namespace App\Http\Controllers;

use App\Enums\IncidentStatus;
use App\Models\Incident;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class IncidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        return Incident::query()
            ->when($request->severity, fn($q) => $q->severity($request->severity))
            ->when($request->filled('sort'), fn($q) => $q->orderBy($request->sort))
            ->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'severity' => 'required|in:low,medium,high',
            'status' => ['sometimes', new Enum(IncidentStatus::class)]
        ]);

        $validated['status'] = $validated['status'] ?? IncidentStatus::OPEN;

        $incident = $request->user()->incidents()->create($validated);

        return response()->json($incident, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Incident $incident)
    {
        return $incident;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Incident $incident)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Incident $incident)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'severity' => 'in:low,medium,high'
        ]);

        $incident->update($validated);

        return $incident;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Incident $incident)
    {
        //
    }
}
