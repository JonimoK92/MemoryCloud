<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Group;
use App\Http\Requests\Group\StoreGroupRequest;
use App\Services\GroupService;

class GroupController extends Controller {

 public function __construct(
        protected GroupService $groupService
    ) {} 
    /**
     * Display a listing of the resource.
     */
    public function index() {     
        $ownedGroup = auth()->user()->ownedGroup()->get();
        $group = auth()->user()->group()->get();
        return response()->json([
        'data' => [
            'ownedGroup' => $ownedGroup,
            'group' => $group
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGroupRequest $request) {
        $data = $request->validated(); 
        $ownerId = $request->user()->id; 
        return response()->json(
            $this->groupService->store($data,$ownerId)
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        
        $group = Group::where('id', $id)->where(function ($query) {
            $query->where('owner_id', auth()->id())
              ->orWhereHas('users', function ($q) {
                $q->where('users.id', auth()->id());
              });
        })
        ->firstOrFail();

        return response()->json([
            'data' => [
                'group' => $group
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        $data = $request->validated();
         return response()->json(
            $this->groupService->update($data,$id)
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
