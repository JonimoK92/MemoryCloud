<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Friend;

use App\Http\Requests\Friend\StoreFriendRequest;
use App\Services\FriendService;

class FriendController extends Controller {

    public function __construct(
        protected FriendService $friendService
    ) {}
    
    /**
     * Display a listing of the resource.
     */
    public function index() {

        $user = auth()->user();

        $friends = $user->friends()->get();
        $pending = $user->pending()->get();
        $rejected = $user->rejected()->get();
        $cancelled = $user->cancelled()->get();
        $muted = $user->muted()->get();
        $blockedUser = $user->blockedUser()->get(); 
        $blockedByUser = $user->blockedByUser()->get();

        return response()->json([
            'data' => [
                'friends' => $friends,
                'pending' => $pending,
                'rejected' => $rejected,
                'cancelled' => $cancelled,
                'muted' => $muted,
                'blockedUser' => $blockedUser,
                'blockedByUser' => $blockedByUser
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFriendRequest $request) {
        $data = $request->validated(); 
        $userId = $request->user()->id; 
        return response()->json(
            $this->friendService->store($data,$userId)
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
         $friend = Friend::where(function ($q) use ($userId, $data) {
            $q->where('user_id', $userId)
            ->where('friend_id', $friendId);
        })
            ->orWhere(function ($q) use ($userId, $data) {
            $q->where('user_id', $friendId)
            ->where('friend_id', $userId);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }

    public function search(Request $request) {
              
    }
}
