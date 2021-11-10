<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\QueryException;
use Illuminate\Http\Client\RequestException;
use App\Models\Country;

class GetCountries extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rbcov:countries';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get countries';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $response = Http::get(env('API_COUNTRIES'));

        if ($response->successful()) {
            $countries = $response->collect()
                ->map(
                    function ($item, $key) {
                        return [
                            'code' => $item['code'],
                            'name' => json_encode($item['name']),
                        ];
                    }
                );

            try {
                Country::upsert(
                    $countries->toArray(),
                    ['code'],
                    ['name']
                );
            } catch (QueryException $e) {
                $this->error('Something went wrong (DB)');
                return Command::FAILURE;
            }

            $this->line('Countries imported successfully');
            return Command::SUCCESS;
        }

        $this->error('Something went wrong (API)');
        return Command::FAILURE;
    }
}
