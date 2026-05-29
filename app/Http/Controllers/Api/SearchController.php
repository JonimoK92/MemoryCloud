<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Memory;
use App\Models\Group;

class SearchController extends Controller
{

    public function searchUsers(Request $request) {
        $search = $request->search;
        
        $users = User::where('name', 'like', '%' . $search . '%')
        ->where('id', '!=', auth()->id())
        ->limit(10)
        ->get();

        return response()->json([
            'users' => $users
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
