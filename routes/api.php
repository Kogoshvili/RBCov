<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{ AuthController, DataController };

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Data
Route::get('/countries', [DataController::class, 'getCountries'])->middleware('auth:sanctum');
Route::post('/statistics', [DataController::class, 'getStatistics'])->middleware('auth:sanctum');
