<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
    //segurity request only ajax
    //if(!$request->ajax()) return redirect('/');
       $product = Product::orderBy('id', 'desc')->paginate(3);

       return [
        'pagination' => [
            'total'         => $product->total(),
            'current_page'  => $product->currentPage(),
            'per_page'      => $product->perPage(),
            'last_page'     => $product->lastPage(),
            'from'          => $product->firstItem(),
            'to'            => $product->lastItem(),
        ],
        'product' => $product   
    ];

    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
          //if(!$request->ajax()) return redirect('/');
          $request->validate([
            'nombre_producto' => 'required',
            'referencia' => 'required',
            'precio' => 'required',
            'peso' => 'required',
            'categoria' => 'required',
            'stock' => 'required',
            'fecha_venta' => 'required',
        ]);

          $product = new Product();
          $product->nombre_producto = $request->nombre_producto;
          $product->referencia = $request->referencia;
          $product->precio = $request->precio;
          $product->peso = $request->peso;
          $product->categoria = $request->categoria;
          $product->stock = $request->stock;
          $product->fecha_venta = $request->fecha_venta;       
          $product->save(); 
      
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
       // if(!$request->ajax()) return redirect('/');
        //return $request;
        $request->validate([
            'nombre_producto' => 'required',
            'referencia' => 'required',
            'precio' => 'required',
            'peso' => 'required',
            'categoria' => 'required',
            'stock' => 'required',
            'fecha_venta' => 'required',
        ]);
        
        $product  = Product::findOrFail($request->id);      
        $product->nombre_producto = $request->nombre_producto;
        $product->referencia = $request->referencia;
        $product->precio = $request->precio;
        $product->peso = $request->peso;
        $product->categoria = $request->categoria;
        $product->stock = $request->stock;
        $product->fecha_venta = $request->fecha_venta;       
        $product->save(); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {      
          
        $product = Product::find($id);        
        $product->delete();
       
        
    }
}
