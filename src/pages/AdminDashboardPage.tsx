import React, { useCallback, useEffect, useState } from 'react';
import { LogOut, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { CLUB_IMAGES } from '../data/clubData';
import type {
  BookingRecord,
  DayOfWeek,
  EnquiryRecord,
  FreeTrialLead,
  GalleryItem,
  GymClass,
  MemberRecord,
  MembershipPlan,
  PaymentRecord,
  RolePermissionMatrix,
  ScheduleSlot,
  SiteContent,
  TrainerCategory,
  TrainerProfile,
  TrainingCategory,
} from '../types/forge';

type AdminModule =
  | 'overview'
  | 'members'
  | 'plans'
  | 'payments'
  | 'trainers'
  | 'classes'
  | 'schedules'
  | 'bookings'
  | 'leads'
  | 'enquiries'
  | 'content'
  | 'gallery';

interface AdminOverviewData {
  members: MemberRecord[];
  plans: MembershipPlan[];
  payments: PaymentRecord[];
  trainers: TrainerProfile[];
  classes: GymClass[];
  schedules: ScheduleSlot[];
  bookings: BookingRecord[];
  leads: FreeTrialLead[];
  enquiries: EnquiryRecord[];
  siteContent: SiteContent;
  gallery: GalleryItem[];
  newsletterCount: number;
  roles: RolePermissionMatrix[];
}

export function AdminDashboardPage() {
  const { token, user, setSession, logout, refreshPublicData } = useClub();

  const [adminStatus, setAdminStatus] = useState<{ configured: boolean; envConfigured: boolean } | null>(null);
  const [authName, setAuthName] = useState('Club Director');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);

  const [activeModule, setActiveModule] = useState<AdminModule>('overview');
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Form states for Trainers, Classes, Schedules, Gallery, Content
  const [newTrainerName, setNewTrainerName] = useState('');
  const [newTrainerRole, setNewTrainerRole] = useState('');
  const [newTrainerCat, setNewTrainerCat] = useState<TrainerCategory>('Strength Coach');
  const [newTrainerBio, setNewTrainerBio] = useState('');

  const [newClassName, setNewClassName] = useState('');
  const [newClassCat, setNewClassCat] = useState<TrainingCategory>('Strength');
  const [newClassDesc, setNewClassDesc] = useState('');

  const [newSchedClass, setNewSchedClass] = useState('Forge Barbell Club');
  const [newSchedDay, setNewSchedDay] = useState<DayOfWeek>('Monday');
  const [newSchedTime, setNewSchedTime] = useState('07:30');
  const [newSchedTrainer, setNewSchedTrainer] = useState('Vikram Deshmukh');

  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCat, setNewGalCat] = useState<GalleryItem['category']>('Strength');
  const [newGalCaption, setNewGalCaption] = useState('');
  const [newGalImg, setNewGalImg] = useState<string>(CLUB_IMAGES.strengthZone);

  const [contentForm, setContentForm] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch('/api/auth/admin-status')
      .then((r) => r.json())
      .then((d) => setAdminStatus(d))
      .catch(() => setAdminStatus({ configured: false, envConfigured: false }));
  }, []);

  const loadAdminOverview = useCallback(async () => {
    if (!token || user?.role !== 'admin') return;
    const res = await fetch('/api/admin/overview', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const payload = (await res.json()) as AdminOverviewData;
      setData(payload);
      setContentForm(payload.siteContent);
    }
  }, [token, user?.role]);

  useEffect(() => {
    void loadAdminOverview();
  }, [loadAdminOverview]);

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthBusy(true);
    try {
      const isClaim = adminStatus && !adminStatus.configured;
      const endpoint = isClaim ? '/api/auth/admin-claim' : '/api/auth/login';
      const body = isClaim
        ? { name: authName, email: authEmail, password: authPassword }
        : { email: authEmail, password: authPassword, portal: 'admin' };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const resData = await res.json();
      if (!res.ok) {
        setAuthError(resData.error || 'Admin authentication failed.');
      } else {
        setSession(resData.token, resData.user);
        setAdminStatus({ configured: true, envConfigured: Boolean(adminStatus?.envConfigured) });
      }
    } catch {
      setAuthError('Network error.');
    } finally {
      setAuthBusy(false);
    }
  };

  const notify = (msg: string) => setStatusMessage(msg);

  // Admin gate
  if (!token || user?.role !== 'admin') {
    const needsSetup = adminStatus && !adminStatus.configured;
    return (
      <main className="bg-[#171916] text-[#F5F4EF] py-16 lg:py-24 min-h-[75vh]">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-3">
            <ShieldCheck className="w-4 h-4" /> Protected Club Operations
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            {needsSetup ? 'Claim Admin Access' : 'Admin Dashboard Sign In'}
          </h1>
          <p className="text-sm text-[#92958E] mt-2">
            {needsSetup
              ? 'First-run setup: establish your Director email and password (minimum 8 characters) to lock and protect the Forge Athletics Admin Console.'
              : adminStatus?.envConfigured
              ? 'Enter the server-configured admin passcode to access operations.'
              : 'Sign in with your claimed Admin Director credentials.'}
          </p>

          <form
            onSubmit={handleAdminAuth}
            className="mt-8 bg-[#1F221D] border border-[#2E332B] p-6 sm:p-8 space-y-4"
          >
            {needsSetup && (
              <div>
                <label className="block text-xs text-[#92958E] mb-1.5">Director Name</label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>
            )}

            {!adminStatus?.envConfigured && (
              <div>
                <label className="block text-xs text-[#92958E] mb-1.5">Admin Email</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="director@forgeathletics.in"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-[#92958E] mb-1.5">
                {adminStatus?.envConfigured ? 'Admin Passcode' : 'Password (min 8 chars)'}
              </label>
              <input
                type="password"
                required
                minLength={needsSetup ? 8 : 4}
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/60 px-3 py-2">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authBusy}
              className="w-full py-3.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-widest hover:bg-[#D4F88A] transition-colors"
            >
              {authBusy ? 'Verifying...' : needsSetup ? 'Initialize & Lock Admin Account' : 'Sign In To Admin'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const modules: { id: AdminModule; label: string }[] = [
    { id: 'overview', label: 'Overview & Roles' },
    { id: 'members', label: 'Members' },
    { id: 'plans', label: 'Membership Plans' },
    { id: 'payments', label: 'Payments' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'classes', label: 'Classes' },
    { id: 'schedules', label: 'Schedules' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'leads', label: 'Free Trial Leads' },
    { id: 'enquiries', label: 'Enquiries' },
    { id: 'content', label: 'Website Content' },
    { id: 'gallery', label: 'Gallery Management' },
  ];

  const totalRevenue =
    data?.payments.filter((p) => p.status === 'Paid').reduce((acc, p) => acc + p.amountInr, 0) || 0;

  return (
    <main className="bg-[#171916] text-[#F5F4EF] min-h-[85vh]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#272B24]">
          <div>
            <p className="text-xs font-mono text-[#C5F36A] uppercase">
              Admin Operations / {modules.find((m) => m.id === activeModule)?.label}
            </p>
            <h1 className="font-display text-4xl font-bold uppercase mt-1">
              Forge Club Control Center
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#92958E] hidden md:inline">{user.email}</span>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2.5 border border-[#2E332B] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 hover:border-[#F5F4EF]"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="mt-5 px-4 py-3 bg-[#1F221D] border border-[#C5F36A]/60 text-xs text-[#C5F36A] flex items-center justify-between">
            <span>{statusMessage}</span>
            <button type="button" onClick={() => setStatusMessage('')} className="underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:hidden mb-4">
              <select
                value={activeModule}
                onChange={(e) => setActiveModule(e.target.value as AdminModule)}
                className="w-full bg-[#1F221D] border border-[#2E332B] px-4 py-3 text-sm text-[#F5F4EF]"
              >
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden lg:flex flex-col space-y-1">
              {modules.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveModule(m.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    activeModule === m.id
                      ? 'bg-[#C5F36A] text-[#171916] font-bold'
                      : 'bg-[#1F221D] text-[#92958E] hover:text-[#F5F4EF] border border-[#272B24]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Module Canvas */}
          <div className="lg:col-span-9">
            {!data ? (
              <div className="p-8 bg-[#1F221D] border border-[#2E332B] text-sm text-[#92958E]">
                Loading club operations...
              </div>
            ) : (
              <>
                {/* 1. OVERVIEW & RBAC */}
                {activeModule === 'overview' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-5 bg-[#1F221D] border border-[#2E332B]">
                        <span className="text-xs text-[#92958E]">Active Members</span>
                        <div className="font-mono text-3xl font-bold tabular-nums mt-1 text-[#F5F4EF]">
                          {data.members.filter((m) => m.status === 'Active').length}
                        </div>
                      </div>
                      <div className="p-5 bg-[#1F221D] border border-[#2E332B]">
                        <span className="text-xs text-[#92958E]">Collected Revenue</span>
                        <div className="font-mono text-3xl font-bold tabular-nums mt-1 text-[#C5F36A]">
                          ₹{totalRevenue.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="p-5 bg-[#1F221D] border border-[#2E332B]">
                        <span className="text-xs text-[#92958E]">Free Trial Leads</span>
                        <div className="font-mono text-3xl font-bold tabular-nums mt-1 text-[#F5F4EF]">
                          {data.leads.length}
                        </div>
                      </div>
                      <div className="p-5 bg-[#1F221D] border border-[#2E332B]">
                        <span className="text-xs text-[#92958E]">Newsletter List</span>
                        <div className="font-mono text-3xl font-bold tabular-nums mt-1 text-[#F5F4EF]">
                          {data.newsletterCount}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1F221D] border border-[#2E332B] p-6 overflow-x-auto">
                      <h2 className="font-display text-2xl font-bold uppercase mb-4">
                        Role-Based Permissions Matrix
                      </h2>
                      <table className="w-full text-left text-sm min-w-[600px]">
                        <thead>
                          <tr className="border-b border-[#2E332B] text-xs uppercase text-[#92958E]">
                            <th className="py-3 pr-4">Role</th>
                            <th className="py-3 px-3">Members</th>
                            <th className="py-3 px-3">Plans & Payments</th>
                            <th className="py-3 px-3">Schedules</th>
                            <th className="py-3 px-3">Leads & Enquiries</th>
                            <th className="py-3 px-3">Content & Gallery</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2E332B]">
                          {data.roles.map((r, rIdx) => (
                            <tr key={r.role}>
                              <td className="py-3 pr-4 font-semibold">{r.role}</td>
                              {(
                                [
                                  'members',
                                  'plansAndPayments',
                                  'schedulesAndClasses',
                                  'leadsAndEnquiries',
                                  'siteContentAndGallery',
                                ] as const
                              ).map((perm) => (
                                <td key={perm} className="py-3 px-3">
                                  <input
                                    type="checkbox"
                                    checked={r[perm]}
                                    disabled={r.role === 'Super Admin'}
                                    onChange={async (e) => {
                                      const updated = data.roles.map((item, idx) =>
                                        idx === rIdx ? { ...item, [perm]: e.target.checked } : item
                                      );
                                      await fetch('/api/admin/roles', {
                                        method: 'PATCH',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          Authorization: `Bearer ${token}`,
                                        },
                                        body: JSON.stringify({ roles: updated }),
                                      });
                                      await loadAdminOverview();
                                      notify('Role permissions updated.');
                                    }}
                                    className="accent-[#C5F36A] w-4 h-4"
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. MEMBERS */}
                {activeModule === 'members' && (
                  <div className="bg-[#1F221D] border border-[#2E332B] overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[680px]">
                      <thead>
                        <tr className="border-b border-[#2E332B] text-xs uppercase text-[#92958E]">
                          <th className="py-3.5 px-5">Member</th>
                          <th className="py-3.5 px-5">Plan</th>
                          <th className="py-3.5 px-5">Expiry</th>
                          <th className="py-3.5 px-5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E332B]">
                        {data.members.map((m) => (
                          <tr key={m.id}>
                            <td className="py-4 px-5">
                              <div className="font-semibold">{m.name}</div>
                              <div className="text-xs text-[#92958E]">
                                {m.email} · {m.phone}
                              </div>
                            </td>
                            <td className="py-4 px-5">
                              <select
                                value={m.planTier}
                                onChange={async (e) => {
                                  await fetch(`/api/admin/members/${m.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ planTier: e.target.value }),
                                  });
                                  await loadAdminOverview();
                                  notify(`Updated plan for ${m.name}.`);
                                }}
                                className="bg-[#171916] border border-[#2E332B] px-2.5 py-1.5 text-xs"
                              >
                                <option value="Essential">Essential</option>
                                <option value="Performance">Performance</option>
                                <option value="Elite">Elite</option>
                              </select>
                            </td>
                            <td className="py-4 px-5 font-mono text-xs tabular-nums">{m.expiryDate}</td>
                            <td className="py-4 px-5">
                              <select
                                value={m.status}
                                onChange={async (e) => {
                                  await fetch(`/api/admin/members/${m.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ status: e.target.value }),
                                  });
                                  await loadAdminOverview();
                                  notify(`Updated status for ${m.name}.`);
                                }}
                                className="bg-[#171916] border border-[#2E332B] px-2.5 py-1.5 text-xs"
                              >
                                <option value="Active">Active</option>
                                <option value="Paused">Paused</option>
                                <option value="Expired">Expired</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 3. PLANS */}
                {activeModule === 'plans' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {data.plans.map((plan) => (
                      <form
                        key={plan.id}
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const fd = new FormData(e.currentTarget);
                          await fetch(`/api/admin/plans/${plan.id}`, {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                              monthlyPriceInr: Number(fd.get('monthly')),
                              annualMonthlyPriceInr: Number(fd.get('annual')),
                              description: String(fd.get('desc')),
                            }),
                          });
                          await Promise.all([loadAdminOverview(), refreshPublicData()]);
                          notify(`${plan.tier} plan pricing synced to live site.`);
                        }}
                        className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-4"
                      >
                        <h3 className="font-display text-3xl font-bold uppercase text-[#C5F36A]">
                          {plan.tier}
                        </h3>
                        <div>
                          <label className="block text-xs text-[#92958E] mb-1">Monthly Price (INR)</label>
                          <input
                            name="monthly"
                            type="number"
                            defaultValue={plan.monthlyPriceInr}
                            className="w-full bg-[#171916] border border-[#2E332B] px-3 py-2 text-sm font-mono tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#92958E] mb-1">Annual Monthly (INR)</label>
                          <input
                            name="annual"
                            type="number"
                            defaultValue={plan.annualMonthlyPriceInr}
                            className="w-full bg-[#171916] border border-[#2E332B] px-3 py-2 text-sm font-mono tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#92958E] mb-1">Summary</label>
                          <textarea
                            name="desc"
                            rows={3}
                            defaultValue={plan.description}
                            className="w-full bg-[#171916] border border-[#2E332B] px-3 py-2 text-xs"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                        >
                          Save Plan
                        </button>
                      </form>
                    ))}
                  </div>
                )}

                {/* 4. PAYMENTS */}
                {activeModule === 'payments' && (
                  <div className="bg-[#1F221D] border border-[#2E332B] overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[640px]">
                      <thead>
                        <tr className="border-b border-[#2E332B] text-xs uppercase text-[#92958E]">
                          <th className="py-3.5 px-5">Member</th>
                          <th className="py-3.5 px-5">Plan</th>
                          <th className="py-3.5 px-5">Amount (INR)</th>
                          <th className="py-3.5 px-5">Date</th>
                          <th className="py-3.5 px-5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E332B]">
                        {data.payments.map((pay) => (
                          <tr key={pay.id}>
                            <td className="py-4 px-5 font-semibold">{pay.memberName}</td>
                            <td className="py-4 px-5 text-xs text-[#92958E]">
                              {pay.planTier} · {pay.billingCycle}
                            </td>
                            <td className="py-4 px-5 font-mono tabular-nums">
                              ₹{pay.amountInr.toLocaleString('en-IN')}
                            </td>
                            <td className="py-4 px-5 font-mono text-xs tabular-nums">{pay.paidDate}</td>
                            <td className="py-4 px-5">
                              <select
                                value={pay.status}
                                onChange={async (e) => {
                                  await fetch(`/api/admin/payments/${pay.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ status: e.target.value }),
                                  });
                                  await loadAdminOverview();
                                  notify('Payment status updated.');
                                }}
                                className="bg-[#171916] border border-[#2E332B] px-2.5 py-1.5 text-xs"
                              >
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                <option value="Overdue">Overdue</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 5. TRAINERS */}
                {activeModule === 'trainers' && (
                  <div className="space-y-6">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await fetch('/api/admin/trainers', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            name: newTrainerName,
                            roleTitle: newTrainerRole,
                            category: newTrainerCat,
                            shortBio: newTrainerBio,
                          }),
                        });
                        if (res.ok) {
                          setNewTrainerName('');
                          setNewTrainerRole('');
                          setNewTrainerBio('');
                          await Promise.all([loadAdminOverview(), refreshPublicData()]);
                          notify('Coach added to roster.');
                        }
                      }}
                      className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-4"
                    >
                      <h2 className="font-display text-2xl font-bold uppercase flex items-center gap-2">
                        <Plus className="w-5 h-5 text-[#C5F36A]" /> Add Specialist Coach
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          required
                          value={newTrainerName}
                          onChange={(e) => setNewTrainerName(e.target.value)}
                          placeholder="Coach Name"
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        />
                        <input
                          required
                          value={newTrainerRole}
                          onChange={(e) => setNewTrainerRole(e.target.value)}
                          placeholder="Role Title"
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        />
                        <select
                          value={newTrainerCat}
                          onChange={(e) => setNewTrainerCat(e.target.value as TrainerCategory)}
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        >
                          <option value="Strength Coach">Strength Coach</option>
                          <option value="Personal Trainer">Personal Trainer</option>
                          <option value="Functional Fitness Coach">Functional Fitness Coach</option>
                          <option value="Yoga Instructor">Yoga Instructor</option>
                          <option value="Nutrition Coach">Nutrition Coach</option>
                        </select>
                      </div>
                      <input
                        required
                        value={newTrainerBio}
                        onChange={(e) => setNewTrainerBio(e.target.value)}
                        placeholder="Short coaching biography..."
                        className="w-full bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                      >
                        Add Coach
                      </button>
                    </form>

                    <div className="divide-y divide-[#2E332B] border border-[#2E332B] bg-[#1F221D]">
                      {data.trainers.map((t) => (
                        <div key={t.id} className="p-5 flex items-center justify-between gap-4">
                          <div>
                            <div className="font-semibold">{t.name}</div>
                            <div className="text-xs text-[#92958E]">
                              {t.category} · {t.roleTitle}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              await fetch(`/api/admin/trainers/${t.id}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${token}` },
                              });
                              await Promise.all([loadAdminOverview(), refreshPublicData()]);
                              notify(`Removed ${t.name}.`);
                            }}
                            aria-label={`Remove ${t.name}`}
                            className="p-2 text-[#92958E] hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. CLASSES */}
                {activeModule === 'classes' && (
                  <div className="space-y-6">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await fetch('/api/admin/classes', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            name: newClassName,
                            category: newClassCat,
                            description: newClassDesc,
                          }),
                        });
                        if (res.ok) {
                          setNewClassName('');
                          setNewClassDesc('');
                          await Promise.all([loadAdminOverview(), refreshPublicData()]);
                          notify('New group class added.');
                        }
                      }}
                      className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-4"
                    >
                      <h2 className="font-display text-2xl font-bold uppercase">Create Class Discipline</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          required
                          value={newClassName}
                          onChange={(e) => setNewClassName(e.target.value)}
                          placeholder="Class Name"
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        />
                        <select
                          value={newClassCat}
                          onChange={(e) => setNewClassCat(e.target.value as TrainingCategory)}
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        >
                          <option value="Strength">Strength</option>
                          <option value="Weight Training">Weight Training</option>
                          <option value="Functional">Functional</option>
                          <option value="HIIT">HIIT</option>
                          <option value="Cardio">Cardio</option>
                          <option value="Cross Training">Cross Training</option>
                          <option value="Mobility & Recovery">Mobility & Recovery</option>
                        </select>
                      </div>
                      <input
                        required
                        value={newClassDesc}
                        onChange={(e) => setNewClassDesc(e.target.value)}
                        placeholder="Brief class description..."
                        className="w-full bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                      >
                        Add Class
                      </button>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.classes.map((c) => (
                        <div key={c.id} className="p-5 bg-[#1F221D] border border-[#2E332B]">
                          <div className="text-xs text-[#C5F36A]">
                            {c.category} · {c.durationMinutes} min · Cap {c.capacity}
                          </div>
                          <div className="font-display text-2xl font-bold uppercase mt-1">{c.name}</div>
                          <p className="text-xs text-[#92958E] mt-1">{c.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. SCHEDULES */}
                {activeModule === 'schedules' && (
                  <div className="space-y-6">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await fetch('/api/admin/schedules', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            className: newSchedClass,
                            day: newSchedDay,
                            time: newSchedTime,
                            trainerName: newSchedTrainer,
                          }),
                        });
                        if (res.ok) {
                          await Promise.all([loadAdminOverview(), refreshPublicData()]);
                          notify('New session slot published to weekly schedule.');
                        }
                      }}
                      className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-4"
                    >
                      <h2 className="font-display text-2xl font-bold uppercase">Add Schedule Slot</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input
                          required
                          value={newSchedClass}
                          onChange={(e) => setNewSchedClass(e.target.value)}
                          placeholder="Class Name"
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        />
                        <select
                          value={newSchedDay}
                          onChange={(e) => setNewSchedDay(e.target.value as DayOfWeek)}
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        >
                          {(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const).map(
                            (d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            )
                          )}
                        </select>
                        <input
                          required
                          value={newSchedTime}
                          onChange={(e) => setNewSchedTime(e.target.value)}
                          placeholder="07:30"
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm font-mono"
                        />
                        <input
                          required
                          value={newSchedTrainer}
                          onChange={(e) => setNewSchedTrainer(e.target.value)}
                          placeholder="Trainer"
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                      >
                        Publish Slot
                      </button>
                    </form>

                    <div className="divide-y divide-[#2E332B] border border-[#2E332B] bg-[#1F221D]">
                      {data.schedules.map((s) => (
                        <div key={s.id} className="p-4 flex items-center justify-between gap-4 text-sm">
                          <div>
                            <span className="font-mono text-[#C5F36A] mr-2">
                              {s.day} {s.time}
                            </span>
                            <span className="font-semibold">{s.className}</span>
                            <span className="text-xs text-[#92958E] ml-2">
                              ({s.trainerName} · {s.availableSlots}/{s.totalSlots} open)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              await fetch(`/api/admin/schedules/${s.id}`, {
                                method: 'DELETE',
                                headers: { Authorization: `Bearer ${token}` },
                              });
                              await Promise.all([loadAdminOverview(), refreshPublicData()]);
                              notify('Schedule slot deleted.');
                            }}
                            aria-label="Delete schedule slot"
                            className="p-2 text-[#92958E] hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. BOOKINGS */}
                {activeModule === 'bookings' && (
                  <div className="bg-[#1F221D] border border-[#2E332B] overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[640px]">
                      <thead>
                        <tr className="border-b border-[#2E332B] text-xs uppercase text-[#92958E]">
                          <th className="py-3.5 px-5">Member</th>
                          <th className="py-3.5 px-5">Class & Time</th>
                          <th className="py-3.5 px-5">Coach</th>
                          <th className="py-3.5 px-5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E332B]">
                        {data.bookings.map((bk) => (
                          <tr key={bk.id}>
                            <td className="py-4 px-5">
                              <div className="font-semibold">{bk.userName}</div>
                              <div className="text-xs text-[#92958E]">{bk.userEmail}</div>
                            </td>
                            <td className="py-4 px-5">
                              <div>{bk.className}</div>
                              <div className="text-xs font-mono text-[#C5F36A]">
                                {bk.day} · {bk.time}
                              </div>
                            </td>
                            <td className="py-4 px-5 text-xs text-[#92958E]">{bk.trainerName}</td>
                            <td className="py-4 px-5">
                              <select
                                value={bk.status}
                                onChange={async (e) => {
                                  await fetch(`/api/admin/bookings/${bk.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ status: e.target.value }),
                                  });
                                  await loadAdminOverview();
                                  notify('Booking status updated.');
                                }}
                                className="bg-[#171916] border border-[#2E332B] px-2.5 py-1.5 text-xs"
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Attended">Attended</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 9. FREE TRIAL LEADS */}
                {activeModule === 'leads' && (
                  <div className="bg-[#1F221D] border border-[#2E332B] overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[680px]">
                      <thead>
                        <tr className="border-b border-[#2E332B] text-xs uppercase text-[#92958E]">
                          <th className="py-3.5 px-5">Prospect</th>
                          <th className="py-3.5 px-5">Training Focus</th>
                          <th className="py-3.5 px-5">Preferred Date</th>
                          <th className="py-3.5 px-5">Pipeline Stage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2E332B]">
                        {data.leads.map((lead) => (
                          <tr key={lead.id}>
                            <td className="py-4 px-5">
                              <div className="font-semibold">{lead.name}</div>
                              <div className="text-xs text-[#92958E]">
                                {lead.email} · {lead.phone}
                              </div>
                            </td>
                            <td className="py-4 px-5 text-xs">{lead.preferredTraining}</td>
                            <td className="py-4 px-5 font-mono text-xs tabular-nums">{lead.preferredDate}</td>
                            <td className="py-4 px-5">
                              <select
                                value={lead.status}
                                onChange={async (e) => {
                                  await fetch(`/api/admin/leads/${lead.id}`, {
                                    method: 'PATCH',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ status: e.target.value }),
                                  });
                                  await loadAdminOverview();
                                  notify(`Updated lead status for ${lead.name}.`);
                                }}
                                className="bg-[#171916] border border-[#2E332B] px-2.5 py-1.5 text-xs"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Converted">Converted</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 10. ENQUIRIES */}
                {activeModule === 'enquiries' && (
                  <div className="divide-y divide-[#2E332B] border border-[#2E332B] bg-[#1F221D]">
                    {data.enquiries.map((enq) => (
                      <div key={enq.id} className="p-6 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <span className="text-xs font-mono text-[#C5F36A]">{enq.type} Enquiry</span>
                            <h3 className="font-semibold text-base mt-0.5">
                              {enq.subject} — {enq.name}
                            </h3>
                            <p className="text-xs text-[#92958E]">
                              {enq.email} · {enq.phone}
                            </p>
                          </div>
                          <select
                            value={enq.status}
                            onChange={async (e) => {
                              await fetch(`/api/admin/enquiries/${enq.id}`, {
                                method: 'PATCH',
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ status: e.target.value }),
                              });
                              await loadAdminOverview();
                              notify('Enquiry status updated.');
                            }}
                            className="bg-[#171916] border border-[#2E332B] px-3 py-1.5 text-xs"
                          >
                            <option value="Open">Open</option>
                            <option value="In Review">In Review</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>
                        <p className="text-sm text-[#F5F4EF]/85">{enq.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 11. WEBSITE CONTENT */}
                {activeModule === 'content' && contentForm && (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const res = await fetch('/api/admin/content', {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(contentForm),
                      });
                      if (res.ok) {
                        await Promise.all([loadAdminOverview(), refreshPublicData()]);
                        notify('Public site copy updated immediately.');
                      }
                    }}
                    className="p-7 bg-[#1F221D] border border-[#2E332B] space-y-4"
                  >
                    <h2 className="font-display text-3xl font-bold uppercase">Live Website Copy</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#92958E] mb-1">Announcement Offer</label>
                        <input
                          value={contentForm.announcementOffer}
                          onChange={(e) =>
                            setContentForm({ ...contentForm, announcementOffer: e.target.value })
                          }
                          className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#92958E] mb-1">Opening Hours</label>
                        <input
                          value={contentForm.openingHours}
                          onChange={(e) => setContentForm({ ...contentForm, openingHours: e.target.value })}
                          className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#92958E] mb-1">Hero Headline</label>
                      <input
                        value={contentForm.heroHeadline}
                        onChange={(e) => setContentForm({ ...contentForm, heroHeadline: e.target.value })}
                        className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#92958E] mb-1">Hero Subheadline</label>
                      <textarea
                        rows={2}
                        value={contentForm.heroSubheadline}
                        onChange={(e) => setContentForm({ ...contentForm, heroSubheadline: e.target.value })}
                        className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-[#92958E] mb-1">Address</label>
                        <input
                          value={contentForm.clubAddress}
                          onChange={(e) => setContentForm({ ...contentForm, clubAddress: e.target.value })}
                          className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#92958E] mb-1">Phone</label>
                        <input
                          value={contentForm.clubPhone}
                          onChange={(e) => setContentForm({ ...contentForm, clubPhone: e.target.value })}
                          className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#92958E] mb-1">Email</label>
                        <input
                          value={contentForm.clubEmail}
                          onChange={(e) => setContentForm({ ...contentForm, clubEmail: e.target.value })}
                          className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                    >
                      Save & Publish Content
                    </button>
                  </form>
                )}

                {/* 12. GALLERY MANAGEMENT */}
                {activeModule === 'gallery' && (
                  <div className="space-y-6">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await fetch('/api/admin/gallery', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            title: newGalTitle,
                            category: newGalCat,
                            caption: newGalCaption,
                            image: newGalImg,
                          }),
                        });
                        if (res.ok) {
                          setNewGalTitle('');
                          setNewGalCaption('');
                          await Promise.all([loadAdminOverview(), refreshPublicData()]);
                          notify('Gallery photo published.');
                        }
                      }}
                      className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-4"
                    >
                      <h2 className="font-display text-2xl font-bold uppercase">Publish Gallery Photo</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          required
                          value={newGalTitle}
                          onChange={(e) => setNewGalTitle(e.target.value)}
                          placeholder="Photo Title"
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        />
                        <select
                          value={newGalCat}
                          onChange={(e) => setNewGalCat(e.target.value as GalleryItem['category'])}
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        >
                          <option value="Architecture">Architecture</option>
                          <option value="Strength">Strength</option>
                          <option value="Conditioning">Conditioning</option>
                          <option value="Recovery">Recovery</option>
                        </select>
                        <select
                          value={newGalImg}
                          onChange={(e) => setNewGalImg(e.target.value)}
                          className="bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                        >
                          <option value={CLUB_IMAGES.strengthZone}>Strength Hall</option>
                          <option value={CLUB_IMAGES.heroAthlete}>Barbell Athlete</option>
                          <option value={CLUB_IMAGES.hiitTurf}>Turf Conditioning</option>
                          <option value={CLUB_IMAGES.recoverySanctuary}>Recovery Sanctuary</option>
                        </select>
                      </div>
                      <input
                        required
                        value={newGalCaption}
                        onChange={(e) => setNewGalCaption(e.target.value)}
                        placeholder="Caption..."
                        className="w-full bg-[#171916] border border-[#2E332B] px-3 py-2.5 text-sm"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                      >
                        Add Gallery Item
                      </button>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {data.gallery.map((g) => (
                        <div key={g.id} className="bg-[#1F221D] border border-[#2E332B] p-4 space-y-2">
                          <img
                            src={g.image}
                            alt={g.title}
                            className="w-full aspect-[4/3] object-cover bg-[#141613]"
                          />
                          <div className="flex items-start justify-between gap-2 pt-1">
                            <div>
                              <div className="text-xs text-[#C5F36A]">{g.category}</div>
                              <div className="font-semibold text-sm">{g.title}</div>
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                await fetch(`/api/admin/gallery/${g.id}`, {
                                  method: 'DELETE',
                                  headers: { Authorization: `Bearer ${token}` },
                                });
                                await Promise.all([loadAdminOverview(), refreshPublicData()]);
                                notify('Gallery item removed.');
                              }}
                              aria-label={`Delete ${g.title}`}
                              className="p-1.5 text-[#92958E] hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
