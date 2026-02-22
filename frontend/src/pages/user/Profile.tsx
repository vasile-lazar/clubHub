import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

// ── Mock data ─────────────────────────────────────────────────────────────────

const mockClubs = [
  { id: 1, name: 'Photography Club', members: 240, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=48&h=48&fit=crop' },
  { id: 2, name: 'Hiking Society', members: 180, imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=48&h=48&fit=crop' },
  { id: 3, name: 'Book Readers', members: 95, imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=48&h=48&fit=crop' },
];

const COVER_URL =
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop';
const AVATAR_URL =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';

// ── Stat Card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-bg-secondary border border-border-default">
        <div className="text-2xl">{icon}</div>
        <div>
          <p className="text-xl font-bold text-text-primary leading-none">{value}</p>
          <p className="text-xs text-text-secondary mt-0.5">{label}</p>
        </div>
      </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const Profile: React.FC = () => {
  const { user } = useAuth();

  // ── Edit state ─────────────────────────────────────────────────────────────
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username ?? 'johndoe');
  const [role, setRole] = useState(user?.role ?? 'user');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Draft copies while editing
  const [draftUsername, setDraftUsername] = useState(username);
  const [draftRole, setDraftRole] = useState(role);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel — restore drafts
      setDraftUsername(username);
      setDraftRole(role);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
    } else {
      setDraftUsername(username);
      setDraftRole(role);
    }
    setIsEditing((v) => !v);
  };

  const handleSave = () => {
    // Password validation
    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        setPasswordError('Please enter your current password.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setPasswordError('New passwords do not match.');
        return;
      }
      if (newPassword.length < 6) {
        setPasswordError('Password must be at least 6 characters.');
        return;
      }
    }
    setPasswordError('');
    setUsername(draftUsername);
    setRole(draftRole);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // @ts-ignore
  return (
      <div className="space-y-6 pb-10">

        {/* ── Cover + Avatar + Name ── */}
        <div className="relative rounded-3xl overflow-hidden shadow-md">
          {/* Cover image */}
          <div className="h-52 w-full">
            <img
                src={COVER_URL}
                alt="Cover"
                className="h-full w-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 h-52 bg-gradient-to-r from-black/30 to-transparent" />
          </div>

          {/* Avatar + name row */}
          <div className="bg-bg-primary px-6 pb-5 pt-0 flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar */}
            <div className="-mt-12 shrink-0">
              <img
                  src={AVATAR_URL}
                  alt="Avatar"
                  className="h-24 w-24 rounded-2xl object-cover border-4 border-bg-primary shadow-lg"
              />
            </div>

            {/* Name + role + joined */}
            <div className="flex-1 pb-1">
              <h2 className="text-xl font-bold text-text-primary leading-tight">{username}</h2>
              <p className="text-sm text-text-secondary capitalize">{role}</p>
              <p className="text-xs text-text-muted mt-0.5">Joined Jan 01 2024</p>
            </div>

            {/* Edit button */}
            <div className="pb-1">
              <Button
                  variant={isEditing ? 'ghost' : 'primary'}
                  size="sm"
                  onClick={handleEditToggle}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Success banner ── */}
        {saveSuccess && (
            <div className="rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-sm px-4 py-3">
              ✓ Profile updated successfully.
            </div>
        )}

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon="👥" label="Followers" value={120} />
          <StatCard icon="🏆" label="Total Wins" value={3} />
          <StatCard icon="📅" label="Events" value={20} />
          <StatCard icon="🎯" label="Clubs Joined" value={mockClubs.length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Account Info ── */}
          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? <>
                    <Input
                        label="Username"
                        value={draftUsername}
                        onChange={(e) => setDraftUsername(e.target.value)}
                        placeholder="Enter username"
                    />

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">Role</label>
                      <select
                          value={draftRole}
                          onChange={(e) => setDraftRole(e.target.value as 'user' | 'admin' | 'guest')}
                          className="w-full p-3 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    {/* Password section */}
                    <div className="pt-2 border-t border-border-default space-y-3">
                      <p className="text-sm font-medium text-text-primary">Change Password</p>
                      <Input
                          label="Current Password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => {
                            setCurrentPassword(e.target.value);
                            setPasswordError('');
                          }}
                          placeholder="••••••••"
                      />
                      <Input
                          label="New Password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setPasswordError('');
                          }}
                          placeholder="••••••••"
                      />
                      <Input
                          label="Confirm New Password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError('');
                          }}
                          placeholder="••••••••"
                      />
                      {passwordError && (
                          <p className="text-sm text-red-500">{passwordError}</p>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button variant="primary" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </> : <div className="space-y-4">
                    <InfoRow label="Username" value={username} />
                    <InfoRow label="Role" value={<span className="capitalize">{role}</span>} />
                    <InfoRow label="Password" value="••••••••" />
                    <InfoRow label="Member Since" value="January 1, 2024" />
                  </div>}
            </CardContent>
          </Card>

          {/* ── Clubs ── */}
          <Card>
            <CardHeader>
              <CardTitle>My Clubs</CardTitle>
            </CardHeader>
            <CardContent>
              {mockClubs.length === 0 ? (
                  <p className="text-sm text-text-secondary text-center py-6">
                    You haven't joined any clubs yet.
                  </p>
              ) : (
                  <div className="space-y-3">
                    {mockClubs.map((club, index) => (
                        <div
                            key={club.id}
                            className="flex items-center gap-4 p-3 rounded-xl bg-bg-secondary border border-border-default"
                        >
                          {/* Rank */}
                          <span className="text-sm font-bold text-text-muted w-4 text-center">
                      {index + 1}
                    </span>
                          {/* Image */}
                          <img
                              src={club.imageUrl}
                              alt={club.name}
                              className="h-10 w-10 rounded-xl object-cover shrink-0"
                          />
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-text-primary truncate">
                              {club.name}
                            </p>
                            <p className="text-xs text-text-secondary">{club.members} members</p>
                          </div>
                          {/* Badge */}
                          <span className="text-xs px-2 py-1 rounded-full bg-bg-primary border border-border-default text-text-secondary shrink-0">
                      Member
                    </span>
                        </div>
                    ))}
                  </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
  );
};
export default Profile

// ── Helper ────────────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
      <div className="flex items-center justify-between py-2 border-b border-border-default last:border-0">
        <span className="text-sm text-text-secondary">{label}</span>
        <span className="text-sm font-medium text-text-primary">{value}</span>
      </div>
  );
}