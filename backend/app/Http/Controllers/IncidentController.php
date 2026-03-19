<?php

namespace App\Http\Controllers;

use App\Enums\IncidentStatus;
use App\Enums\IncidentSeverity;
use App\Models\Incident;
use App\Services\IncidentService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

class IncidentController extends Controller
{
    use AuthorizesRequests;

    public function __construct(private IncidentService $service) {}

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
            ->paginate($perPage);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'severity' => ['sometimes', new Enum(IncidentSeverity::class)],
            'status' => ['sometimes', new Enum(IncidentStatus::class)]
        ]);

        $incident = $this->service->create($request->user(), $validated);

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
        $this->authorize('update', $incident);
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|sometimes|string',
            'severity' => ['sometimes', new Enum(IncidentSeverity::class)],
            'status' => ['sometimes', new Enum(IncidentStatus::class)]
        ]);

        $incident = $this->service->update($incident, $validated);

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
