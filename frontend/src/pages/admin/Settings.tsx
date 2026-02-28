import React from 'react';
import {useForm, type Resolver} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Card, CardHeader, CardContent, CardTitle} from '../../components/ui/Card';
import {Button} from '../../components/ui/Button';
import {Input} from '../../components/ui/Input';
import {useToast} from '../../context/ToastContext';

const show = (condition: boolean) => condition ? '' : 'hidden';

const settingsSchema = z.object({
    general: z.object({
        siteName: z.string().min(1, 'Site name is required').max(50, 'Site name too long'),
        siteDescription: z.string().max(200, 'Description too long').or(z.literal('')),
        logoUrl: z.string().refine(
            (val) => val === '' || /^https?:\/\/.+/.test(val),
            'Must be a valid URL'
        ),
        maintenanceMode: z.boolean(),
    }),
    security: z.object({
        minPasswordLength: z.coerce.number().min(6, 'Minimum is 6').max(32, 'Maximum is 32'),
        requireUppercase: z.boolean(),
        requireNumbers: z.boolean(),
        sessionTimeout: z.coerce.number().min(5, 'Minimum 5 minutes').max(10080, 'Maximum 7 days'),
        twoFactorEnabled: z.boolean(),
    }),
    registration: z.object({
        allowSignups: z.boolean(),
        requireEmailVerification: z.boolean(),
    }),
    notifications: z.object({
        emailAlertsEnabled: z.boolean(),
        announcementsEnabled: z.boolean(),
        adminEmailAddress: z.string().email('Must be a valid email').or(z.literal('')),
    }),
});

type SettingsFormData = {
    general: {
        siteName: string;
        siteDescription: string;
        logoUrl: string;
        maintenanceMode: boolean;
    };
    security: {
        minPasswordLength: number;
        requireUppercase: boolean;
        requireNumbers: boolean;
        sessionTimeout: number;
        twoFactorEnabled: boolean;
    };
    registration: {
        allowSignups: boolean;
        requireEmailVerification: boolean;
    };
    notifications: {
        emailAlertsEnabled: boolean;
        announcementsEnabled: boolean;
        adminEmailAddress: string;
    };
};

const defaultValues: SettingsFormData = {
    general: {
        siteName: 'ClubHub',
        siteDescription: 'A platform for managing clubs and events.',
        logoUrl: '',
        maintenanceMode: false,
    },
    security: {
        minPasswordLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        sessionTimeout: 60,
        twoFactorEnabled: false,
    },
    registration: {
        allowSignups: true,
        requireEmailVerification: false,
    },
    notifications: {
        emailAlertsEnabled: true,
        announcementsEnabled: true,
        adminEmailAddress: '',
    },
};

interface ToggleRowProps {
    label: string;
    description?: string;
    checked: boolean;
    onChange: (val: boolean) => void;
}

