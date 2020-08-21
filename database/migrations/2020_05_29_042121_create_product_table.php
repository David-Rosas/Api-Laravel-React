<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->integerIncrements('id');
            $table->string('nombre_producto',200);
            $table->integer('referencia')->unique();
            $table->integer('precio');
            $table->integer('peso');
            $table->string('categoria', 100);
            $table->integer('stock');
            $table->dateTime('fecha_venta', 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
}
