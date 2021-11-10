<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Country;
use App\Models\Statistic;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class DataControllerTest extends TestCase
{
    use WithFaker, DatabaseMigrations;

    protected $token;

    /**
     * Get token
     *
     * @return string
     */
    private function getToken()
    {
        if (!$this->token) {
            $user = $user = User::factory()->create();

            $response = $this->postJson(
                '/api/login',
                [
                    'email' => $user->email ,
                    'password' => 'password',
                ]
            );

            $this->token = $response->json('token');
        }

        return $this->token;
    }

    /**
     * Seed db with statistics and countries
     *
     * @return void
     */
    private function seedDb()
    {
        if (!Country::exists()) {
            Country::factory(10)
            ->has(Statistic::factory()->count(1))
            ->create();
        }
    }

    /**
     * Test Get Countries Success
     *
     * @return void
     */
    public function test_get_countries_success()
    {
        $this->seedDb();

        $response = $this->withHeaders(
            [
                'Accept' => 'application/json',
                'Authorization' => "Bearer {$this->getToken()}"
            ]
        )->getJson('/api/countries');

        $response->assertStatus(200)
            ->assertJson(function (AssertableJson $json) {
                $json->first(function ($json) {
                    $json->has('code')->has('name')->etc();
                });
            });
    }

    /**
     * Test Get Countries Fail: Unauthorized
     *
     * @return void
     */
    public function test_get_countries_fail()
    {
        $response = $this->withHeaders(
            ['Accept' => 'application/json']
        )->getJson('/api/countries');

        $response->assertStatus(401);
    }

    /**
     * Test Get Statistics Success
     *
     * @return void
     */
    public function test_get_statistics_success()
    {
        $this->seedDb();
        $response = $this->withHeaders(
            [
                'Accept' => 'application/json',
                'Authorization' => "Bearer {$this->getToken()}"
            ]
        )->getJson('/api/statistics');

        $response->assertStatus(200)
            ->assertJson(function (AssertableJson $json) {
                $json->has('data.0', function ($json) {
                    $json->has('confirmed')->has('recovered')->has('death')->etc();
                })
                ->etc();
            });
    }

    /**
     * Test Get Statistics Fail: Unauthorized
     *
     * @return void
     */
    public function test_get_statistics_fail()
    {
        $response = $this->withHeaders(
            ['Accept' => 'application/json']
        )->get('/api/statistics');

        $response->assertStatus(401);
    }
}
