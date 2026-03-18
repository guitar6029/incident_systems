<?php

namespace App\Providers;

use App\Models\Incident;
use App\Policies\IncidentPolicy;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;


class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Incident::class => IncidentPolicy::class
    ];
    /**
     * Register services.
     */
    public function register(): void
    {
        Gate::policy(Incident::class, IncidentPolicy::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
