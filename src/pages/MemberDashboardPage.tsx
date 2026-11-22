import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Check,
  Dumbbell,
  LogOut,
  Plus,
  Target,
  User as UserIcon,
} from 'lucide-react';
import { useClub } from '../context/ClubContext';
import { ResilientImage } from '../components/ResilientImage';
import type {
  BookingRecord,
  FitnessGoal,
  MemberNotification,
  MemberRecord,
  MembershipPlan,
  PaymentRecord,
  TrainerProfile,
  WorkoutDayPlan,
} from '../types/forge';

interface MemberDashboardPayload {
  member: MemberRecord;
  plan: MembershipPlan;
  trainer: TrainerProfile;
  bookings: BookingRecord[];
  goals: FitnessGoal[];
  notifications: MemberNotification[];
  payments: PaymentRecord[];
  workoutPlan: WorkoutDayPlan[];
}

type MemberTab = 'overview' | 'bookings' | 'workouts' | 'goals' | 'profile' | 'notifications';

export function MemberDashboardPage() {
  const { token, user, setSession, logout, plans, schedules, refreshPublicData } = useClub();

  // Auth states
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authPlan, setAuthPlan] = useState<'Essential' | 'Performance' | 'Elite'>('Performance');
  const [authCycle, setAuthCycle] = useState<'Monthly' | 'Annual'>('Monthly');
  const [authError, setAuthError] = useState('');
  const [authBusy, setAuthBusy] = useState(false);

  // Dashboard states
  const [tab, setTab] = useState<MemberTab>('overview');
  const [data, setData] = useState<MemberDashboardPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionMsg, setActionMsg] = useState('');

  // Profile edit state
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editFocus, setEditFocus] = useState('');
  const [editEmergency, setEditEmergency] = useState('');

  // New goal form
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCurrent, setGoalCurrent] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalPct, setGoalPct] = useState(25);

  const loadDashboard = useCallback(async () => {
    if (!token || user?.role !== 'member') return;
    setLoading(true);
    try {
      const res = await fetch('/api/member/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const payload = (await res.json()) as MemberDashboardPayload;
        setData(payload);
        setEditName(payload.member.name);
        setEditPhone(payload.member.phone);
        setEditFocus(payload.member.trainingFocus);
        setEditEmergency(payload.member.emergencyContact);
      }
    } finally {
      setLoading(false);
    }
  }, [token, user?.role]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthBusy(true);
    try {
      const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const body =
        authMode === 'register'
          ? {
              name: authName,
              email: authEmail,
              phone: authPhone,
              password: authPassword,
              planTier: authPlan,
              billingCycle: authCycle,
            }
          : { email: authEmail, password: authPassword, portal: 'member' };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const resData = await res.json();
      if (!res.ok) {
        setAuthError(resData.error || 'Authentication failed.');
      } else {
        setSession(resData.token, resData.user);
      }
    } catch {
      setAuthError('Network error. Please retry.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleBookSlot = async (scheduleId: string) => {
    if (!token) return;
    setActionMsg('');
    const res = await fetch('/api/member/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ scheduleId }),
    });
    const body = await res.json();
    if (!res.ok) {
      setActionMsg(body.error || 'Could not reserve class.');
    } else {
      setActionMsg('Class spot reserved.');
      await Promise.all([loadDashboard(), refreshPublicData()]);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!token) return;
    const res = await fetch(`/api/member/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setActionMsg('Reservation cancelled and slot released.');
      await Promise.all([loadDashboard(), refreshPublicData()]);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const res = await fetch('/api/member/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: editName,
        phone: editPhone,
        trainingFocus: editFocus,
        emergencyContact: editEmergency,
      }),
    });
    if (res.ok) {
      setActionMsg('Member profile saved.');
      await loadDashboard();
    }
  };

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const res = await fetch('/api/member/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: goalTitle,
        currentValue: goalCurrent,
        targetValue: goalTarget,
        progressPercent: goalPct,
      }),
    });
    if (res.ok) {
      setGoalTitle('');
      setGoalCurrent('');
      setGoalTarget('');
      setGoalPct(25);
      await loadDashboard();
    }
  };

  const handleBumpGoal = async (goal: FitnessGoal) => {
    if (!token) return;
    const nextPct = Math.min(100, goal.progressPercent + 10);
    const res = await fetch(`/api/member/goals/${goal.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ progressPercent: nextPct }),
    });
    if (res.ok) await loadDashboard();
  };

  const handleMarkNotificationsRead = async () => {
    if (!token) return;
    await fetch('/api/member/notifications/read', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadDashboard();
  };

  // Unauthenticated / Non-member Gate
  if (!token || user?.role !== 'member') {
    return (
      <main className="bg-[#171916] text-[#F5F4EF] py-16 lg:py-24 min-h-[75vh]">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C5F36A] mb-2">
            Member Portal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight">
            {authMode === 'register' ? 'Activate Your Member Pass' : 'Member Sign In'}
          </h1>
          <p className="text-sm text-[#92958E] mt-2">
            Access your training split, upcoming classes, fitness benchmarks, and membership details.
          </p>

          <div className="mt-8 bg-[#1F221D] border border-[#2E332B] p-6 sm:p-8">
            <div className="flex gap-2 mb-6 border-b border-[#2E332B] pb-4">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setAuthError('');
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                  authMode === 'register' ? 'bg-[#C5F36A] text-[#171916]' : 'text-[#92958E]'
                }`}
              >
                New Member Pass
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                  authMode === 'login' ? 'bg-[#C5F36A] text-[#171916]' : 'text-[#92958E]'
                }`}
              >
                Existing Member Sign In
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#92958E] mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#92958E] mb-1.5">Phone</label>
                      <input
                        type="tel"
                        required
                        value={authPhone}
                        onChange={(e) => setAuthPhone(e.target.value)}
                        placeholder="+91 98450 00000"
                        className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#92958E] mb-1.5">Membership Tier</label>
                      <select
                        value={authPlan}
                        onChange={(e) => setAuthPlan(e.target.value as 'Essential' | 'Performance' | 'Elite')}
                        className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                      >
                        {plans.map((p) => (
                          <option key={p.id} value={p.tier}>
                            {p.tier}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#92958E] mb-1.5">Billing Cycle</label>
                      <select
                        value={authCycle}
                        onChange={(e) => setAuthCycle(e.target.value as 'Monthly' | 'Annual')}
                        className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Annual">Annual</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs text-[#92958E] mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="member@domain.in"
                  className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#92958E] mb-1.5">Password (min 6 chars)</label>
                <input
                  type="password"
                  required
                  minLength={6}
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
                className="w-full py-3.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-widest hover:bg-[#D4F88A] transition-colors disabled:opacity-50"
              >
                {authBusy
                  ? 'Authenticating...'
                  : authMode === 'register'
                  ? 'Create Account & Enter Dashboard'
                  : 'Sign In To Member Portal'}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  const unreadCount = data?.notifications.filter((n) => !n.read).length || 0;
  const upcomingBookings = data?.bookings.filter((b) => b.status === 'Confirmed') || [];

  const navItems: { id: MemberTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'bookings', label: 'Classes & History', icon: <Calendar className="w-4 h-4" /> },
    { id: 'workouts', label: 'Workout Plan', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'goals', label: 'Fitness Goals', icon: <Target className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & Billing', icon: <UserIcon className="w-4 h-4" /> },
    {
      id: 'notifications',
      label: unreadCount > 0 ? `Notifications (${unreadCount})` : 'Notifications',
      icon: <Bell className="w-4 h-4" />,
    },
  ];

  return (
    <main className="bg-[#171916] text-[#F5F4EF] min-h-[80vh]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Top Bar Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#272B24]">
          <div>
            <p className="text-xs font-mono text-[#C5F36A] uppercase">Member Portal / {tab}</p>
            <h1 className="font-display text-4xl font-bold uppercase mt-1">
              Welcome, {data?.member.name || user.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/schedule"
              className="px-4 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
            >
              Browse Schedule
            </Link>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2.5 border border-[#2E332B] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 hover:border-[#F5F4EF]"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {actionMsg && (
          <div className="mt-6 px-4 py-3 bg-[#1F221D] border border-[#C5F36A]/60 text-xs text-[#C5F36A] flex items-center justify-between">
            <span>{actionMsg}</span>
            <button type="button" onClick={() => setActionMsg('')} className="underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${
                  tab === item.id
                    ? 'bg-[#C5F36A] text-[#171916] font-bold'
                    : 'bg-[#1F221D] text-[#92958E] hover:text-[#F5F4EF] border border-[#272B24]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {loading || !data ? (
              <div className="p-8 bg-[#1F221D] border border-[#2E332B] text-sm text-[#92958E]">
                Loading your member workspace...
              </div>
            ) : (
              <>
                {tab === 'overview' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="p-6 bg-[#1F221D] border border-[#2E332B]">
                        <span className="text-xs text-[#92958E] block">Membership Plan</span>
                        <span className="font-display text-3xl font-bold uppercase text-[#C5F36A] mt-1 block">
                          {data.member.planTier}
                        </span>
                        <span className="text-xs text-[#92958E] mt-1 block">
                          {data.member.billingCycle} · Status: {data.member.status}
                        </span>
                      </div>

                      <div className="p-6 bg-[#1F221D] border border-[#2E332B]">
                        <span className="text-xs text-[#92958E] block">Membership Expiry</span>
                        <span className="font-mono text-2xl font-bold text-[#F5F4EF] mt-1 block tabular-nums">
                          {data.member.expiryDate}
                        </span>
                        <span className="text-xs text-[#92958E] mt-1 block">
                          Joined {data.member.joinedAt}
                        </span>
                      </div>

                      <div className="p-6 bg-[#1F221D] border border-[#2E332B]">
                        <span className="text-xs text-[#92958E] block">Upcoming Classes</span>
                        <span className="font-mono text-3xl font-bold text-[#F5F4EF] mt-1 block tabular-nums">
                          {upcomingBookings.length}
                        </span>
                        <span className="text-xs text-[#92958E] mt-1 block">
                          {data.bookings.length} total reservations logged
                        </span>
                      </div>
                    </div>

                    {/* Assigned Coach */}
                    <div className="p-6 bg-[#1F221D] border border-[#2E332B] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 overflow-hidden shrink-0 bg-[#171916]">
                          <ResilientImage
                            src={data.trainer.image}
                            alt={data.trainer.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <span className="text-xs text-[#C5F36A] uppercase tracking-wider">
                            Assigned Specialist Coach
                          </span>
                          <h2 className="font-display text-2xl font-bold uppercase">{data.trainer.name}</h2>
                          <p className="text-xs text-[#92958E]">
                            {data.trainer.category} · {data.trainer.availability}
                          </p>
                        </div>
                      </div>
                      <Link
                        to={`/trainers/${data.trainer.slug}`}
                        className="px-4 py-2.5 border border-[#2E332B] text-xs font-bold uppercase tracking-wider hover:border-[#C5F36A] shrink-0"
                      >
                        Coach Profile
                      </Link>
                    </div>

                    {/* Quick Book Section */}
                    <div className="space-y-4">
                      <h2 className="font-display text-3xl font-bold uppercase">Quick Class Reservation</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schedules.slice(0, 4).map((slot) => (
                          <div
                            key={slot.id}
                            className="p-5 bg-[#1F221D] border border-[#2E332B] flex items-center justify-between gap-4"
                          >
                            <div>
                              <div className="text-xs font-mono text-[#C5F36A]">
                                {slot.day} · {slot.time}
                              </div>
                              <div className="font-display text-2xl font-bold uppercase mt-0.5">
                                {slot.className}
                              </div>
                              <div className="text-xs text-[#92958E]">
                                {slot.trainerName} · {slot.availableSlots} open
                              </div>
                            </div>
                            <button
                              type="button"
                              disabled={slot.availableSlots <= 0}
                              onClick={() => handleBookSlot(slot.id)}
                              className="px-4 py-2 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider disabled:opacity-40 shrink-0"
                            >
                              Book
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'bookings' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="font-display text-3xl font-bold uppercase mb-4">
                        Your Bookings & History
                      </h2>
                      {data.bookings.length === 0 ? (
                        <div className="p-8 bg-[#1F221D] border border-[#2E332B] text-sm text-[#92958E]">
                          No classes booked yet. Reserve a session below or from the Weekly Schedule.
                        </div>
                      ) : (
                        <div className="border border-[#2E332B] bg-[#1F221D] divide-y divide-[#2E332B]">
                          {data.bookings.map((bk) => (
                            <div
                              key={bk.id}
                              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div>
                                <div className="text-xs font-mono text-[#C5F36A]">
                                  {bk.day} · {bk.time} · {bk.status}
                                </div>
                                <div className="font-display text-2xl font-bold uppercase mt-0.5">
                                  {bk.className}
                                </div>
                                <div className="text-xs text-[#92958E]">
                                  {bk.trainerName} · {bk.studioZone}
                                </div>
                              </div>
                              {bk.status === 'Confirmed' && (
                                <button
                                  type="button"
                                  onClick={() => handleCancelBooking(bk.id)}
                                  className="px-4 py-2 border border-red-800/70 text-red-300 text-xs font-bold uppercase tracking-wider hover:bg-red-950/50 shrink-0"
                                >
                                  Cancel Spot
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-bold uppercase mb-4">Available Sessions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {schedules.slice(0, 6).map((slot) => (
                          <div
                            key={slot.id}
                            className="p-5 bg-[#1F221D] border border-[#2E332B] flex items-center justify-between gap-4"
                          >
                            <div>
                              <div className="text-xs font-mono text-[#C5F36A]">
                                {slot.day} · {slot.time}
                              </div>
                              <div className="font-display text-xl font-bold uppercase">{slot.className}</div>
                              <div className="text-xs text-[#92958E]">
                                {slot.trainerName} · {slot.availableSlots} open
                              </div>
                            </div>
                            <button
                              type="button"
                              disabled={slot.availableSlots <= 0}
                              onClick={() => handleBookSlot(slot.id)}
                              className="px-4 py-2 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider shrink-0"
                            >
                              Book
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'workouts' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-3xl font-bold uppercase">
                        4-Day Performance Split
                      </h2>
                      <p className="text-sm text-[#92958E] mt-1">
                        Programmed by {data.trainer.name} for {data.member.trainingFocus}.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.workoutPlan.map((dayPlan) => (
                        <div key={dayPlan.day} className="bg-[#1F221D] border border-[#2E332B] p-6 space-y-4">
                          <div>
                            <div className="text-xs font-mono text-[#C5F36A]">{dayPlan.day}</div>
                            <h3 className="font-display text-2xl font-bold uppercase mt-1">
                              {dayPlan.focus}
                            </h3>
                          </div>
                          <div className="divide-y divide-[#2E332B] text-sm">
                            {dayPlan.exercises.map((ex, idx) => (
                              <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                                <span className="text-[#F5F4EF]">{ex.name}</span>
                                <span className="font-mono text-xs text-[#92958E] shrink-0 tabular-nums">
                                  {ex.setsReps} · {ex.rpe}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'goals' && (
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h2 className="font-display text-3xl font-bold uppercase">Fitness Goals</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {data.goals.map((goal) => (
                          <div key={goal.id} className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-4">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-display text-2xl font-bold uppercase">{goal.title}</h3>
                                <p className="text-xs text-[#92958E] mt-1 font-mono tabular-nums">
                                  Current: {goal.currentValue} · Target: {goal.targetValue}
                                </p>
                              </div>
                              <span className="font-mono text-lg font-bold text-[#C5F36A] tabular-nums">
                                {goal.progressPercent}%
                              </span>
                            </div>
                            <div className="h-2 bg-[#171916] overflow-hidden">
                              <div
                                className="h-full bg-[#C5F36A]"
                                style={{ width: `${goal.progressPercent}%` }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleBumpGoal(goal)}
                              disabled={goal.progressPercent >= 100}
                              className="px-4 py-2 border border-[#2E332B] text-xs font-bold uppercase tracking-wider hover:border-[#C5F36A] disabled:opacity-40"
                            >
                              {goal.progressPercent >= 100 ? 'Target Reached' : 'Log +10% Progress'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form
                      onSubmit={handleAddGoal}
                      className="p-6 bg-[#1F221D] border border-[#2E332B] space-y-4"
                    >
                      <h3 className="font-display text-2xl font-bold uppercase flex items-center gap-2">
                        <Plus className="w-5 h-5 text-[#C5F36A]" /> Add Benchmark Goal
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <input
                          type="text"
                          required
                          value={goalTitle}
                          onChange={(e) => setGoalTitle(e.target.value)}
                          placeholder="e.g., Strict Pull-Ups"
                          className="sm:col-span-2 bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                        />
                        <input
                          type="text"
                          required
                          value={goalCurrent}
                          onChange={(e) => setGoalCurrent(e.target.value)}
                          placeholder="Current (e.g., 4 reps)"
                          className="bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                        />
                        <input
                          type="text"
                          required
                          value={goalTarget}
                          onChange={(e) => setGoalTarget(e.target.value)}
                          placeholder="Target (e.g., 12 reps)"
                          className="bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                      >
                        Save Goal
                      </button>
                    </form>
                  </div>
                )}

                {tab === 'profile' && (
                  <div className="space-y-8">
                    <form
                      onSubmit={handleSaveProfile}
                      className="p-7 bg-[#1F221D] border border-[#2E332B] space-y-4"
                    >
                      <h2 className="font-display text-3xl font-bold uppercase">Member Profile</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#92958E] mb-1.5">Full Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#92958E] mb-1.5">Phone</label>
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#92958E] mb-1.5">Primary Focus</label>
                          <input
                            type="text"
                            value={editFocus}
                            onChange={(e) => setEditFocus(e.target.value)}
                            className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#92958E] mb-1.5">Emergency Contact</label>
                          <input
                            type="text"
                            value={editEmergency}
                            onChange={(e) => setEditEmergency(e.target.value)}
                            className="w-full bg-[#171916] border border-[#2E332B] px-3.5 py-2.5 text-sm text-[#F5F4EF]"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#C5F36A] text-[#171916] text-xs font-bold uppercase tracking-wider"
                      >
                        Update Profile
                      </button>
                    </form>

                    <div className="p-7 bg-[#1F221D] border border-[#2E332B]">
                      <h3 className="font-display text-2xl font-bold uppercase mb-4">Billing History (INR)</h3>
                      <div className="divide-y divide-[#2E332B] text-sm">
                        {data.payments.map((pay) => (
                          <div key={pay.id} className="py-3 flex items-center justify-between">
                            <div>
                              <span className="font-semibold">{pay.planTier}</span> · {pay.billingCycle}
                              <span className="block text-xs text-[#92958E] font-mono">{pay.paidDate}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-mono font-bold tabular-nums">
                                ₹{pay.amountInr.toLocaleString('en-IN')}
                              </span>
                              <span className="block text-xs text-[#C5F36A]">{pay.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'notifications' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-3xl font-bold uppercase">Notifications</h2>
                      <button
                        type="button"
                        onClick={handleMarkNotificationsRead}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5F36A] hover:underline"
                      >
                        <Check className="w-4 h-4" /> Mark All Read
                      </button>
                    </div>
                    <div className="divide-y divide-[#2E332B] border border-[#2E332B] bg-[#1F221D]">
                      {data.notifications.map((n) => (
                        <div key={n.id} className="p-5 flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold text-sm text-[#F5F4EF]">
                              {n.title} {!n.read && <span className="text-xs text-[#C5F36A] ml-2">Unread</span>}
                            </div>
                            <p className="text-xs text-[#92958E] mt-1">{n.message}</p>
                          </div>
                          <span className="text-[11px] font-mono text-[#92958E] shrink-0">
                            {n.createdAt.slice(0, 10)}
                          </span>
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
