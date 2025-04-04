'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck,
  ArrowRight,
  Copy,
  Bitcoin,
  Check
} from 'lucide-react';
import React from 'react';
import type { Metadata, Viewport } from 'next';

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
  const { items, itemCount, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('credit-card');
  const [cryptoCurrency, setCryptoCurrency] = useState<string>('bitcoin');
  const [cryptoAddressCopied, setCryptoAddressCopied] = useState(false);
  
  // For backward compatibility
  const totalItems = itemCount || 0;
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    sameShipping: true,
    saveInfo: false,
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
    cryptoTransactionId: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // Calculate cart values
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = (subtotal || 0) * 0.08; // Assuming 8% tax rate
  const discount = 0; // Placeholder for discount logic
  const total = (subtotal || 0) + shipping + tax - discount;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!items?.length) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    // Verify crypto transaction ID if paying with crypto
    if (paymentMethod === 'crypto' && !formData.cryptoTransactionId) {
      toast({
        title: "Transaction ID required",
        description: "Please enter the transaction ID from your crypto payment.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart();
      
      toast({
        title: "Order completed",
        description: "Your order has been successfully placed! Thank you for your purchase.",
      });
      
      // Redirect to success page
      window.location.href = '/checkout/success';
    }, 2000);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCryptoAddressCopied(true);
    toast({
      title: "Address copied",
      description: "Crypto address copied to clipboard.",
    });
    
    setTimeout(() => {
      setCryptoAddressCopied(false);
    }, 3000);
  };
  
  // Calculate crypto prices
  const [cryptoPrices, setCryptoPrices] = useState({
    bitcoin: 0.00,
    ethereum: 0.00,
    usdc: 0.00,
    dogecoin: 0.00
  });
  
  // Mock function to simulate getting crypto rates
  useEffect(() => {
    // In a real app, you would fetch real-time conversion rates from an API
    setCryptoPrices({
      bitcoin: +((subtotal || 0) / 62000).toFixed(8),
      ethereum: +((subtotal || 0) / 3500).toFixed(6),
      usdc: +(subtotal || 0).toFixed(2),
      dogecoin: +((subtotal || 0) / 0.15).toFixed(2)
    });
  }, [subtotal]);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6 sm:py-10">
        <Link 
          href="/shop" 
          className="inline-flex items-center mb-5 sm:mb-8 text-sm font-medium text-gray-600 hover:text-green-700"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Shop
        </Link>
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">Checkout</h1>
        
        {!items?.length ? (
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some products to your cart and come back to complete your purchase.
            </p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Main checkout form - Mobile (Top) / Desktop (Left) */}
            <div className="lg:col-span-8 lg:order-1 order-2">
              <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6">
                {/* Checkout progress indicator */}
                <nav aria-label="Checkout process" className="mb-6 sm:mb-8">
                  <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base" role="list">
                    <li className="flex md:w-full items-center text-green-600 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-green-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10">
                      <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        <span className="mr-2">1</span> Cart 
                        <Check className="w-4 h-4 ml-2 hidden sm:inline-block" aria-hidden="true" />
                      </span>
                    </li>
                    <li className="flex md:w-full items-center text-green-600 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10" aria-current="step">
                      <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        <span className="mr-2">2</span> Details
                        <span className="hidden sm:inline-block w-4 h-4 ml-2 bg-green-600 rounded-full" aria-hidden="true"></span>
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">3</span> Confirmation
                    </li>
                  </ol>
                </nav>
                
                <form onSubmit={handleSubmit} aria-describedby="checkout-error" noValidate>
                  {/* Contact Information */}
                  <div className="mb-6" role="region" aria-labelledby="contact-information-heading">
                    <h2 id="contact-information-heading" className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium block mb-1.5">
                          Email <span className="text-red-500" aria-hidden="true">*</span>
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          className="w-full p-2.5 text-base"
                          required
                          aria-required="true"
                          aria-invalid={!formData.email && "true"}
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mb-6" role="region" aria-labelledby="shipping-address-heading">
                    <h2 id="shipping-address-heading" className="text-lg font-semibold mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium block mb-1.5">
                          First Name <span className="text-red-500" aria-hidden="true">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="firstName"
                          name="firstName"
                          autoComplete="given-name"
                          className="w-full p-2.5 text-base"
                          required
                          aria-required="true"
                          aria-invalid={!formData.firstName && "true"}
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium block mb-1.5">
                          Last Name <span className="text-red-500" aria-hidden="true">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          className="w-full p-2.5 text-base"
                          required
                          aria-required="true"
                          aria-invalid={!formData.lastName && "true"}
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address" className="text-sm font-medium block mb-1.5">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="address"
                          name="address"
                          autoComplete="street-address"
                          className="w-full p-2.5 text-base"
                          required
                          aria-required="true"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city" className="text-sm font-medium block mb-1.5">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          autoComplete="address-level2"
                          className="w-full p-2.5 text-base"
                          required
                          aria-required="true"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state" className="text-sm font-medium block mb-1.5">
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="state"
                            name="state"
                            autoComplete="address-level1"
                            className="w-full p-2.5 text-base"
                            required
                            aria-required="true"
                            value={formData.state}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip" className="text-sm font-medium block mb-1.5">
                            ZIP Code <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="zip"
                            name="zip"
                            autoComplete="postal-code"
                            className="w-full p-2.5 text-base"
                            required
                            aria-required="true"
                            value={formData.zip}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-start gap-2">
                      <Checkbox
                        id="sameShipping"
                        checked={formData.sameShipping}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('sameShipping', checked as boolean)
                        }
                        className="mt-0.5"
                      />
                      <Label htmlFor="sameShipping" className="text-sm text-gray-600 cursor-pointer">
                        Shipping address same as billing address
                      </Label>
                    </div>
                    
                    <div className="mt-2 flex items-start gap-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('saveInfo', checked as boolean)
                        }
                        className="mt-0.5"
                      />
                      <Label htmlFor="saveInfo" className="text-sm text-gray-600 cursor-pointer">
                        Save this information for next time
                      </Label>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="mb-6" role="region" aria-labelledby="payment-method-heading">
                    <h2 id="payment-method-heading" className="text-lg font-semibold mb-4">Payment Method</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div 
                        className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer transition
                          ${paymentMethod === 'credit-card' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setPaymentMethod('credit-card')}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                          ${paymentMethod === 'credit-card' 
                            ? 'border-green-500' 
                            : 'border-gray-300'}`}
                        >
                          {paymentMethod === 'credit-card' && (
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium">Credit Card</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-4 flex items-center gap-3 cursor-pointer transition
                          ${paymentMethod === 'crypto' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setPaymentMethod('crypto')}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                          ${paymentMethod === 'crypto' 
                            ? 'border-green-500' 
                            : 'border-gray-300'}`}
                        >
                          {paymentMethod === 'crypto' && (
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Bitcoin className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium">Cryptocurrency</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment details based on selected method */}
                    {paymentMethod === 'credit-card' ? (
                      <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="sm:col-span-2">
                            <Label htmlFor="cardName" className="text-sm font-medium block mb-1.5">
                              Name on Card <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="cardName"
                              name="cardName"
                              autoComplete="cc-name"
                              className="w-full p-2.5 text-base"
                              required={paymentMethod === 'credit-card'}
                              aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                              value={formData.cardName}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Label htmlFor="cardNumber" className="text-sm font-medium block mb-1.5">
                              Card Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              autoComplete="cc-number"
                              className="w-full p-2.5 text-base"
                              placeholder="XXXX XXXX XXXX XXXX"
                              required={paymentMethod === 'credit-card'}
                              aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                              value={formData.cardNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="expiration" className="text-sm font-medium block mb-1.5">
                              Expiration Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="expiration"
                              name="expiration"
                              autoComplete="cc-exp"
                              className="w-full p-2.5 text-base"
                              placeholder="MM/YY"
                              required={paymentMethod === 'credit-card'}
                              aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                              value={formData.expiration}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="text-sm font-medium block mb-1.5">
                              CVV <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="cvv"
                              name="cvv"
                              autoComplete="cc-csc"
                              className="w-full p-2.5 text-base"
                              placeholder="XXX"
                              required={paymentMethod === 'credit-card'}
                              aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                              value={formData.cvv}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-2">
                          <ShieldCheck className="w-4 h-4 text-green-600" />
                          Your payment information is processed securely.
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="mb-3">
                              <h3 className="font-medium text-sm mb-2">Select Cryptocurrency</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <Button
                                  type="button"
                                  variant={cryptoCurrency === 'bitcoin' ? 'default' : 'outline'}
                                  className={`py-1.5 px-3 h-auto text-sm ${
                                    cryptoCurrency === 'bitcoin' 
                                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                                      : 'text-amber-700 border-amber-200 hover:bg-amber-50'
                                  }`}
                                  onClick={() => setCryptoCurrency('bitcoin')}
                                >
                                  <Bitcoin className="w-4 h-4 mr-1.5" />
                                  Bitcoin
                                </Button>
                                
                                <Button
                                  type="button"
                                  variant={cryptoCurrency === 'ethereum' ? 'default' : 'outline'}
                                  className={`py-1.5 px-3 h-auto text-sm ${
                                    cryptoCurrency === 'ethereum' 
                                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
                                      : 'text-indigo-700 border-indigo-200 hover:bg-indigo-50'
                                  }`}
                                  onClick={() => setCryptoCurrency('ethereum')}
                                >
                                  <svg className="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 0L4 10l6 3.5L16 10L10 0zm0 20l-6-8.5L10 15l6-3.5L10 20z" />
                                  </svg>
                                  Ethereum
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-medium text-sm mb-2">
                                Send {cryptoCurrency === 'bitcoin' ? 'BTC' : 'ETH'} to:
                              </h3>
                              <div className="bg-white border border-gray-200 rounded-md p-2 flex justify-between items-center">
                                <code className="text-xs sm:text-sm font-mono text-gray-800 truncate max-w-[160px] sm:max-w-[200px]">
                                  {cryptoCurrency === 'bitcoin' 
                                    ? CRYPTO_ADDRESSES.bitcoin 
                                    : CRYPTO_ADDRESSES.ethereum}
                                </code>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => copyToClipboard(
                                    cryptoCurrency === 'bitcoin' 
                                      ? CRYPTO_ADDRESSES.bitcoin 
                                      : CRYPTO_ADDRESSES.ethereum
                                  )}
                                >
                                  {cryptoAddressCopied ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="mb-3">
                              <h3 className="font-medium text-sm mb-2">Amount to Send</h3>
                              <div className="bg-white border border-gray-200 rounded-md p-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Total ({cryptoCurrency === 'bitcoin' ? 'BTC' : 'ETH'}):</span>
                                  <span className="text-sm font-mono">
                                    {cryptoCurrency === 'bitcoin' 
                                      ? cryptoPrices.bitcoin.toFixed(8)
                                      : cryptoPrices.ethereum.toFixed(6)}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  USD equivalent: ${total.toFixed(2)}
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="cryptoTransactionId" className="text-sm font-medium block mb-1.5">
                                Transaction ID <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                type="text"
                                id="cryptoTransactionId"
                                name="cryptoTransactionId"
                                className="w-full p-2.5 text-sm font-mono"
                                placeholder="Paste transaction ID after payment"
                                required={paymentMethod === 'crypto'}
                                aria-required={paymentMethod === 'crypto' ? "true" : "false"}
                                value={formData.cryptoTransactionId}
                                onChange={handleChange}
                              />
                              <p className="text-xs text-gray-500 mt-1.5">
                                Enter the transaction ID from your wallet after sending the payment
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Mobile-only order summary toggle (visible on small screens) */}
                  <div className="lg:hidden bg-green-50 rounded-lg p-3 mb-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">Order Summary</p>
                      <p className="text-gray-600 text-sm">{totalItems} items • ${total.toFixed(2)}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-9 px-3 border-green-600 text-green-700"
                      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                      View Details
                    </Button>
                  </div>
                  
                  {/* Submit button - appears positioned at the bottom on mobile */}
                  <div className="mt-6 lg:mb-0 mb-24">
                    <div id="checkout-error" aria-live="assertive" className="sr-only">
                      {/* Area for error messages to be announced by screen readers */}
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
                      disabled={loading}
                      aria-busy={loading ? "true" : "false"}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-green-200 border-t-white rounded-full" aria-hidden="true" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          Complete Purchase
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                    <p className="text-center text-xs text-gray-500 mt-2">
                      By completing your purchase, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary - Mobile (Bottom) / Desktop (Right) */}
            <div className="lg:col-span-4 lg:order-2 order-1">
              <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="mb-4 max-h-[240px] overflow-y-auto pr-2 -mr-2" role="region" aria-label="Items in your cart">
                  {items?.map((item) => (
                    <div key={item.id} className="flex items-center py-2">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div className="flex justify-between text-sm font-medium text-gray-900">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center mt-0.5">
                          <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2" role="region" aria-label="Order totals">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Subtotal</p>
                    <p className="font-medium text-gray-900">${subtotal?.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Shipping</p>
                    <p className="font-medium text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-500">Tax</p>
                    <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <p className="text-green-600">Discount</p>
                      <p className="font-medium text-green-600">-${discount.toFixed(2)}</p>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-bold text-gray-900" aria-live="polite" aria-atomic="true">${total.toFixed(2)}</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Truck className="h-4 w-4 text-green-600" aria-hidden="true" />
                    <p>Free shipping on orders over $50</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ShieldCheck className="h-4 w-4 text-green-600" aria-hidden="true" />
                    <p>Secure payment processing</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-100" role="complementary">
                  <p className="text-xs text-gray-500">
                    By completing your purchase, you agree to our <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating place order button for mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-3 z-50">
              <div className="container mx-auto px-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-base">${total.toFixed(2)}</p>
                  <p className="text-xs text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                </div>
                <Button 
                  onClick={() => {
                    const form = document.querySelector('form');
                    if (form) form.requestSubmit();
                  }}
                  className="bg-green-700 hover:bg-green-800 text-white py-2.5 h-auto"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Complete Order"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 