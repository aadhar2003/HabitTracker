import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export default function Settings() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [notificationTime, setNotificationTime] = useState('09:00');

  const handleResetData = () => {
    // Implement reset data logic here
    console.log('Resetting data...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications" className="text-white">Push Notifications</Label>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="email-reminders" className="text-white">Email Reminders</Label>
          <Switch
            id="email-reminders"
            checked={emailReminders}
            onCheckedChange={setEmailReminders}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notification-time" className="text-white">Notification Time</Label>
          <Select value={notificationTime} onValueChange={setNotificationTime}>
            <SelectTrigger className="w-[180px] bg-[#1E1E1E] border-gray-700 text-white">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="18:00">6:00 PM</SelectItem>
              <SelectItem value="21:00">9:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-6">
          <Label className="text-white mb-2 block">Theme</Label>
          <Button disabled className="bg-gray-700 text-gray-400 cursor-not-allowed">
            Dark Mode Only
          </Button>
        </div>

        <div className="pt-6">
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleResetData}
          >
            Reset All Data
          </Button>
        </div>
      </div>
    </div>
  );
}

