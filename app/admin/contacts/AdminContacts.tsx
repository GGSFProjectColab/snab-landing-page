"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  RefreshCw,
  Copy,
  Check,
  Eye,
  X,
  AlertCircle,
  Inbox,
  Send,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import {
  type ContactSubmission,
  type ContactStatus,
  formatContactDate,
  formatTimeAgo,
} from "@/lib/contacts";

const STATUS_CONFIG: Record<
  ContactStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  unread: {
    label: "Unread",
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    border: "border-teal-500/30",
  },
  read: {
    label: "Read",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  replied: {
    label: "Replied",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  archived: {
    label: "Archived",
    bg: "bg-zinc-500/10",
    text: "text-zinc-400",
    border: "border-zinc-500/30",
  },
};

function escapeHtml(str: string): string {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function AdminContacts() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ContactStatus>("all");

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals & Details
  const [viewingContact, setViewingContact] = useState<ContactSubmission | null>(null);
  const [deletingContact, setDeletingContact] = useState<ContactSubmission | null>(null);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchContacts = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) {
        throw new Error("Failed to load contacts. Please verify authentication.");
      }
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err: any) {
      setError(err.message || "Failed to load contact inquiries.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesStatus =
        statusFilter === "all" ? true : c.status === statusFilter;

      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [contacts, statusFilter, search]);

  const unreadCount = useMemo(
    () => contacts.filter((c) => c.status === "unread").length,
    [contacts]
  );

  // Copy email helper
  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Status update
  const handleStatusChange = async (id: string, newStatus: ContactStatus) => {
    try {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      if (viewingContact && viewingContact.id === id) {
        setViewingContact((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_status",
          id,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update status.");
      }
    } catch (err: any) {
      setError(err.message);
      fetchContacts(true);
    }
  };

  // Single delete
  const handleDeleteContact = async (id: string) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_contact", id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete contact.");
      }

      setContacts((prev) => prev.filter((c) => c.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      if (viewingContact?.id === id) {
        setViewingContact(null);
      }
      setDeletingContact(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Bulk status update
  const handleBulkStatusChange = async (newStatus: ContactStatus) => {
    if (selectedIds.length === 0) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "bulk_update_status",
          ids: selectedIds,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update selected contacts.");
      }

      setContacts((prev) =>
        prev.map((c) =>
          selectedIds.includes(c.id) ? { ...c, status: newStatus } : c
        )
      );
      setSelectedIds([]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "bulk_delete",
          ids: selectedIds,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete selected contacts.");
      }

      setContacts((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      setIsBulkDeleting(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Mark all unread as read
  const handleMarkAllRead = async () => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "mark_all_read" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to mark all as read.");
      }

      setContacts((prev) =>
        prev.map((c) => (c.status === "unread" ? { ...c, status: "read" } : c))
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Selection toggle
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredContacts.map((c) => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openContactDetails = (contact: ContactSubmission) => {
    setViewingContact(contact);
    if (contact.status === "unread") {
      handleStatusChange(contact.id, "read");
    }
  };

  // ==================== CSV Export ====================
  const exportAsCSV = (dataToExport: ContactSubmission[]) => {
    if (dataToExport.length === 0) {
      alert("No contacts to export.");
      return;
    }

    const headers = ["ID", "Name", "Email", "Status", "Received Date", "Message"];
    const rows = dataToExport.map((contact) => [
      `"${(contact.id || "").replace(/"/g, '""')}"`,
      `"${(contact.name || "").replace(/"/g, '""')}"`,
      `"${(contact.email || "").replace(/"/g, '""')}"`,
      `"${(contact.status || "").replace(/"/g, '""')}"`,
      `"${formatContactDate(contact.created_at).replace(/"/g, '""')}"`,
      `"${(contact.message || "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute("download", `snab-contacts-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ==================== PDF Export ====================
  const exportAsPDF = (dataToExport: ContactSubmission[]) => {
    if (dataToExport.length === 0) {
      alert("No contacts to export.");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to export as PDF.");
      return;
    }

    const dateStr = formatContactDate(new Date().toISOString());
    const rowsHtml = dataToExport
      .map(
        (c, idx) => `
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 11px;">
          <td style="padding: 8px 6px; vertical-align: top; width: 25px; color: #64748b;">${idx + 1}</td>
          <td style="padding: 8px 6px; vertical-align: top; font-weight: 600; width: 130px; color: #0f172a;">${escapeHtml(c.name)}</td>
          <td style="padding: 8px 6px; vertical-align: top; color: #0284c7; width: 160px;">${escapeHtml(c.email)}</td>
          <td style="padding: 8px 6px; vertical-align: top; width: 75px;">
            <span style="display: inline-block; padding: 2px 6px; font-size: 9px; font-family: monospace; text-transform: uppercase; border-radius: 3px; background: #f1f5f9; border: 1px solid #cbd5e1;">
              ${c.status}
            </span>
          </td>
          <td style="padding: 8px 6px; vertical-align: top; width: 120px; font-family: monospace; font-size: 10px; color: #64748b;">${formatContactDate(c.created_at)}</td>
          <td style="padding: 8px 6px; vertical-align: top; color: #334155; line-height: 1.4; word-break: break-word;">${escapeHtml(c.message)}</td>
        </tr>
      `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SNAB Innovations - Contact Inquiries Export (${dateStr})</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4 landscape;
              margin: 12mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 15px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #0f172a;
              padding-bottom: 10px;
              margin-bottom: 12px;
            }
            .brand {
              font-size: 18px;
              font-weight: 700;
              letter-spacing: -0.5px;
            }
            .meta {
              text-align: right;
              font-size: 10px;
              color: #64748b;
              font-family: monospace;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              text-align: left;
            }
            th {
              background-color: #f8fafc;
              border-bottom: 2px solid #cbd5e1;
              padding: 8px 6px;
              font-size: 10px;
              font-family: monospace;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #475569;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="brand">SNAB Innovations</div>
              <div style="font-size: 12px; color: #475569; margin-top: 2px;">Contact Inquiries Export (${dataToExport.length} total entries)</div>
            </div>
            <div class="meta">
              <div>Export Date: ${dateStr}</div>
              <div>Dashboard: snab.ai / Admin</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Received</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  // Contacts to export (selected if any, otherwise filtered)
  const getExportData = () => {
    if (selectedIds.length > 0) {
      return contacts.filter((c) => selectedIds.includes(c.id));
    }
    return filteredContacts;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-dotted border-edge pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-caption uppercase tracking-widest text-primary">
              / Admin / Contacts /
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2">
            <Mail className="h-7 w-7 text-primary" />
            Contact Inquiries
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Incoming messages, client inquiries, and notes submitted via snab.ai
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* CSV Export Button */}
          <button
            onClick={() => exportAsCSV(getExportData())}
            disabled={loading || filteredContacts.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded border border-dotted border-edge bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-40"
            title="Export as CSV"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>Export CSV</span>
          </button>

          {/* PDF Export Button */}
          <button
            onClick={() => exportAsPDF(getExportData())}
            disabled={loading || filteredContacts.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded border border-dotted border-edge bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-40"
            title="Export as PDF / Print"
          >
            <FileText size={14} className="text-blue-400" />
            <span>Export PDF</span>
          </button>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded border border-dotted border-edge bg-muted/40 hover:bg-muted text-foreground transition-colors disabled:opacity-50"
            >
              <CheckCircle2 size={14} className="text-teal-400" />
              Mark all read
            </button>
          )}

          <button
            onClick={() => fetchContacts(true)}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded border border-dotted border-edge bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-50"
            title="Refresh contacts"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin text-primary" : "text-muted-foreground"}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded">
          <AlertCircle size={18} className="shrink-0" />
          <p className="flex-1">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Controls & Search */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between border-b border-dotted border-edge pb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or message..."
            className="w-full pl-9 pr-8 py-2 bg-background border border-dotted border-edge rounded text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-foreground transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {(
            [
              { key: "all", label: "All", count: contacts.length },
              {
                key: "unread",
                label: "Unread",
                count: contacts.filter((c) => c.status === "unread").length,
              },
              {
                key: "read",
                label: "Read",
                count: contacts.filter((c) => c.status === "read").length,
              },
              {
                key: "replied",
                label: "Replied",
                count: contacts.filter((c) => c.status === "replied").length,
              },
              {
                key: "archived",
                label: "Archived",
                count: contacts.filter((c) => c.status === "archived").length,
              },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  active
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active
                      ? "bg-background/20 text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bulk action toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 border border-dotted border-primary/40 rounded animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-semibold text-primary">
              {selectedIds.length}
            </span>
            <span className="text-muted-foreground">selected of {filteredContacts.length}</span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-muted-foreground hover:text-foreground underline ml-2"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportAsCSV(getExportData())}
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-edge bg-background hover:bg-muted text-foreground transition-colors flex items-center gap-1"
              title="Export selected as CSV"
            >
              <FileSpreadsheet size={12} className="text-emerald-400" />
              CSV
            </button>

            <button
              onClick={() => exportAsPDF(getExportData())}
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-edge bg-background hover:bg-muted text-foreground transition-colors flex items-center gap-1"
              title="Export selected as PDF"
            >
              <FileText size={12} className="text-blue-400" />
              PDF
            </button>

            <button
              onClick={() => handleBulkStatusChange("read")}
              disabled={actionLoading}
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-edge bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-50"
            >
              Mark Read
            </button>
            <button
              onClick={() => handleBulkStatusChange("replied")}
              disabled={actionLoading}
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-edge bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-50"
            >
              Mark Replied
            </button>
            <button
              onClick={() => handleBulkStatusChange("archived")}
              disabled={actionLoading}
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-edge bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-50"
            >
              Archive
            </button>
            <button
              onClick={() => setIsBulkDeleting(true)}
              disabled={actionLoading}
              className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              <Trash2 size={12} />
              Delete ({selectedIds.length})
            </button>
          </div>
        </div>
      )}

      {/* Main Table / List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-20 border border-dotted border-edge rounded bg-muted/20 animate-pulse"
            />
          ))}
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="border border-dotted border-edge p-12 text-center rounded bg-card/20 flex flex-col items-center justify-center">
          <Inbox className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <h3 className="text-base font-medium text-foreground">No inquiries found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            {search || statusFilter !== "all"
              ? "No messages matched your filter criteria. Try clearing search or selecting another tab."
              : "When visitors submit the contact form on your site, their messages will appear here in real-time."}
          </p>
          {(search || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="mt-4 px-3 py-1.5 text-xs font-mono uppercase tracking-wider border border-dotted border-edge bg-background hover:bg-muted text-foreground rounded transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="border border-dotted border-edge rounded overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[36px_1.5fr_1.8fr_1fr_120px] sm:grid-cols-[40px_1.8fr_2.5fr_1.2fr_130px] items-center px-4 py-2.5 bg-muted/30 border-b border-dotted border-edge font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={
                  filteredContacts.length > 0 &&
                  selectedIds.length === filteredContacts.length
                }
                onChange={toggleSelectAll}
                className="h-3.5 w-3.5 rounded border-edge bg-background text-primary focus:ring-0 cursor-pointer"
                aria-label="Select all"
              />
            </div>
            <div>Sender</div>
            <div>Message</div>
            <div>Date</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Contact list rows */}
          <div className="divide-y divide-dotted divide-edge">
            {filteredContacts.map((contact) => {
              const isSelected = selectedIds.includes(contact.id);
              const statusMeta = STATUS_CONFIG[contact.status] || STATUS_CONFIG.unread;
              const isUnread = contact.status === "unread";

              return (
                <div
                  key={contact.id}
                  className={`grid grid-cols-[36px_1.5fr_1.8fr_1fr_120px] sm:grid-cols-[40px_1.8fr_2.5fr_1.2fr_130px] items-center px-4 py-3.5 hover:bg-muted/30 transition-colors ${
                    isUnread ? "bg-muted/15 font-medium" : ""
                  } ${isSelected ? "bg-primary/5" : ""}`}
                >
                  {/* Checkbox */}
                  <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(contact.id)}
                      className="h-3.5 w-3.5 rounded border-edge bg-background text-primary focus:ring-0 cursor-pointer"
                      aria-label={`Select ${contact.name}`}
                    />
                  </div>

                  {/* Sender Info */}
                  <div
                    className="min-w-0 pr-3 cursor-pointer"
                    onClick={() => openContactDetails(contact)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-muted border border-edge flex items-center justify-center font-mono text-xs text-foreground uppercase shrink-0">
                        {contact.name.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-sm text-foreground truncate">
                            {contact.name}
                          </span>
                          {isUnread && (
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                          <span className="truncate">{contact.email}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyEmail(contact.email, contact.id);
                            }}
                            className="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                            title="Copy email"
                          >
                            {copiedId === contact.id ? (
                              <Check size={11} className="text-teal-400" />
                            ) : (
                              <Copy size={11} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Snippet */}
                  <div
                    className="min-w-0 pr-3 cursor-pointer"
                    onClick={() => openContactDetails(contact)}
                  >
                    <p className="text-xs text-muted-foreground truncate line-clamp-1 hover:text-foreground transition-colors">
                      {contact.message}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}
                      >
                        {statusMeta.label}
                      </span>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div
                    className="cursor-pointer min-w-0"
                    onClick={() => openContactDetails(contact)}
                  >
                    <p className="text-xs text-foreground font-mono">
                      {formatTimeAgo(contact.created_at)}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate font-mono hidden sm:block">
                      {formatContactDate(contact.created_at)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openContactDetails(contact)}
                      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>

                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent(
                        "Regarding your inquiry at SNAB Innovations"
                      )}`}
                      onClick={() => {
                        if (contact.status === "unread" || contact.status === "read") {
                          handleStatusChange(contact.id, "replied");
                        }
                      }}
                      className="p-1.5 text-muted-foreground hover:text-emerald-400 hover:bg-muted rounded transition-colors"
                      title="Reply via Email"
                    >
                      <Send size={14} />
                    </a>

                    <button
                      onClick={() => setDeletingContact(contact)}
                      className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-muted rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View Contact Detail Modal */}
      {viewingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-background border border-dotted border-edge rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-dotted border-edge bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted border border-edge flex items-center justify-center font-mono text-sm text-foreground uppercase">
                  {viewingContact.name.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {viewingContact.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`mailto:${viewingContact.email}`}
                      className="text-xs text-primary hover:underline font-mono"
                    >
                      {viewingContact.email}
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyEmail(viewingContact.email, viewingContact.id)
                      }
                      className="text-muted-foreground hover:text-foreground text-xs"
                      title="Copy email"
                    >
                      {copiedId === viewingContact.id ? (
                        <Check size={12} className="text-teal-400" />
                      ) : (
                        <Copy size={12} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewingContact(null)}
                  className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Meta information row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-3 bg-muted/20 border border-dotted border-edge rounded text-xs font-mono">
                <div>
                  <span className="text-muted-foreground block">Received:</span>
                  <span className="text-foreground">
                    {formatContactDate(viewingContact.created_at)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Relative:</span>
                  <span className="text-foreground">
                    {formatTimeAgo(viewingContact.created_at)}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-muted-foreground block">Status:</span>
                  <div className="mt-1 flex items-center gap-1">
                    {(
                      ["unread", "read", "replied", "archived"] as ContactStatus[]
                    ).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(viewingContact.id, st)}
                        className={`px-2 py-0.5 text-[10px] uppercase rounded border font-mono transition-colors ${
                          viewingContact.status === st
                            ? "bg-foreground text-background font-semibold border-foreground"
                            : "text-muted-foreground border-edge hover:text-foreground"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="font-mono text-caption uppercase tracking-widest text-muted-foreground block mb-2">
                  Message Content
                </label>
                <div className="p-4 bg-card/40 border border-dotted border-edge rounded-md text-sm text-foreground leading-relaxed whitespace-pre-wrap font-sans select-text">
                  {viewingContact.message}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-dotted border-edge bg-muted/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setDeletingContact(viewingContact);
                }}
                className="px-3 py-2 text-xs font-mono uppercase tracking-wider rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Delete
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewingContact(null)}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-edge hover:bg-muted text-foreground transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${viewingContact.email}?subject=${encodeURIComponent(
                    "Regarding your inquiry at SNAB Innovations"
                  )}`}
                  onClick={() => {
                    handleStatusChange(viewingContact.id, "replied");
                  }}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded bg-foreground text-background hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                  <Send size={13} />
                  Reply via Mail
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Single Delete Confirmation Modal */}
      {deletingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-background border border-dotted border-edge rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Delete Contact Inquiry?
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Are you sure you want to delete the message from{" "}
                  <span className="font-semibold text-foreground">
                    {deletingContact.name}
                  </span>{" "}
                  ({deletingContact.email})? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingContact(null)}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-edge hover:bg-muted text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteContact(deletingContact.id)}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-1.5"
              >
                {actionLoading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {isBulkDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-background border border-dotted border-edge rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Delete {selectedIds.length} Selected Inquiries?
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Are you sure you want to delete these {selectedIds.length}{" "}
                  contact inquiries? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsBulkDeleting(false)}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded border border-edge hover:bg-muted text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkDelete}
                disabled={actionLoading}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-1.5"
              >
                {actionLoading ? "Deleting..." : "Confirm Delete All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
