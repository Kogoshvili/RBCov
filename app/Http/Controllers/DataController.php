<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class DataController extends Controller
{
    /**
     * List of properties that can be used to filter statistics.
     *
     * @var array
     */
    private $filterable = [
        'country',
        'confirmed',
        'recovered',
        'death'
    ];

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
        $lang = App::currentLocale();
        $result = Statistic::join('countries', 'countries.id', '=', 'statistics.country_id')
            ->where('date', \Carbon\Carbon::now()->toDateString());

        if ($request->has('orderby')) {
            $result->orderBy(
                $request->orderby['orderby'] === 'country'
                    ? "name->{$lang}" : $request->orderby['orderby'],
                $request->orderby['direction']
            );
        } else {
            $result->orderBy("name->{$lang}", 'desc');
        }

        foreach($request->only($this->filterable) as $key => $value) {
            if ($key === 'country') {
                $result->whereHas(
                    'country', fn($query) =>
                    $query->whereRaw(
                        'LOWER(`name`->>"$.'.$lang.'") LIKE ?',
                        [strtolower($value).'%']
                    )
                );
                continue;
            }

            $result->where($key, $value);
        }

        return $result->with('country')->paginate(10);
    }
}
