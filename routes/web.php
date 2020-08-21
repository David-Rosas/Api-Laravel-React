<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('content.product');
});

Route::get('/product', 'ProductController@index');
Route::post('/product/add', 'ProductController@store');
Route::put('/product/update', 'ProductController@update');
Route::delete('/product/delete/{id}', 'ProductController@destroy');
