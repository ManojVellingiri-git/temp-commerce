# PowerShell script to generate self-signed staging certificates for Windows / Docker
$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$certDir = Join-Path $scriptDir "..\nginx\certs"
if (!(Test-Path $certDir)) {
    New-Item -ItemType Directory -Path $certDir -Force | Out-Null
}

$opensslPath = "openssl"
if (!(Get-Command openssl -ErrorAction SilentlyContinue)) {
    $gitOpenSsl = "C:\Program Files\Git\usr\bin\openssl.exe"
    if (Test-Path $gitOpenSsl) {
        $opensslPath = $gitOpenSsl
    }
}

Write-Host "Generating self-signed certificate using $opensslPath..."
& $opensslPath req -x509 -nodes -days 365 -newkey rsa:2048 `
  -keyout (Join-Path $certDir "key.pem") `
  -out (Join-Path $certDir "cert.pem") `
  -subj "/C=US/ST=Staging/L=Local/O=FreshCart/OU=Staging/CN=staging.grocery.local" `
  -addext "subjectAltName=DNS:staging.grocery.local,DNS:localhost,IP:127.0.0.1"

Write-Host "Staging SSL certificates successfully created at: $certDir"
