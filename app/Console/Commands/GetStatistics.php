<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\QueryException;
use Illuminate\Http\Client\RequestException;
use App\Models\Country;
use App\Models\Statistic;

class GetStatistics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rbcov:statistics';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get statistics';

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
        $data = [];
        if (Country::exists()) {
            foreach (Country::lazy() as $country) {
                $this->info("Retrieving {$country->code} Statistics");

                $response = Http::post(
                    env('API_STATISTICS'),
                    ['code' => $country->code]
                );

                if ($response->successful()) {
                    $data[] = [
                        'country_id' => $country->id,
                        'confirmed' => $response->json('confirmed'),
                        'recovered' => $response->json('recovered'),
                        'death' => $response->json('deaths'),
                        'date' => \Carbon\Carbon::now()
                    ];
                }
            }

            try {
                Statistic::upsert(
                    $data,
                    ['country_id', 'date'],
                    ['confirmed', 'recovered', 'death']
                );
            } catch (QueryException $e) {
                $this->error("Something went wrong: {$e->getMessage()}");
                return Command::FAILURE;
            }

            $this->line('Statistics imported successfully');
            return Command::SUCCESS;
        }

        $this->error('Countries Table is empty');
        return Command::FAILURE;
    }
}
