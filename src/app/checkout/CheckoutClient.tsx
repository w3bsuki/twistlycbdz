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

interface CheckoutClientProps {
  cryptoAddresses: {
    bitcoin: string;
    ethereum: string;
    usdc: string;
    dogecoin: string;
  };
}

export default function CheckoutClient({ cryptoAddresses }: CheckoutClientProps) {
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
                      {/* Further form elements removed for brevity */}
                    </div>
                  </div>
                  
                  {/* Submit button */}
                  <div className="mt-6">
                    <Button 
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Complete Order"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-4 lg:order-2 order-1">
              <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                {/* Order items would go here */}
                
                <div className="flex justify-between mt-4">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 