<?php

namespace Database\Factories;

use App\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class StatisticFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'confirmed' => $this->faker->randomNumber(5, false),
            'recovered' => $this->faker->randomNumber(5, false),
            'death' => $this->faker->randomNumber(5, false)
        ];
    }
}
