<?php

use App\Models\Guest;
use App\Models\Rsvp;

beforeEach(function () {
    Rsvp::query()->delete();
    Guest::query()->delete();
});

test('public invitation accepts a guest name and protects the response from referrer and cache exposure', function () {
    Guest::factory()->create(['name' => 'Ibu Sari']);

    $response = $this->get(route('undangan', ['to' => 'Ibu Sari']));

    $response->assertOk()
        ->assertHeader('Referrer-Policy', 'no-referrer')
        ->assertHeader('Cache-Control', 'no-store, private')
        ->assertHeader('X-Robots-Tag', 'noindex, nofollow');
    $response->assertInertia(fn ($page) => $page
        ->component('undangan/index')
        ->where('guestName', 'Ibu Sari'));
});

test('guest links resolve to the public invitation', function () {
    $guest = Guest::factory()->create(['name' => 'Bapak Andi']);

    $response = $this->get($guest->getInvitationUrl())->assertOk();
    expect($response->inertiaProps('guestName'))->toBe('Bapak Andi');
});

test('public visitors cannot access guest and RSVP management', function () {
    $this->get(route('guests.index'))->assertRedirect(route('login'));
    $this->get(route('rsvps.index'))->assertRedirect(route('login'));
    $this->post(route('guests.store'), ['name' => 'Tamu Baru'])
        ->assertRedirect(route('login'));

    $this->assertDatabaseCount('guests', 0);
});

test('invitation treats markup in a guest name as text', function () {
    $name = '<script>alert(1)</script>';
    Guest::factory()->create(['name' => $name]);

    $this->get(route('undangan', ['to' => $name]))
        ->assertOk()
        ->assertDontSee($name, false);

    $response = $this->get(route('undangan', ['to' => $name]));
    expect($response->inertiaProps('guestName'))->toBe($name);
});

test('invitation treats public wish names and messages as text', function () {
    Guest::factory()->create(['name' => 'Ibu Sari']);
    $name = '<img src=x onerror=alert(1)>';
    $message = '<script>alert(2)</script>';
    Rsvp::factory()->create(['name' => $name, 'message' => $message]);

    $response = $this->get(route('undangan', ['to' => 'Ibu Sari']))->assertOk();

    $response->assertDontSee($name, false)->assertDontSee($message, false);
    expect($response->inertiaProps('rsvps.0.name'))->toBe($name);
    expect($response->inertiaProps('rsvps.0.message'))->toBe($message);
});

test('invitation returns a custom 404 for unknown or missing guests', function () {
    $this->get(route('undangan'))
        ->assertNotFound()
        ->assertInertia(fn ($page) => $page->component('undangan/not-found'));

    $this->get(route('undangan', ['to' => 'Nama Asal']))
        ->assertNotFound()
        ->assertHeader('Referrer-Policy', 'no-referrer')
        ->assertHeader('Cache-Control', 'no-store, private')
        ->assertInertia(fn ($page) => $page->component('undangan/not-found'));
});

test('invitation rejects malformed guest names and does not truncate them into a valid guest', function () {
    Guest::factory()->create(['name' => str_repeat('A', 100)]);

    $this->get('/mengundang?to[]=unexpected')->assertNotFound();
    $this->get(route('undangan', ['to' => str_repeat('A', 150)]))->assertNotFound();
});

test('invitation stops working when the registered guest is deleted', function () {
    $guest = Guest::factory()->create(['name' => 'Bapak Andi']);
    $url = $guest->getInvitationUrl();
    $guest->delete();

    $this->get($url)->assertNotFound();
});

test('invitation shows only the latest hundred wishes while counting all wishes', function () {
    Guest::factory()->create(['name' => 'Ibu Sari']);
    Rsvp::factory()->count(101)->create();

    $response = $this->get(route('undangan', ['to' => 'Ibu Sari']))->assertOk();
    expect($response->inertiaProps('rsvpTotal'))->toBe(101);
    expect($response->inertiaProps('rsvps'))->toHaveCount(100);
});
