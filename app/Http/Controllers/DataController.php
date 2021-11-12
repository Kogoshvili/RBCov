<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Statistic;
use Illuminate\Database\Eloquent\Relations\MorphTo;
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
    public function getStatistics(Request $request)
    {
        $result = Statistic::join('countries', 'countries.id', '=', 'statistics.country_id')
            ->orderBy('code',  $request->country['orderby'] ?? 'asc');

        if ($request->country) {
            if (@$request->country['value']) {
                $langugeCode = preg_match('/[^A-Za-z0-9]/', $request->country['value']) ? 'ge' : 'en';
                $result->whereHas(
                    'country', fn($query) =>
                    $query->where("name->{$langugeCode}", 'ilike', "%{$request->country['value']}%")
                );
            }
        }

        if ($request->confirmed) {
            if (@$request->confirmed['value']) {
                $result->where('confirmed', $request->confirmed['value']);
            }
        }

        if ($request->recovered) {
            if (@$request->recovered['value']) {
                $result->where('recovered', $request->recovered['value']);
            }

            if (@$request->recovered['orderby']) {
                $result->orderBy('recovered', $request->recovered['orderby']);
            }
        }

        if ($request->death) {
            if (@$request->death['value']) {
                $result->where('death', $request->death['value']);
            }

            if (@$request->death['orderby']) {
                $result->orderBy('death', $request->death['orderby']);
            }
        }

        return $result->with('country')->paginate(10);
    }
}
