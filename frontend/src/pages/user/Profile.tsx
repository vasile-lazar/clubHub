import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newValue, setNewValue] = useState('');

  if (!user) return null;

  const handleChangeClick = (field: string, currentValue: string) => {
    setEditingField(field);
    setNewValue(currentValue);
  };

  const handleSave = () => {
    setEditingField(null);
  };

  const getDisplayValue = (field: string): string => {
    const v = user[field as keyof typeof user];
    return typeof v === 'string' ? v : String(v ?? '');
  };

  const fields = ['username', 'role'] as const;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">My Profile</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-bg-secondary flex items-center justify-center">
              {user.pfp ? (
                <img src={user.pfp} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-text-primary">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <CardTitle>Profile Picture</CardTitle>
              <p className="text-sm text-text-secondary">Your avatar</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">Change</Button>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field) => (
            <div
              key={field}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-lg border border-border-default"
            >
              <div className="flex-1">
                <span className="font-semibold text-text-primary capitalize">{field}: </span>
                {editingField === field ? (
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <span className="text-text-primary">{getDisplayValue(field)}</span>
                )}
              </div>
              {editingField === field ? (
                <Button size="sm" onClick={handleSave}>Save</Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleChangeClick(field, getDisplayValue(field))}
                >
                  Change
                </Button>
              )}
            </div>
          ))}
          <div className="flex justify-between items-center p-4 rounded-lg border border-border-default">
            <div>
              <span className="font-semibold text-text-primary">Password:</span>
              <span className="ml-2 text-text-secondary">********</span>
            </div>
            <Button variant="ghost" size="sm">Change</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
