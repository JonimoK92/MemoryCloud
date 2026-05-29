<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crée 10 utilisateurs aléatoires
        // User::factory(10)->create();

        User::factory()->create([ // génère un faux utilisateur avec des données fake
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
