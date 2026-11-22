import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_SITE_CONTENT,
  GYM_CLASSES,
  INITIAL_GALLERY,
  INITIAL_SCHEDULE,
  MEMBERSHIP_PLANS,
  TRAINERS,
} from '../data/clubData';
import type {
  GalleryItem,
  GymClass,
  MembershipPlan,
  ScheduleSlot,
  SiteContent,
  TrainerProfile,
  UserRole,
} from '../types/forge';

export interface AuthSessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface ClubContextValue {
  siteContent: SiteContent;
  plans: MembershipPlan[];
  trainers: TrainerProfile[];
  classes: GymClass[];
  schedules: ScheduleSlot[];
  gallery: GalleryItem[];
  loadingPublic: boolean;
  refreshPublicData: () => Promise<void>;
  token: string | null;
  user: AuthSessionUser | null;
  setSession: (token: string | null, user: AuthSessionUser | null) => void;
  logout: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  joinModalPlan: string | null;
  openJoinModal: (tier?: string) => void;
  closeJoinModal: () => void;
  bookingSlot: ScheduleSlot | null;
  openBookingModal: (slot: ScheduleSlot) => void;
  closeBookingModal: () => void;
}

const ClubContext = createContext<ClubContextValue | undefined>(undefined);

export function ClubProvider({ children }: { children: React.ReactNode }) {
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [plans, setPlans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);
  const [trainers, setTrainers] = useState<TrainerProfile[]>(TRAINERS);
  const [classes, setClasses] = useState<GymClass[]>(GYM_CLASSES);
  const [schedules, setSchedules] = useState<ScheduleSlot[]>(INITIAL_SCHEDULE);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [loadingPublic, setLoadingPublic] = useState(true);

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthSessionUser | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [joinModalPlan, setJoinModalPlan] = useState<string | null>(null);
  const [bookingSlot, setBookingSlot] = useState<ScheduleSlot | null>(null);

  const refreshPublicData = useCallback(async () => {
    try {
      const res = await fetch('/api/public/bootstrap');
      if (res.ok) {
        const data = await res.json();
        if (data.siteContent) setSiteContent(data.siteContent);
        if (Array.isArray(data.plans)) setPlans(data.plans);
        if (Array.isArray(data.trainers)) setTrainers(data.trainers);
        if (Array.isArray(data.classes)) setClasses(data.classes);
        if (Array.isArray(data.schedules)) setSchedules(data.schedules);
        if (Array.isArray(data.gallery)) setGallery(data.gallery);
      }
    } catch {
      // Fallback safely to static club defaults
    } finally {
      setLoadingPublic(false);
    }
  }, []);

  useEffect(() => {
    void refreshPublicData();
  }, [refreshPublicData]);

  const setSession = useCallback((nextToken: string | null, nextUser: AuthSessionUser | null) => {
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const openJoinModal = useCallback((tier = 'Performance') => {
    setJoinModalPlan(tier);
  }, []);

  const closeJoinModal = useCallback(() => {
    setJoinModalPlan(null);
  }, []);

  const openBookingModal = useCallback((slot: ScheduleSlot) => {
    setBookingSlot(slot);
  }, []);

  const closeBookingModal = useCallback(() => {
    setBookingSlot(null);
  }, []);

  return (
    <ClubContext.Provider
      value={{
        siteContent,
        plans,
        trainers,
        classes,
        schedules,
        gallery,
        loadingPublic,
        refreshPublicData,
        token,
        user,
        setSession,
        logout,
        searchOpen,
        setSearchOpen,
        joinModalPlan,
        openJoinModal,
        closeJoinModal,
        bookingSlot,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
}

export function useClub() {
  const ctx = useContext(ClubContext);
  if (!ctx) throw new Error('useClub must be used inside ClubProvider');
  return ctx;
}
