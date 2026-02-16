import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle, Badge } from '../../components/ui/Card';
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
import type { AdminUser, AdminUserFormData } from '../../types/admin';
import { validateRequired } from '../../utils/validation';

const PAGE_SIZE = 5;

const mockUsers: AdminUser[] = [
  { id: '1', username: 'admin', role: 'admin', status: 'active' },
  { id: '2', username: 'user', role: 'user', status: 'active' },
  { id: '3', username: 'jane', role: 'user', status: 'active' },
  { id: '4', username: 'bob', role: 'user', status: 'suspended' },
  { id: '5', username: 'alice', role: 'user', status: 'active' },
];

export const UserManagement: React.FC = () => {
  const toast = useToast();
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; username: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<AdminUserFormData>({
    username: '',
    role: 'user',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        (u.email?.toLowerCase().includes(q) ?? false)
    );
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const handleCreate = useCallback(() => {
    setFormData({ username: '', role: 'user', status: 'active' });
    setFormErrors({});
    setEditingUser(null);
    setIsCreateModalOpen(true);
  }, []);

  const handleEdit = useCallback((user: AdminUser) => {
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setFormErrors({});
    setEditingUser(user);
    setIsCreateModalOpen(false);
  }, []);

  const closeFormModal = useCallback(() => {
    setIsCreateModalOpen(false);
    setEditingUser(null);
  }, []);

  const handleSave = useCallback(async () => {
    const usernameErr = validateRequired(formData.username, 'Username');
    setFormErrors({ username: usernameErr || undefined });
    if (usernameErr) return;

    setIsLoading(true);
    try {
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  username: formData.username,
                  email: formData.email ?? u.email,
                  role: formData.role,
                  status: formData.status,
                }
              : u
          )
        );
        toast.success('User updated successfully');
      } else {
        const newUser: AdminUser = {
          id: String(Date.now()),
          username: formData.username,
          email: formData.email ?? undefined,
          role: formData.role,
          status: formData.status,
        };
        setUsers((prev) => [newUser, ...prev]);
        toast.success('User created successfully');
      }
      setIsCreateModalOpen(false);
      setEditingUser(null);
    } catch {
      toast.error('Failed to save user');
    } finally {
      setIsLoading(false);
    }
  }, [formData, editingUser, toast]);

  const handleDelete = useCallback((user: AdminUser) => {
    setDeleteConfirm({ id: user.id, username: user.username });
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteConfirm) return;
    setIsDeleting(true);
    try {
      setUsers((prev) => prev.filter((u) => u.id !== deleteConfirm.id));
      toast.success('User deleted');
      setDeleteConfirm(null);
    } catch {
      toast.error('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  }, [deleteConfirm, toast]);

  const handleToggleStatus = useCallback((user: AdminUser) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      )
    );
    toast.success(`User ${user.status === 'active' ? 'suspended' : 'activated'}`);
  }, [toast]);

  const UserFormModal = (
    <Modal
      isOpen={isCreateModalOpen || !!editingUser}
      onClose={closeFormModal}
      title={editingUser ? 'Edit User' : 'Add User'}
      size="md"
    >
      <div className="space-y-4">
        <Input
          label="Username"
          value={formData.username}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, username: e.target.value }));
            setFormErrors((prev) => {
              const next = { ...prev };
              delete next.username;
              return next;
            });
          }}
          error={formErrors.username}
          placeholder="Enter username"
        />
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Role</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                role: e.target.value as 'user' | 'admin',
              }))
            }
            className="w-full p-3 rounded-lg border border-input-border bg-bg-primary text-text-primary"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value as 'active' | 'suspended',
              }))
            }
            className="w-full p-3 rounded-lg border border-input-border bg-bg-primary text-text-primary"
          >
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <Button variant="ghost" onClick={closeFormModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : editingUser ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">User Management</h1>
      <p className="text-text-secondary">Manage platform users</p>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <CardTitle>Users</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 rounded-lg border border-input-border bg-bg-primary text-text-primary focus:outline-none focus:border-input-focus w-full sm:w-48"
            />
            <Button variant="primary" size="sm" onClick={handleCreate}>
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <EmptyState
              icon={<UserGroupIcon className="h-8 w-8" />}
              title="No users found"
              message="Try adjusting your search or add a new user."
              actionLabel="Add User"
              onAction={handleCreate}
            />
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Username</TableHeaderCell>
                    <TableHeaderCell>Role</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end flex-wrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(user)}
                          >
                            {user.status === 'active' ? 'Suspend' : 'Activate'}
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(user)}
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
                    {Math.min(currentPage * PAGE_SIZE, filteredUsers.length)} of {filteredUsers.length}
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

      {UserFormModal}

      <ConfirmModal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={
          deleteConfirm
            ? `Are you sure you want to delete "${deleteConfirm.username}"? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        confirmVariant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};