function ToggleRow({label, description, checked, onChange}: ToggleRowProps) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-border-default last:border-0">
            <div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <div className={show(!!description)}>
                    <p className="text-xs text-text-secondary mt-0.5">{description}</p>
                </div>
            </div>
            <label className="relative shrink-0 ml-4 cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div
                    className={`w-10 h-6 rounded-full transition-colors ${checked ? 'bg-brand-orange' : 'bg-border-default'}`}/>
                <div
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`}/>
            </label>
        </div>
    );
}

interface FieldRowProps {
    label: string;
    description?: string;
    children: React.ReactNode;
    error?: string;
}

function FieldRow({label, description, children, error}: FieldRowProps) {
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between py-3 border-b border-border-default last:border-0 gap-2">
            <div className="sm:w-1/2">
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <div className={show(!!description)}>
                    <p className="text-xs text-text-secondary mt-0.5">{description}</p>
                </div>
            </div>
            <div className="sm:w-1/2">
                {children}
                <div className={show(!!error)}>
                    <p className="text-sm text-red-500 mt-1">{error}</p>
                </div>
            </div>
        </div>
    );
}

export const Settings: React.FC = () => {
    const toast = useToast();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isSubmitting, isDirty},
    } = useForm<SettingsFormData>({
        resolver: zodResolver(settingsSchema) as Resolver<SettingsFormData>,
        defaultValues,
    });

    const onSubmit = async (data: SettingsFormData) => {
        try {
            console.log('Settings saved:', data);
            toast.success('Settings saved successfully');
        } catch {
            toast.error('Failed to save settings');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Settings</h1>
                <p className="text-text-secondary mt-1">Configure platform settings</p>
            </div>

            {/* General */}
            <Card>
                <CardHeader><CardTitle>General</CardTitle></CardHeader>
                <CardContent className="divide-y divide-border-default">
                    <FieldRow
                        label="Site Name"
                        description="The name displayed across the platform"
                        error={errors.general?.siteName?.message}
                    >
                        <Input placeholder="ClubHub" {...register('general.siteName')} />
                    </FieldRow>

                    <FieldRow
                        label="Site Description"
                        description="A short summary shown on the landing page"
                        error={errors.general?.siteDescription?.message}
                    >
                        <textarea
                            rows={2}
                            placeholder="A short description of your platform"
                            className={`w-full p-3 rounded-lg border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus resize-none text-sm ${errors.general?.siteDescription ? 'border-red-500' : 'border-input-border'}`}
                            {...register('general.siteDescription')}
                        />
                    </FieldRow>

                    <FieldRow
                        label="Logo URL"
                        description="Link to your platform logo image"
                        error={errors.general?.logoUrl?.message}
                    >
                        <Input placeholder="https://..." {...register('general.logoUrl')} />
                    </FieldRow>

                    <ToggleRow
                        label="Maintenance Mode"
                        description="Prevent non-admin users from accessing the platform"
                        checked={watch('general.maintenanceMode')}
                        onChange={(val) => setValue('general.maintenanceMode', val, {shouldDirty: true})}
                    />
                </CardContent>
            </Card>

            {/* Security */}
            <Card>
                <CardHeader><CardTitle>Security</CardTitle></CardHeader>
                <CardContent className="divide-y divide-border-default">
                    <FieldRow
                        label="Minimum Password Length"
                        description="Enforce a minimum character count for passwords"
                        error={errors.security?.minPasswordLength?.message}
                    >
                        <Input type="number" {...register('security.minPasswordLength')} />
                    </FieldRow>

                    <FieldRow
                        label="Session Timeout"
                        description="Automatically log out inactive users (in minutes)"
                        error={errors.security?.sessionTimeout?.message}
                    >
                        <Input type="number" {...register('security.sessionTimeout')} />
                    </FieldRow>

                    <ToggleRow
                        label="Require Uppercase Letters"
                        description="Passwords must contain at least one uppercase letter"
                        checked={watch('security.requireUppercase')}
                        onChange={(val) => setValue('security.requireUppercase', val, {shouldDirty: true})}
                    />
                    <ToggleRow
                        label="Require Numbers"
                        description="Passwords must contain at least one number"
                        checked={watch('security.requireNumbers')}
                        onChange={(val) => setValue('security.requireNumbers', val, {shouldDirty: true})}
                    />
                    <ToggleRow
                        label="Two-Factor Authentication"
                        description="Require 2FA for all admin accounts"
                        checked={watch('security.twoFactorEnabled')}
                        onChange={(val) => setValue('security.twoFactorEnabled', val, {shouldDirty: true})}
                    />
                </CardContent>
            </Card>

            {/* Registration */}
            <Card>
                <CardHeader><CardTitle>Registration</CardTitle></CardHeader>
                <CardContent className="divide-y divide-border-default">
                    <ToggleRow
                        label="Allow New Signups"
                        description="Let new users register on the platform"
                        checked={watch('registration.allowSignups')}
                        onChange={(val) => setValue('registration.allowSignups', val, {shouldDirty: true})}
                    />
                    <ToggleRow
                        label="Require Email Verification"
                        description="New accounts must verify their email before logging in"
                        checked={watch('registration.requireEmailVerification')}
                        onChange={(val) => setValue('registration.requireEmailVerification', val, {shouldDirty: true})}
                    />
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
                <CardContent className="divide-y divide-border-default">
                    <ToggleRow
                        label="Email Alerts"
                        description="Send email notifications for important platform events"
                        checked={watch('notifications.emailAlertsEnabled')}
                        onChange={(val) => setValue('notifications.emailAlertsEnabled', val, {shouldDirty: true})}
                    />
                    <ToggleRow
                        label="Announcements"
                        description="Allow admins to broadcast announcements to all users"
                        checked={watch('notifications.announcementsEnabled')}
                        onChange={(val) => setValue('notifications.announcementsEnabled', val, {shouldDirty: true})}
                    />
                    <FieldRow
                        label="Admin Email Address"
                        description="Receive platform alerts at this address"
                        error={errors.notifications?.adminEmailAddress?.message}
                    >
                        <Input placeholder="admin@example.com" {...register('notifications.adminEmailAddress')} />
                    </FieldRow>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" variant="primary" disabled={isSubmitting || !isDirty}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
};