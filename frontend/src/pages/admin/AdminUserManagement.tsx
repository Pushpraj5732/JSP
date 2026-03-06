import { useState } from 'react';
import { Search, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminUserManagement() {
    const [filter, setFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    const filters = ['ALL', 'PATIENTS', 'DOCTORS'];

    return (
        <div className="page-enter">
            <h1 className="font-heading font-bold text-[32px] text-txt-primary mb-6">User Management</h1>

            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex gap-1.5">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded text-sm font-heading font-semibold transition-all cursor-pointer ${filter === f
                                    ? 'bg-dark text-white'
                                    : 'bg-white text-txt-muted border border-border hover:bg-surface-alt'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative ml-auto w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-txt-muted" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input pl-10 py-2 text-sm"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="card-flat overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="table-header">
                                <th className="text-left px-5 py-3">User ID</th>
                                <th className="text-left px-5 py-3">Name</th>
                                <th className="text-left px-5 py-3">Email</th>
                                <th className="text-left px-5 py-3">Role</th>
                                <th className="text-left px-5 py-3">Registered</th>
                                <th className="text-center px-5 py-3">Status</th>
                                <th className="text-right px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={7} className="text-center py-16">
                                    <Users className="w-10 h-10 text-txt-muted mx-auto mb-3" />
                                    <p className="font-body text-sm text-txt-muted">No users found</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1">
                <button onClick={() => setPage(Math.max(1, page - 1))} className="w-8 h-8 flex items-center justify-center border border-border rounded text-txt-muted hover:bg-surface-alt cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                </button>
                {[1, 2, 3].map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 flex items-center justify-center rounded text-sm font-mono cursor-pointer transition-all ${page === p ? 'bg-dark text-white' : 'border border-border text-txt-muted hover:bg-surface-alt'
                            }`}
                    >
                        {p}
                    </button>
                ))}
                <button onClick={() => setPage(page + 1)} className="w-8 h-8 flex items-center justify-center border border-border rounded text-txt-muted hover:bg-surface-alt cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
