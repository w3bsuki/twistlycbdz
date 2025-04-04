import React from 'react';
import type { Metadata, Viewport } from 'next';
import CheckoutClient from './CheckoutClient';

// Mock crypto payment addresses
const CRYPTO_ADDRESSES = {
  bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  usdc: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  dogecoin: 'D5jFZgsmgYAAk5NAZUcL9pQaUP9qmJWgTF'
};

export const metadata: Metadata = {
  title: 'Checkout | Twistly CBD',
  description: 'Complete your purchase of premium CBD products.',
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
};

export default function CheckoutPage() {
  return <CheckoutClient cryptoAddresses={CRYPTO_ADDRESSES} />;
} 