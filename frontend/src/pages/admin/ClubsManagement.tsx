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
import { UserGroupIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clubsDataJson from '../../_mock/ClubInfo.json';
import type { Club } from '../../types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ClubFormData {
    name: string;
    description: string;
    members: number;
    imageUrl: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 5;

const initialClubs = clubsDataJson as Club[];

const emptyForm = (): ClubFormData => ({
    name: '',
    description: '',
    members: 0,
    imageUrl: '',
});

// ── Component ─────────────────────────────────────────────────────────────────

export const ClubsManagement: React.FC = () => {
    const toast = useToast();

    // ── State ──────────────────────────────────────────────────────────────────
    const [clubs, setClubs] = useState<Club[]>(initialClubs);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingClub, setEditingClub] = useState<Club | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<{ id: number; name: string } | null>(null);

    const [formData, setFormData] = useState<ClubFormData>(emptyForm());
    const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});

    // ── Derived data ───────────────────────────────────────────────────────────
    const filteredClubs = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return clubs;
        return clubs.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                (c.description?.toLowerCase().includes(q) ?? false)
        );
    }, [clubs, search]);

    const paginatedClubs = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredClubs.slice(start, start + PAGE_SIZE);
    }, [filteredClubs, currentPage]);

    const totalPages = Math.ceil(filteredClubs.length / PAGE_SIZE);

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleCreate = useCallback(() => {
        setFormData(emptyForm());
        setFormErrors({});
        setEditingClub(null);
        setIsCreateModalOpen(true);
    }, []);

    const handleEdit = useCallback((club: Club) => {
        setFormData({
            name: club.name,
            description: club.description ?? '',
            members: club.members,
            imageUrl: club.imageUrl ?? '',
        });
        setFormErrors({});
        setEditingClub(club);
        setIsCreateModalOpen(false);
    }, []);

    const closeFormModal = useCallback(() => {
        setIsCreateModalOpen(false);
        setEditingClub(null);
    }, []);

    const handleSave = useCallback(async () => {
        const errors: Record<string, string | undefined> = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);
        try {
            if (editingClub) {
                setClubs((prev) =>
                    prev.map((c) =>
                        c.id === editingClub.id
                            ? {
                                ...c,
                                name: formData.name,
                                description: formData.description,
                                members: formData.members,
                                imageUrl: formData.imageUrl || c.imageUrl,
                            }
                            : c
                    )
                );
                toast.success('Club updated successfully');
            } else {
                const newClub: Club = {
                    id: Date.now(),
                    name: formData.name,
                    description: formData.description,
                    members: formData.members,
                    imageUrl: formData.imageUrl || undefined,
                };
                setClubs((prev) => [newClub, ...prev]);
                toast.success('Club created successfully');
            }
            setIsCreateModalOpen(false);
            setEditingClub(null);
        } catch {
            toast.error('Failed to save club');
        } finally {
            setIsLoading(false);
        }
    }, [formData, editingClub, toast]);

    const handleDelete = useCallback((club: Club) => {
        setDeleteConfirm({ id: club.id, name: club.name });
    }, []);

    const confirmDelete = useCallback(async () => {
        if (!deleteConfirm) return;
        setIsDeleting(true);
        try {
            setClubs((prev) => prev.filter((c) => c.id !== deleteConfirm.id));
            toast.success('Club deleted');
            setDeleteConfirm(null);
        } catch {
            toast.error('Failed to delete club');
        } finally {
            setIsDeleting(false);
        }
    }, [deleteConfirm, toast]);

    const setField = useCallback(
        <K extends keyof ClubFormData>(key: K, value: ClubFormData[K]) => {
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
    const ClubFormModal = (
        <Modal
            isOpen={isCreateModalOpen || !!editingClub}
            onClose={closeFormModal}
            title={editingClub ? 'Edit Club' : 'Add Club'}
            size="md"
        >
            <div className="space-y-4">
                <Input
                    label="Club Name"
                    value={formData.name}
                    onChange={(e) => setField('name', e.target.value)}
                    error={formErrors.name}
                    placeholder="Enter club name"
                />

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                        Description
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setField('description', e.target.value)}
                        rows={3}
                        placeholder="Enter club description"
                        className="w-full p-3 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus resize-none"
                    />
                    {formErrors.description && (
                        <p className="text-sm text-red-500 mt-1">{formErrors.description}</p>
                    )}
                </div>

                <Input
                    label="Member Count"
                    type="number"
                    value={String(formData.members)}
                    onChange={(e) => setField('members', Number(e.target.value))}
                    placeholder="0"
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
                        {isLoading ? 'Saving...' : editingClub ? 'Update' : 'Create'}
                    </Button>
                </div>
            </div>
        </Modal>
    );

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Clubs</h1>
            <p className="text-text-secondary">Manage platform clubs</p>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <CardTitle>Clubs</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search clubs..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="p-2 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus w-full sm:w-48"
                        />
                        <Button variant="primary" size="sm" onClick={handleCreate}>
                            Add Club
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    {filteredClubs.length === 0 ? (
                        <EmptyState
                            icon={<UserGroupIcon className="h-8 w-8" />}
                            title="No clubs found"
                            message="Try adjusting your search or add a new club."
                            actionLabel="Add Club"
                            onAction={handleCreate}
                        />
                    ) : (
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderCell>Club</TableHeaderCell>
                                        <TableHeaderCell>Description</TableHeaderCell>
                                        <TableHeaderCell>Members</TableHeaderCell>
                                        <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedClubs.map((club) => (
                                        <TableRow key={club.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {club.imageUrl && (
                                                        <img
                                                            src={club.imageUrl}
                                                            alt={club.name}
                                                            className="h-9 w-9 rounded-lg object-cover shrink-0"
                                                        />
                                                    )}
                                                    <span className="font-medium text-text-primary">{club.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                        <span className="line-clamp-1 text-text-secondary text-sm">
                          {club.description}
                        </span>
                                            </TableCell>
                                            <TableCell>{club.members.toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end flex-wrap">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEdit(club)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(club)}
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
                                        {Math.min(currentPage * PAGE_SIZE, filteredClubs.length)} of{' '}
                                        {filteredClubs.length}
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

            {ClubFormModal}

            <ConfirmModal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={confirmDelete}
                title="Delete Club"
                message={
                    deleteConfirm
                        ? `Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`
                        : ''
                }
                confirmLabel="Delete"
                confirmVariant="danger"
                isLoading={isDeleting}
            />
        </div>
    );
};
