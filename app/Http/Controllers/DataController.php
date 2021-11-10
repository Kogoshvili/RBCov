<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Statistic;
use Illuminate\Http\Request;

class DataController extends Controller
{
    /**
     * Get List Of Countries
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCountries()
    {
        return Country::all();
    }

    /**
     * Get List Of Statistics
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStatistics()
    {
        return Statistic::paginate(10);
    }
}
