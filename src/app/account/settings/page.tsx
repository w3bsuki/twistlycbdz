'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock user data
const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(503) 555-0123',
  address: {
    line1: '123 Main St',
    line2: 'Apt 4B',
    city: 'Portland',
    state: 'OR',
    postal: '97201',
    country: 'United States',
  },
};

// Component to handle tab selection with search params
function TabSelector({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  useEffect(() => {
    const selectedTab = tabParam === 'security' ? 'security' : 
                        tabParam === 'preferences' ? 'preferences' : 'personal';
    onTabChange(selectedTab);
  }, [tabParam, onTabChange]);
  
  return null;
}

export default function AccountSettingsPage() {
  // Set default tab
  const [activeTab, setActiveTab] = useState('personal');
  
  // Personal Information form state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    phone: mockUser.phone,
  });
  
  // Address form state
  const [address, setAddress] = useState({
    line1: mockUser.address.line1,
    line2: mockUser.address.line2,
    city: mockUser.address.city,
    state: mockUser.address.state,
    postal: mockUser.address.postal,
    country: mockUser.address.country,
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Notification preferences state
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    productUpdates: false,
  });
  
  // Loading states for form submissions
  const [isPersonalInfoLoading, setIsPersonalInfoLoading] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(false);
  
  // Handle personal info form changes
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle notification toggle changes
  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };
  
  // Handle personal info form submission
  const handleSubmitPersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPersonalInfoLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success toast
      toast.success('Personal information updated successfully');
    } catch (error) {
      // Error toast
      toast.error('Failed to update personal information');
    } finally {
      setIsPersonalInfoLoading(false);
    }
  };
  
  // Handle address form submission
  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddressLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success toast
      toast.success('Address updated successfully');
    } catch (error) {
      // Error toast
      toast.error('Failed to update address');
    } finally {
      setIsAddressLoading(false);
    }
  };
  
  // Handle password form submission
  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    
    setIsPasswordLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Success toast
      toast.success('Password updated successfully');
    } catch (error) {
      // Error toast
      toast.error('Failed to update password');
    } finally {
      setIsPasswordLoading(false);
    }
  };
  
  // Handle notifications form submission
  const handleSubmitNotifications = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNotificationsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success toast
      toast.success('Notification preferences updated');
    } catch (error) {
      // Error toast
      toast.error('Failed to update notification preferences');
    } finally {
      setIsNotificationsLoading(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      
      {/* Suspense boundary for useSearchParams */}
      <Suspense fallback={<div>Loading tabs...</div>}>
        <TabSelector onTabChange={setActiveTab} />
      </Suspense>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="personal" className="flex-1">Personal Info</TabsTrigger>
          <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
          <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
        </TabsList>
        
        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Details Form */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="personal-info-form" onSubmit={handleSubmitPersonalInfo}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={personalInfo.lastName}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setPersonalInfo({
                    firstName: mockUser.firstName,
                    lastName: mockUser.lastName,
                    email: mockUser.email,
                    phone: mockUser.phone,
                  })}
                >
                  Reset
                </Button>
                <Button 
                  type="submit"
                  form="personal-info-form"
                  disabled={isPersonalInfoLoading}
                >
                  {isPersonalInfoLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Address Form */}
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
                <CardDescription>Update your shipping address</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="address-form" onSubmit={handleSubmitAddress}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="line1">Address Line 1</Label>
                      <Input 
                        id="line1"
                        name="line1"
                        value={address.line1}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="line2">Address Line 2</Label>
                      <Input 
                        id="line2"
                        name="line2"
                        value={address.line2}
                        onChange={handleAddressChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city"
                          name="city"
                          value={address.city}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Input 
                          id="state"
                          name="state"
                          value={address.state}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="postal">Postal Code</Label>
                        <Input 
                          id="postal"
                          name="postal"
                          value={address.postal}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input 
                          id="country"
                          name="country"
                          value={address.country}
                          onChange={handleAddressChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setAddress({
                    line1: mockUser.address.line1,
                    line2: mockUser.address.line2,
                    city: mockUser.address.city,
                    state: mockUser.address.state,
                    postal: mockUser.address.postal,
                    country: mockUser.address.country,
                  })}
                >
                  Reset
                </Button>
                <Button 
                  type="submit"
                  form="address-form"
                  disabled={isAddressLoading}
                >
                  {isAddressLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="password-form" onSubmit={handleSubmitPassword}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setPasswordForm({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                })}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                form="password-form"
                disabled={isPasswordLoading}
              >
                {isPasswordLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage your email notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="notifications-form" onSubmit={handleSubmitNotifications}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="orderUpdates" className="flex flex-col space-y-1">
                      <span>Order Updates</span>
                      <span className="font-normal text-sm text-gray-500">Receive notifications about your orders</span>
                    </Label>
                    <Switch
                      id="orderUpdates"
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked: boolean) => handleNotificationChange('orderUpdates', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="promotions" className="flex flex-col space-y-1">
                      <span>Promotions</span>
                      <span className="font-normal text-sm text-gray-500">Receive emails about special offers and discounts</span>
                    </Label>
                    <Switch
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(checked: boolean) => handleNotificationChange('promotions', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="newsletter" className="flex flex-col space-y-1">
                      <span>Newsletter</span>
                      <span className="font-normal text-sm text-gray-500">Receive our monthly newsletter</span>
                    </Label>
                    <Switch
                      id="newsletter"
                      checked={notifications.newsletter}
                      onCheckedChange={(checked: boolean) => handleNotificationChange('newsletter', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="productUpdates" className="flex flex-col space-y-1">
                      <span>Product Updates</span>
                      <span className="font-normal text-sm text-gray-500">Receive updates about new products</span>
                    </Label>
                    <Switch
                      id="productUpdates"
                      checked={notifications.productUpdates}
                      onCheckedChange={(checked: boolean) => handleNotificationChange('productUpdates', checked)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit"
                form="notifications-form"
                className="ml-auto"
                disabled={isNotificationsLoading}
              >
                {isNotificationsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  'Save Preferences'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 