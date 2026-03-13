<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/products/{id}', [ProductController::class, 'fetchProductById']);
Route::get('/products', [ProductController::class, 'fetchProduct']);

Route::post('/products/create', [ProductController::class, 'create']);
Route::post('/products/update/{id}', [ProductController::class, 'update']);
Route::post('/products/delete/{id}', [ProductController::class, 'delete']);
