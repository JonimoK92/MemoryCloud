<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('memories', function (Blueprint $table) { 
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('media');
            $table->string('media_id');
            $table->date('memory_date')->nullable();
            $table->time('memory_time')->nullable();
            $table->string('location')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            //$table->foreignId('group_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    // id = clé primaire, foreignId = clé étrangère, 
    // constrained = cette clé étrangère est lié a une table
    // onDelete('cascade') = si la clé parent parent est supprimé on supprime tout
    // nullOnDelete() = la suppression de la clé parent n'affecte/ne supprime pas les memories associés
    // timestamps ajoute created_at et update_at

    // string = text court (255 varchar max), text = texte long,
    // date = stocke uniquement en tant que date, time = stocke uniquement en heure
    // nullable = champs qui peut être vide (null)


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::dropIfExists('memories');
    }
};
