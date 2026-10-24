/**
 * Central Visitor Analytics Tracker for assessment.bigronjones.com
 * Schema Version: 2.0 (James Hendrix Master Specification)
 */

import { getFunnelApiUrl } from "./funnelEngine";

const VISITOR_KEY = "brj_visitor_id";
const SESSION_KEY = "brj_tracking_session_id";
const LAST_ACTIVE_KEY = "brj_last_active_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function getVisitorId(): string {
  if (typeof window === "undefined") return "server";
  let vid = localStorage.getItem(VISITOR_KEY);
  if (!vid) {
    vid = `vid_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(VISITOR_KEY, vid);
  }
  return vid;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const now = Date.now();
  const lastActive = parseInt(localStorage.getItem(LAST_ACTIVE_KEY) || "0", 10);
  let sid = localStorage.getItem(SESSION_KEY);

  if (!sid || (now - lastActive > SESSION_TIMEOUT_MS)) {
    sid = `sid_${now}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(SESSION_KEY, sid);
  }
  localStorage.setItem(LAST_ACTIVE_KEY, now.toString());
  return sid;
}

function getCampaignParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
    utmContent: params.get("utm_content") || undefined,
    utmTerm: params.get("utm_term") || undefined,
    gclid: params.get("gclid") || undefined,
    fbclid: params.get("fbclid") || undefined,
    ttclid: params.get("ttclid") || undefined,
    referrer: document.referrer || undefined,
  };
}

export type AssessmentTrackPayload = {
  eventName: string;
  stepName?: string;
  pagePath?: string;
  pageTitle?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  programId?: string | number;
  programName?: string;
  amount?: number;
  currency?: string;
  status?: string;
  frictionReason?: string;
  lastError?: string;
  stripeSessionId?: string;
  scrollDepthPercent?: number;
  activeEngagementSeconds?: number;
  metadata?: Record<string, unknown>;
};

export function trackAssessmentEvent(payload: AssessmentTrackPayload): void {
  if (typeof window === "undefined") return;

  try {
    const anonymousVisitorId = getVisitorId();
    const sessionId = getSessionId();
    const campaign = getCampaignParams();

    const data = {
      event_id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      event_name: payload.eventName,
      event_timestamp: new Date().toISOString(),
      anonymous_visitor_id: anonymousVisitorId,
      session_id: sessionId,
      site_id: "assessment.bigronjones.com",
      page_path: payload.pagePath || window.location.pathname,
      page_title: payload.pageTitle || document.title,
      event_source: "browser",
      consent_state: "granted",
      schema_version: "2.0",

      // Legacy / funnel mapping
      sessionId,
      siteOrigin: "assessment.bigronjones.com",
      eventName: payload.eventName,
      stepName: payload.stepName,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: payload.fullName,
      phone: payload.phone,
      programId: payload.programId,
      programName: payload.programName,
      productCategory: "assessment_funnel",
      amount: payload.amount,
      currency: payload.currency || "usd",
      status: payload.status,
      frictionReason: payload.frictionReason,
      lastError: payload.lastError,
      stripeSessionId: payload.stripeSessionId,
      scrollDepth: payload.scrollDepthPercent,
      activeSeconds: payload.activeEngagementSeconds,
      metadata: {
        ...payload.metadata,
        url: window.location.href,
        pathname: window.location.pathname,
      },
      ...campaign,
    };

    const targetUrl = getFunnelApiUrl("/api/track/event");
    const jsonStr = JSON.stringify(data);

    let sent = false;
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      try {
        const blob = new Blob([jsonStr], { type: "application/json" });
        sent = navigator.sendBeacon(targetUrl, blob);
      } catch {
        sent = false;
      }
    }

    if (!sent) {
      fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonStr,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Fail silently
  }
}

let isInitialized = false;
export function initAssessmentTelemetry(): void {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  // Track initial page view
  trackAssessmentEvent({
    eventName: "page_view",
    pagePath: window.location.pathname,
    pageTitle: document.title,
  });

  // Scroll milestones
  const reported = new Set<number>();
  window.addEventListener("scroll", () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const pct = Math.round((window.scrollY / scrollHeight) * 100);

    [25, 50, 75, 90].forEach((m) => {
      if (pct >= m && !reported.has(m)) {
        reported.add(m);
        trackAssessmentEvent({
          eventName: `scroll_${m}`,
          scrollDepthPercent: m,
          pagePath: window.location.pathname,
        });
      }
    });
  }, { passive: true });
}
