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
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <Link 
          href="/shop" 
          className="inline-flex items-center mb-8 text-sm font-medium text-gray-600 hover:text-green-700"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Shop
        </Link>
        
        <h1 className="text-3xl font-bold mb-10 text-center">Checkout</h1>
        
        {!items?.length ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add some products to your cart and come back to complete your purchase.
            </p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Order summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          {item.details?.size} | Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right text-sm font-medium">
                        ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
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
                    <span className="text-gray-500">Tax</span>
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
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checkout form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Shipping Information */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              name="state"
                              required
                              value={formData.state}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input
                              id="zip"
                              name="zip"
                              required
                              value={formData.zip}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="sameShipping" 
                            checked={formData.sameShipping}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('sameShipping', checked as boolean)
                            }
                          />
                          <label
                            htmlFor="sameShipping"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Billing address same as shipping
                          </label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="saveInfo" 
                            checked={formData.saveInfo}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('saveInfo', checked as boolean)
                            }
                          />
                          <label
                            htmlFor="saveInfo"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Save this information for next time
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment Method */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                      
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Credit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            PayPal
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="crypto" id="crypto" />
                          <Label htmlFor="crypto" className="flex items-center gap-2">
                            <Bitcoin className="h-4 w-4" />
                            Cryptocurrency
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      {paymentMethod === 'credit-card' && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              required
                              value={formData.cardName}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="XXXX XXXX XXXX XXXX"
                              required
                              value={formData.cardNumber}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiration">Expiration (MM/YY)</Label>
                              <Input
                                id="expiration"
                                name="expiration"
                                placeholder="MM/YY"
                                required
                                value={formData.expiration}
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">Security Code</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                placeholder="CVV"
                                required
                                value={formData.cvv}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'crypto' && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label className="mb-2 block">Select Cryptocurrency</Label>
                            <Tabs defaultValue="bitcoin" value={cryptoCurrency} onValueChange={setCryptoCurrency}>
                              <TabsList className="grid grid-cols-4 w-full">
                                <TabsTrigger value="bitcoin">BTC</TabsTrigger>
                                <TabsTrigger value="ethereum">ETH</TabsTrigger>
                                <TabsTrigger value="usdc">USDC</TabsTrigger>
                                <TabsTrigger value="dogecoin">DOGE</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="bitcoin" className="mt-4">
                                <div className="rounded-md border p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">Bitcoin</h4>
                                    <p className="text-green-700 font-medium">{cryptoPrices.bitcoin} BTC</p>
                                  </div>
                                  <p className="text-sm text-gray-500 mb-3">Send exactly {cryptoPrices.bitcoin} BTC to the following address:</p>
                                  
                                  <div className="flex">
                                    <div className="bg-gray-100 rounded-l-md p-2 font-mono text-sm flex-1 border-y border-l truncate">
                                      {CRYPTO_ADDRESSES.bitcoin}
                                    </div>
                                    <button 
                                      type="button" 
                                      className="bg-gray-200 hover:bg-gray-300 rounded-r-md flex items-center justify-center px-3 border-y border-r"
                                      onClick={() => copyToClipboard(CRYPTO_ADDRESSES.bitcoin)}
                                    >
                                      {cryptoAddressCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="ethereum" className="mt-4">
                                <div className="rounded-md border p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">Ethereum</h4>
                                    <p className="text-green-700 font-medium">{cryptoPrices.ethereum} ETH</p>
                                  </div>
                                  <p className="text-sm text-gray-500 mb-3">Send exactly {cryptoPrices.ethereum} ETH to the following address:</p>
                                  
                                  <div className="flex">
                                    <div className="bg-gray-100 rounded-l-md p-2 font-mono text-sm flex-1 border-y border-l truncate">
                                      {CRYPTO_ADDRESSES.ethereum}
                                    </div>
                                    <button 
                                      type="button" 
                                      className="bg-gray-200 hover:bg-gray-300 rounded-r-md flex items-center justify-center px-3 border-y border-r"
                                      onClick={() => copyToClipboard(CRYPTO_ADDRESSES.ethereum)}
                                    >
                                      {cryptoAddressCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="usdc" className="mt-4">
                                <div className="rounded-md border p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">USD Coin</h4>
                                    <p className="text-green-700 font-medium">{cryptoPrices.usdc} USDC</p>
                                  </div>
                                  <p className="text-sm text-gray-500 mb-3">Send exactly {cryptoPrices.usdc} USDC to the following address:</p>
                                  
                                  <div className="flex">
                                    <div className="bg-gray-100 rounded-l-md p-2 font-mono text-sm flex-1 border-y border-l truncate">
                                      {CRYPTO_ADDRESSES.usdc}
                                    </div>
                                    <button 
                                      type="button" 
                                      className="bg-gray-200 hover:bg-gray-300 rounded-r-md flex items-center justify-center px-3 border-y border-r"
                                      onClick={() => copyToClipboard(CRYPTO_ADDRESSES.usdc)}
                                    >
                                      {cryptoAddressCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="dogecoin" className="mt-4">
                                <div className="rounded-md border p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">Dogecoin</h4>
                                    <p className="text-green-700 font-medium">{cryptoPrices.dogecoin} DOGE</p>
                                  </div>
                                  <p className="text-sm text-gray-500 mb-3">Send exactly {cryptoPrices.dogecoin} DOGE to the following address:</p>
                                  
                                  <div className="flex">
                                    <div className="bg-gray-100 rounded-l-md p-2 font-mono text-sm flex-1 border-y border-l truncate">
                                      {CRYPTO_ADDRESSES.dogecoin}
                                    </div>
                                    <button 
                                      type="button" 
                                      className="bg-gray-200 hover:bg-gray-300 rounded-r-md flex items-center justify-center px-3 border-y border-r"
                                      onClick={() => copyToClipboard(CRYPTO_ADDRESSES.dogecoin)}
                                    >
                                      {cryptoAddressCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                            
                            <div className="mt-6">
                              <Label htmlFor="cryptoTransactionId">Transaction ID / Hash</Label>
                              <Input
                                id="cryptoTransactionId"
                                name="cryptoTransactionId"
                                placeholder="Enter the transaction ID after sending payment"
                                value={formData.cryptoTransactionId}
                                onChange={handleChange}
                              />
                              <p className="text-sm text-gray-500 mt-1">
                                Enter the transaction ID from your wallet after sending the payment.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-green-700 hover:bg-green-800"
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Complete Order'}
                      {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 