<?php

namespace App\Enums;

enum IncidentSeverity: string
{
    case LOW = 'low';
    case MEDIUM = 'medium';
    case HIGH = 'high';
}
