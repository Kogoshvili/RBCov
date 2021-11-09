<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'code'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'array'
    ];

    public function statistics()
    {
        return $this->hasMany(Statistic::class);
    }
}
