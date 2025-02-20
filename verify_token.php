<?php
header('Content-Type: application/json');

// Daftar token valid
$validTokens = [
    'https://qrfy.io/r/f3Kg7YdeJ1.com',
    'https://example.com/token/new-valid-token-3', // Tambahkan token baru di sini
    'https://example.com/token/new-valid-token-4', // Tambahkan token baru di sini
    'https://example.com/token/example-token-5',   // Contoh token baru
    'https://example.com/token/example-token-6',   // Contoh token baru
    'https://example.com/token/example-token-7',   // Contoh token baru
    'https://example.com/token/example-token-8'    // Contoh token baru
];

$token = $_POST['token'];

$response = ['valid' => in_array($token, $validTokens)];

echo json_encode($response);
?>