#!/bin/bash
# Generate self-signed SSL/TLS certificates for staging environment
set -e

CERT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../nginx/certs" && pwd)"
mkdir -p "$CERT_DIR"

echo "Generating staging SSL certificates in $CERT_DIR..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$CERT_DIR/key.pem" \
  -out "$CERT_DIR/cert.pem" \
  -subj "/C=US/ST=Staging/L=Local/O=FreshCart/OU=Staging/CN=staging.grocery.local" \
  -addext "subjectAltName=DNS:staging.grocery.local,DNS:localhost,IP:127.0.0.1"

chmod 600 "$CERT_DIR/key.pem"
chmod 644 "$CERT_DIR/cert.pem"
echo "Staging SSL certificates generated successfully:"
echo "  Certificate: $CERT_DIR/cert.pem"
echo "  Private Key: $CERT_DIR/key.pem"
