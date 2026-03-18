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
        $allowedSorts = ['created_at', 'severity', 'status'];
        $allowedDirection = ['asc', 'desc'];
        $allowedPerPage = [10, 20, 50, 100];

        $sort = in_array($request->sort, $allowedSorts)
            ? $request->sort : 'created_at';
        $direction = in_array($request->direction, $allowedDirection)
            ? $request->direction : 'desc';
        $perPageInput = (int) $request->query('per_page');
        $perPage = in_array($perPageInput, $allowedPerPage)
            ? $perPageInput : 10;

        return Incident::query()
            ->when($request->severity, fn($q) => $q->severity($request->severity))
            ->when($request->user_id, fn($q) => $q->where('user_id', $request->user_id))
            ->orderBy($sort, $direction)
            ->paginate($request->query($perPage));
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
