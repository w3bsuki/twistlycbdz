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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  CreditCard, 
  DollarSign, 
  Truck, 
  ShieldCheck,
  ArrowRight,
  Copy,
  Bitcoin,
  Check
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock crypto payment addresses
const CRYPTO_ADDRESSES = {
  bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  usdc: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  dogecoin: 'D5jFZgsmgYAAk5NAZUcL9pQaUP9qmJWgTF'
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
            {/* Main checkout form - Mobile (Bottom) / Desktop (Left) */}
            <div className="lg:col-span-8 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6">
                <form onSubmit={handleSubmit}>
                  {/* Contact Information */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                          aria-required="true"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="123 Main St"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full"
                        aria-required="true"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          placeholder="New York"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="NY"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="10001"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                          className="w-full"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="sameShipping"
                          checked={formData.sameShipping}
                          onCheckedChange={(checked) => handleCheckboxChange('sameShipping', checked as boolean)}
                        />
                        <Label htmlFor="sameShipping" className="text-sm text-gray-700">
                          Billing address is the same as shipping address
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div 
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'credit-card' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('credit-card')}
                      >
                        <RadioGroupItem 
                          id="credit-card" 
                          value="credit-card" 
                          className="mr-3"
                          checked={paymentMethod === 'credit-card'}
                          aria-labelledby="credit-card-label"
                        />
                        <Label htmlFor="credit-card" className="flex items-center cursor-pointer" id="credit-card-label">
                          <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                          <span>Credit or Debit Card</span>
                        </Label>
                      </div>
                      
                      <div 
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === 'crypto'
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod('crypto')}
                      >
                        <RadioGroupItem 
                          id="crypto" 
                          value="crypto" 
                          className="mr-3"
                          checked={paymentMethod === 'crypto'}
                          aria-labelledby="crypto-label"
                        />
                        <Label htmlFor="crypto" className="flex items-center cursor-pointer" id="crypto-label">
                          <Bitcoin className="h-5 w-5 mr-2 text-orange-500" />
                          <span>Cryptocurrency</span>
                        </Label>
                      </div>
                    </div>
                    
                    {/* Credit Card Payment Fields */}
                    {paymentMethod === 'credit-card' && (
                      <div className="space-y-4 rounded-lg border border-gray-200 p-4">
                        <div>
                          <Label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="cardName"
                            name="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={handleChange}
                            required={paymentMethod === 'credit-card'}
                            className="w-full"
                            aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required={paymentMethod === 'credit-card'}
                            className="w-full"
                            aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration (MM/YY) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="expiration"
                              name="expiration"
                              placeholder="MM/YY"
                              value={formData.expiration}
                              onChange={handleChange}
                              required={paymentMethod === 'credit-card'}
                              className="w-full"
                              aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              type="text"
                              id="cvv"
                              name="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={handleChange}
                              required={paymentMethod === 'credit-card'}
                              className="w-full"
                              aria-required={paymentMethod === 'credit-card' ? "true" : "false"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Crypto Payment Fields */}
                    {paymentMethod === 'crypto' && (
                      <div className="space-y-4 rounded-lg border border-gray-200 p-4">
                        <div className="mb-4">
                          <Label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Cryptocurrency
                          </Label>
                          <div className="grid grid-cols-2 gap-3">
                            <Button 
                              type="button"
                              variant="outline"
                              className={`flex items-center justify-center py-2 px-3 ${
                                cryptoCurrency === 'bitcoin' 
                                  ? 'border-green-500 bg-green-50 text-green-700' 
                                  : 'border-gray-200'
                              }`}
                              onClick={() => setCryptoCurrency('bitcoin')}
                            >
                              <span className="flex items-center">
                                <Image src="/images/bitcoin.svg" alt="Bitcoin" width={20} height={20} className="mr-2" />
                                Bitcoin
                              </span>
                            </Button>
                            <Button 
                              type="button"
                              variant="outline"
                              className={`flex items-center justify-center py-2 px-3 ${
                                cryptoCurrency === 'ethereum' 
                                  ? 'border-green-500 bg-green-50 text-green-700' 
                                  : 'border-gray-200'
                              }`}
                              onClick={() => setCryptoCurrency('ethereum')}
                            >
                              <span className="flex items-center">
                                <Image src="/images/ethereum.svg" alt="Ethereum" width={20} height={20} className="mr-2" />
                                Ethereum
                              </span>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Send {cryptoCurrency === 'bitcoin' ? 'BTC' : 'ETH'} to:
                            </Label>
                            <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1 rounded">
                              Amount: {cryptoPrices[cryptoCurrency as keyof typeof cryptoPrices]} {cryptoCurrency.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <code className="flex-1 bg-white px-3 py-2 text-xs font-mono border rounded-l-md overflow-x-auto">
                              {CRYPTO_ADDRESSES[cryptoCurrency as keyof typeof CRYPTO_ADDRESSES]}
                            </code>
                            <Button
                              type="button"
                              className="rounded-l-none h-full"
                              onClick={() => copyToClipboard(CRYPTO_ADDRESSES[cryptoCurrency as keyof typeof CRYPTO_ADDRESSES])}
                              aria-label="Copy address to clipboard"
                            >
                              {cryptoAddressCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-2">
                            After sending payment, enter the transaction ID below to confirm your purchase.
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="cryptoTransactionId" className="block text-sm font-medium text-gray-700 mb-1">
                            Transaction ID <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            type="text"
                            id="cryptoTransactionId"
                            name="cryptoTransactionId"
                            placeholder="Enter your transaction ID"
                            value={formData.cryptoTransactionId}
                            onChange={handleChange}
                            required={paymentMethod === 'crypto'}
                            className="w-full"
                            aria-required={paymentMethod === 'crypto' ? "true" : "false"}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) => handleCheckboxChange('saveInfo', checked as boolean)}
                      />
                      <Label htmlFor="saveInfo" className="text-sm text-gray-700">
                        Save my information for faster checkout next time
                      </Label>
                    </div>
                    
                    {/* Mobile: Total and Checkout Button (visible only on mobile) */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border lg:hidden">
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-xl font-bold">${total.toFixed(2)}</p>
                      </div>
                      <Button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800"
                        disabled={loading}
                        aria-label="Complete purchase"
                      >
                        {loading ? 'Processing...' : 'Complete Purchase'}
                        {!loading && <ArrowRight className="ml-1 h-4 w-4" />}
                      </Button>
                    </div>
                    
                    {/* Desktop: Place Order Button (hidden on mobile) */}
                    <div className="hidden lg:block">
                      <Button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 py-6 text-lg"
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Complete Purchase'}
                        {!loading && <ArrowRight className="ml-1 h-5 w-5" />}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order summary - Mobile (Top) / Desktop (Right) */}
            <div className="lg:col-span-4 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Order Summary</h2>
                  <span className="text-sm bg-gray-100 rounded-full px-3 py-1 font-medium text-gray-700">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
                
                {/* Order details - scrollable on mobile */}
                <div className="space-y-4 mb-5 max-h-[30vh] lg:max-h-[40vh] overflow-y-auto pr-2 -mr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          {item.details?.size || ''} {item.details?.size ? '|' : ''} Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right text-sm font-medium">
                        ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                {/* Order calculations */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span className="text-red-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Truck className="h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <ShieldCheck className="h-4 w-4 flex-shrink-0 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 