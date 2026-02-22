import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '../../components/ui/Card';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell,
} from '../../components/ui/Table';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import rawEvents from '../../_mock/EventsAnnouncements.json';
import type { Event } from '../../types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface EventFormData {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 5;

const initialEvents = rawEvents as Event[];

const emptyForm = (): EventFormData => ({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
});

// ── Component ─────────────────────────────────────────────────────────────────

export const EventsManagement: React.FC = () => {
    const toast = useToast();

    // ── State ──────────────────────────────────────────────────────────────────
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; title: string } | null>(null);

    const [formData, setFormData] = useState<EventFormData>(emptyForm());
    const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});

    // ── Derived data ───────────────────────────────────────────────────────────
    const filteredEvents = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return events;
        return events.filter(
            (e) =>
                e.title.toLowerCase().includes(q) ||
                (e.description?.toLowerCase().includes(q) ?? false)
        );
    }, [events, search]);

    const paginatedEvents = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredEvents.slice(start, start + PAGE_SIZE);
    }, [filteredEvents, currentPage]);

    const totalPages = Math.ceil(filteredEvents.length / PAGE_SIZE);

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleCreate = useCallback(() => {
        setFormData(emptyForm());
        setFormErrors({});
        setEditingEvent(null);
        setIsCreateModalOpen(true);
    }, []);

    const handleEdit = useCallback((event: Event) => {
        setFormData({
            title: event.title,
            description: event.description ?? '',
            date: event.date,
            imageUrl: event.imageUrl ?? '',
        });
        setFormErrors({});
        setEditingEvent(event);
        setIsCreateModalOpen(false);
    }, []);

    const closeFormModal = useCallback(() => {
        setIsCreateModalOpen(false);
        setEditingEvent(null);
    }, []);

    const handleSave = useCallback(async () => {
        const errors: Record<string, string | undefined> = {};
        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.date.trim()) errors.date = 'Date is required';
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);
        try {
            if (editingEvent) {
                setEvents((prev) =>
                    prev.map((e) =>
                        e.id === editingEvent.id
                            ? {
                                ...e,
                                title: formData.title,
                                description: formData.description,
                                date: formData.date,
                                imageUrl: formData.imageUrl || e.imageUrl,
                            }
                            : e
                    )
                );
                toast.success('Event updated successfully');
            } else {
                const newEvent: Event = {
                    id: Date.now(),
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    imageUrl: formData.imageUrl || undefined,
                };
                setEvents((prev) => [newEvent, ...prev]);
                toast.success('Event created successfully');
            }
            setIsCreateModalOpen(false);
            setEditingEvent(null);
        } catch {
            toast.error('Failed to save event');
        } finally {
            setIsLoading(false);
        }
    }, [formData, editingEvent, toast]);

    const handleDelete = useCallback((event: Event) => {
        setDeleteConfirm({ id: event.id, title: event.title });
    }, []);

    const confirmDelete = useCallback(async () => {
        if (!deleteConfirm) return;
        setIsDeleting(true);
        try {
            setEvents((prev) => prev.filter((e) => e.id !== deleteConfirm.id));
            toast.success('Event deleted');
            setDeleteConfirm(null);
        } catch {
            toast.error('Failed to delete event');
        } finally {
            setIsDeleting(false);
        }
    }, [deleteConfirm, toast]);

    const setField = useCallback(
        <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => {
            setFormData((prev) => ({ ...prev, [key]: value }));
            setFormErrors((prev) => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        },
        []
    );

    // ── Form modal ────────────────────────────────────────────────────────────
    const EventFormModal = (
        <Modal
            isOpen={isCreateModalOpen || !!editingEvent}
            onClose={closeFormModal}
            title={editingEvent ? 'Edit Event' : 'Add Event'}
            size="md"
        >
            <div className="space-y-4">
                <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setField('title', e.target.value)}
                    error={formErrors.title}
                    placeholder="Enter event title"
                />

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setField('description', e.target.value)}
                        rows={3}
                        placeholder="Enter event description"
                        className="w-full p-3 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus resize-none"
                    />
                </div>

                <Input
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setField('date', e.target.value)}
                    error={formErrors.date}
                />

                <Input
                    label="Image URL (optional)"
                    value={formData.imageUrl}
                    onChange={(e) => setField('imageUrl', e.target.value)}
                    placeholder="https://..."
                />

                <div className="flex gap-3 justify-end pt-4">
                    <Button variant="ghost" onClick={closeFormModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={isLoading}>
                        {isLoading ? 'Saving...' : editingEvent ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>
        </Modal>
    );

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Events</h1>
            <p className="text-text-secondary">Manage platform events</p>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <CardTitle>Events</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="p-2 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus w-full sm:w-48"
                        />
                        <Button variant="primary" size="sm" onClick={handleCreate}>
                            Add Event
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {filteredEvents.length === 0 ? (
                        <EmptyState
                            icon={<CalendarIcon className="h-8 w-8" />}
                            title="No events found"
                            message="Try adjusting your search or add a new event."
                            actionLabel="Add Event"
                            onAction={handleCreate}
                        />
                    ) : (
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Event</TableHeaderCell>
                                        <TableHeaderCell>Description</TableHeaderCell>
                                        <TableHeaderCell>Date</TableHeaderCell>
                                        <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedEvents.map((event) => (
                                        <TableRow key={event.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {event.imageUrl && (
                                                        <img
                                                            src={event.imageUrl}
                                                            alt={event.title}
                                                            className="h-9 w-9 rounded-lg object-cover shrink-0"
                                                        />
                                                    )}
                                                    <span className="font-medium text-text-primary">{event.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                        <span className="line-clamp-1 text-text-secondary text-sm">
                          {event.description}
                        </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-text-secondary">{event.date}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end flex-wrap">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(event)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(event)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-default">
                                    <p className="text-sm text-text-secondary">
                                        Showing {(currentPage - 1) * PAGE_SIZE + 1}–
                                        {Math.min(currentPage * PAGE_SIZE, filteredEvents.length)} of{' '}
                                        {filteredEvents.length}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeftIcon className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRightIcon className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            {EventFormModal}

            <ConfirmModal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={confirmDelete}
                title="Delete Event"
                message={
                    deleteConfirm
                        ? `Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`
                        : ''
                }
                confirmLabel="Delete"
                confirmVariant="danger"
                isLoading={isDeleting}
            />
        </div>
    );
};