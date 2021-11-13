<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(
            'statistics',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('country_id');
                $table->integer('confirmed');
                $table->integer('recovered');
                $table->integer('death');
                $table->date('date');
                $table->unique(['country_id', 'date']);
            }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statistics');
    }
}
