import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAuth} from '../../hooks/useAuth';
import {Card, CardHeader, CardContent, CardTitle} from '../../components/ui/Card';
import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import {
    UserGroupIcon,
    TrophyIcon,
    CalendarDaysIcon,
    FlagIcon,
} from '@heroicons/react/24/outline';

const mockClubs = [
    {
        id: 1,
        name: 'Photography Club',
        members: 240,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=48&h=48&fit=crop'
    },
    {
        id: 2,
        name: 'Hiking Society',
        members: 180,
        imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=48&h=48&fit=crop'
    },
    {
        id: 3,
        name: 'Book Readers',
        members: 95,
        imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=48&h=48&fit=crop'
    },
];

const COVER_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop';
const AVATAR_URL = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';

const show = (condition: boolean) => condition ? '' : 'hidden';

const profileSchema = z
    .object({
        username: z.string().min(1, 'Username is required'),
        currentPassword: z.string().optional(),
        newPassword: z.string().optional(),
        confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        const changing = data.newPassword || data.confirmPassword;
        if (changing) {
            if (!data.currentPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Please enter your current password.',
                    path: ['currentPassword']
                });
            }
            if ((data.newPassword?.length ?? 0) < 6) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Password must be at least 6 characters.',
                    path: ['newPassword']
                });
            }
            if (data.newPassword !== data.confirmPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'New passwords do not match.',
                    path: ['confirmPassword']
                });
            }
        }
    });

type ProfileFormData = z.infer<typeof profileSchema>;

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

function StatCard({icon, label, value}: StatCardProps) {
    return (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-bg-secondary border border-border-default">
            {icon}
            <div>
                <p className="text-xl font-bold text-text-primary leading-none">{value}</p>
                <p className="text-xs text-text-secondary mt-0.5">{label}</p>
            </div>
        </div>
    );
}

function InfoRow({label, value}: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-border-default last:border-0">
            <span className="text-sm text-text-secondary">{label}</span>
            <span className="text-sm font-medium text-text-primary">{value}</span>
        </div>
    );
}

const Profile: React.FC = () => {
    const {user} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [savedUsername, setSavedUsername] = useState(user?.username ?? '');

    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: savedUsername,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    if (!user) return null;

    const role = user.role;

    const handleEditToggle = () => {
        if (isEditing) {
            reset({username: savedUsername, currentPassword: '', newPassword: '', confirmPassword: ''});
        }
        setIsEditing((v) => !v);
    };

    const onSubmit = async (data: ProfileFormData) => {
        setSavedUsername(data.username);
        reset({username: data.username, currentPassword: '', newPassword: '', confirmPassword: ''});
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    return (
        <div className="space-y-6 pb-10">
            <div className="relative rounded-3xl overflow-hidden shadow-md">
                <div className="h-52 w-full">
                    <img src={COVER_URL} alt="Cover" className="h-full w-full object-cover"/>
                    <div className="absolute inset-0 h-52"/>
                </div>

                <div className="bg-bg-primary px-6 pb-5 pt-0 flex flex-col sm:flex-row sm:items-end gap-4">
                    <div className="-mt-12 shrink-0">
                        <img src={AVATAR_URL} alt="Avatar"
                             className="h-24 w-24 rounded-2xl object-cover border-4 border-bg-primary shadow-lg"/>
                    </div>
                    <div className="flex-1 pb-1">
                        <h2 className="text-xl font-bold text-text-primary leading-tight">{savedUsername}</h2>
                        <p className="text-sm text-text-secondary capitalize">{role}</p>
                        <p className="text-xs text-text-primary mt-0.5">Joined Jan 01 2024</p>
                    </div>
                    <div className="pb-1">
                        <Button variant={isEditing ? 'ghost' : 'primary'} size="sm" onClick={handleEditToggle}>
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className={show(saveSuccess)}>
                <div className="rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-sm px-4 py-3">
                    Profile updated successfully.
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard icon={<UserGroupIcon className="w-6 h-6 text-text-secondary"/>} label="Followers"
                          value={120}/>
                <StatCard icon={<TrophyIcon className="w-6 h-6 text-text-secondary"/>} label="Total Wins" value={3}/>
                <StatCard icon={<CalendarDaysIcon className="w-6 h-6 text-text-secondary"/>} label="Events" value={20}/>
                <StatCard icon={<FlagIcon className="w-6 h-6 text-text-secondary"/>} label="Clubs Joined"
                          value={mockClubs.length}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${show(isEditing)}`}>
                            <Input
                                label="Username"
                                placeholder="Enter username"
                                error={errors.username?.message}
                                {...register('username')}
                            />

                            <div className="pt-2 border-t border-border-default space-y-3">
                                <p className="text-sm font-medium text-text-primary">Change Password</p>
                                <Input
                                    label="Current Password"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.currentPassword?.message}
                                    {...register('currentPassword')}
                                />
                                <Input
                                    label="New Password"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.newPassword?.message}
                                    {...register('newPassword')}
                                />
                                <Input
                                    label="Confirm New Password"
                                    type="password"
                                    placeholder="••••••••"
                                    error={errors.confirmPassword?.message}
                                    {...register('confirmPassword')}
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>

                        <div className={show(!isEditing)}>
                            <div className="space-y-4">
                                <InfoRow label="Username" value={savedUsername}/>
                                <InfoRow label="Role" value={<span className="capitalize">{role}</span>}/>
                                <InfoRow label="Password" value="••••••••"/>
                                <InfoRow label="Member Since" value="January 1, 2024"/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>My Clubs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={show(mockClubs.length === 0)}>
                            <p className="text-sm text-text-secondary text-center py-6">
                                You haven't joined any clubs yet.
                            </p>
                        </div>

                        <div className={`space-y-3 ${show(mockClubs.length > 0)}`}>
                            {mockClubs.map((club, index) => (
                                <div key={club.id}
                                     className="flex items-center gap-4 p-3 rounded-xl bg-bg-secondary border border-border-default">
                                    <span
                                        className="text-sm font-bold text-text-muted w-4 text-center">{index + 1}</span>
                                    <img src={club.imageUrl} alt={club.name}
                                         className="h-10 w-10 rounded-xl object-cover shrink-0"/>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-text-primary truncate">{club.name}</p>
                                        <p className="text-xs text-text-secondary">{club.members} members</p>
                                    </div>
                                    <span
                                        className="text-xs px-2 py-1 rounded-full bg-bg-primary border border-border-default text-text-secondary shrink-0">
                    Member
                  </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;