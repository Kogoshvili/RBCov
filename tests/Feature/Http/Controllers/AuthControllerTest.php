<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use WithFaker, DatabaseMigrations;

    /**
     * Test Registration Success
     *
     * @return void
     */
    public function test_registration_success()
    {
        $response = $this->postJson(
            '/api/register',
            [
                'name' => $this->faker->name,
                'email' => $this->faker->email,
                'password' => $this->faker->password(8),
            ]
        );

        $response->assertStatus(200)
            ->assertJson(['token' => true]);
    }

    /**
     * Test Registration Fail: email wrong format
     *
     * @return void
     */
    public function test_registration_fail()
    {
        $response = $this->postJson(
            '/api/register',
            [
                'name' => $this->faker->name,
                'email' => $this->faker->name,
                'password' => $this->faker->password(8),
            ]
        );

        $response->assertStatus(422);
    }

    /**
     * Test Authorization Success
     *
     * @return void
     */
    public function test_login_success()
    {
        $password = $this->faker->password(8);

        $user = User::factory()->create();

        $response = $this->postJson(
            '/api/login',
            [
                'email' => $user->email,
                'password' => 'password',
            ]
        );

        $response->assertStatus(200)
            ->assertJson(['token' => true]);
    }

    /**
     * Test Authorization Fail: Wrong Credentials
     *
     * @return void
     */
    public function test_login_fail()
    {
        $response = $this->postJson(
            '/api/login',
            [
                'email' => $this->faker->email,
                'password' => $this->faker->password(8),
            ]
        );

        $response->assertStatus(401);
    }
}
