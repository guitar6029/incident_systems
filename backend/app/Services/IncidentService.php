<?php

namespace App\Services;

use App\Models\Incident;
use App\Models\User;
use App\Enums\IncidentStatus;

class IncidentService
{

    public function create(User $user, array $data): Incident
    {
        $data['status'] =  $data['status'] ?? IncidentStatus::OPEN;
        return $user->incidents()->create($data);
    }
    public function update(Incident $incident, array $data): Incident
    {
        $incident->update($data);
        return $incident->refresh();
    }
}
