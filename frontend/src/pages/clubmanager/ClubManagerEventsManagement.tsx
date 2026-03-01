import React, { useCallback, useMemo, useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import {
    Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell,
} from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clubsDataJson from '../../_mock/ClubInfo.json';
import managedClubsJson from '../../_mock/ClubManagerClubs.json';
import clubManagerEventsJson from '../../_mock/ClubManagerEvent.json';
import type { Club, Event } from '../../types';

const PAGE_SIZE = 5;
const show = (condition: boolean) => condition ? '' : 'hidden';

const allClubs = clubsDataJson as Club[];
const { managedClubIds } = managedClubsJson;
const managedClubs = allClubs.filter((c) => managedClubIds.includes(c.id));

const eventSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be at most 100 characters'),
    description: z.string()
        .max(500, 'Description must be at most 500 characters')
        .or(z.literal('')),
    clubId: z.coerce.number().min(1, 'Please select a club'),
    date: z.string().min(1, 'Date is required').refine(
        (val) => !isNaN(Date.parse(val)),
        'Must be a valid date'
    ).refine(
        (val) => new Date(val) >= new Date(new Date().toDateString()),
        'Date cannot be in the past'
    ),
    time: z.string().optional().or(z.literal('')),
    location: z.string().max(100, 'Location too long').optional().or(z.literal('')),
    imageUrl: z.string().refine(
        (val) => val === '' || /^https?:\/\/.+/.test(val),
        'Must be a valid URL'
    ),
});

type EventFormData = {
    title: string;
    description: string;
    clubId: number;
    date: string;
    time: string;
    location: string;
    imageUrl: string;
};

export const ClubManagerEventsManagement: React.FC = () => {
    const toast = useToast();
    const [events, setEvents] = useState<Event[]>(clubManagerEventsJson as Event[]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormData>({
        resolver: zodResolver(eventSchema) as Resolver<EventFormData>,
        defaultValues: { title: '', description: '', clubId: managedClubIds[0], date: '', time: '', location: '', imageUrl: '' },
    });

    const filteredEvents = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return events;
        return events.filter(
            (e) => e.title.toLowerCase().includes(q) || (e.description?.toLowerCase().includes(q) ?? false)
        );
    }, [events, search]);

    const paginatedEvents = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredEvents.slice(start, start + PAGE_SIZE);
    }, [filteredEvents, currentPage]);

    const totalPages = Math.ceil(filteredEvents.length / PAGE_SIZE);

    const getClubName = (clubId?: number) =>
        managedClubs.find((c) => c.id === clubId)?.name ?? 'Unknown';

    const handleCreate = useCallback(() => {
        reset({ title: '', description: '', clubId: managedClubIds[0], date: '', time: '', location: '', imageUrl: '' });
        setEditingEvent(null);
        setIsModalOpen(true);
    }, [reset]);

    const handleEdit = useCallback((event: Event) => {
        reset({
            title: event.title,
            description: event.description ?? '',
            clubId: event.clubId ?? managedClubIds[0],
            date: event.date,
            time: event.time ?? '',
            location: event.location ?? '',
            imageUrl: event.imageUrl ?? '',
        });
        setEditingEvent(event);
        setIsModalOpen(true);
    }, [reset]);

    const closeFormModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingEvent(null);
    }, []);

    const onSubmit = useCallback(async (data: EventFormData) => {
        setIsLoading(true);
        try {
            if (editingEvent) {
                setEvents((prev) =>
                    prev.map((e) => e.id === editingEvent.id
                        ? { ...e, ...data, imageUrl: data.imageUrl || e.imageUrl }
                        : e
                    )
                );
                toast.success('Event updated successfully');
            } else {
                const newEvent: Event = {
                    id: Date.now(),
                    ...data,
                    imageUrl: data.imageUrl || undefined,
                };
                setEvents((prev) => [newEvent, ...prev]);
                toast.success('Event created successfully');
            }
            closeFormModal();
        } catch {
            toast.error('Failed to save event');
        } finally {
            setIsLoading(false);
        }
    }, [editingEvent, toast, closeFormModal]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">My Club Events</h1>
            <p className="text-text-secondary">Manage events for your clubs</p>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <CardTitle>Events</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            className="p-2 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus w-full sm:w-48"
                        />
                        <Button variant="primary" size="sm" onClick={handleCreate}>Add Event</Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className={show(filteredEvents.length === 0)}>
                        <EmptyState
                            icon={<CalendarIcon className="h-8 w-8" />}
                            title="No events found"
                            message="No events for your clubs yet."
                        />
                    </div>

                    <div className={show(filteredEvents.length > 0)}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeaderCell>Event</TableHeaderCell>
                                    <TableHeaderCell>Club</TableHeaderCell>
                                    <TableHeaderCell>Date</TableHeaderCell>
                                    <TableHeaderCell>Location</TableHeaderCell>
                                    <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedEvents.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className={show(!!event.imageUrl)}>
                                                    <img src={event.imageUrl} alt={event.title} className="h-9 w-9 rounded-lg object-cover shrink-0" />
                                                </div>
                                                <span className="font-medium text-text-primary">{event.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-text-secondary">{getClubName(event.clubId)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-text-secondary">{event.date}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-text-secondary">{event.location ?? '—'}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleEdit(event)}>Edit</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className={show(totalPages > 1)}>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-default">
                                <p className="text-sm text-text-secondary">
                                    Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                                    {Math.min(currentPage * PAGE_SIZE, filteredEvents.length)} of {filteredEvents.length}
                                </p>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                                        <ChevronLeftIcon className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                                        <ChevronRightIcon className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Modal isOpen={isModalOpen} onClose={closeFormModal} title={editingEvent ? 'Edit Event' : 'Add Event'} size="md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label="Title"
                        placeholder="Enter event title"
                        error={errors.title?.message}
                        {...register('title')}
                    />
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Club</label>
                        <select
                            {...register('clubId')}
                            className="w-full p-3 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus"
                        >
                            {managedClubs.map((club) => (
                                <option key={club.id} value={club.id}>{club.name}</option>
                            ))}
                        </select>
                        <div className={show(!!errors.clubId)}>
                            <p className="text-sm text-red-500 mt-1">{errors.clubId?.message}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Enter event description"
                            className={`w-full p-3 rounded-lg border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus resize-none ${errors.description ? 'border-red-500' : 'border-input-border'}`}
                            {...register('description')}
                        />
                        <div className={show(!!errors.description)}>
                            <p className="text-sm text-red-500 mt-1">{errors.description?.message}</p>
                        </div>
                    </div>
                    <Input
                        label="Date"
                        type="date"
                        error={errors.date?.message}
                        {...register('date')}
                    />
                    <Input
                        label="Time (optional)"
                        type="time"
                        error={errors.time?.message}
                        {...register('time')}
                    />
                    <Input
                        label="Location (optional)"
                        placeholder="Enter location"
                        error={errors.location?.message}
                        {...register('location')}
                    />
                    <Input
                        label="Image URL (optional)"
                        placeholder="https://..."
                        error={errors.imageUrl?.message}
                        {...register('imageUrl')}
                    />
                    <div className="flex gap-3 justify-end pt-4">
                        <Button variant="ghost" onClick={closeFormModal}>Cancel</Button>
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? 'Saving...' : editingEvent ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};