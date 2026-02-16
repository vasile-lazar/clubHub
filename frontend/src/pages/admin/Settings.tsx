import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const Settings: React.FC = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Settings</h1>
    <p className="text-text-secondary">Configure platform settings</p>

    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Site Name</label>
          <Input placeholder="ClubHub" defaultValue="ClubHub" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Maintenance Mode</label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-brand-orange" />
            <span className="text-text-secondary">Enable maintenance mode</span>
          </label>
        </div>
        <Button variant="primary">Save Changes</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-text-secondary text-sm">Security and compliance settings.</p>
        <Button variant="ghost">Configure</Button>
      </CardContent>
    </Card>
  </div>
);
