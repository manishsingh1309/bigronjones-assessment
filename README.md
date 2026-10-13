# BigRonJones® — Funnel A: Website / Assessment First
**Repository:** `bigronjones-funnel-a`  
**Production Subdomain:** `assessment.bigronjones.com`  
**Traffic Source:** Website Direct & Referral Traffic  
**Core Purpose:** High-trust assessment-to-prescription conversion journey.  

---

## 1. Funnel Architecture & Sequence

```
[Entry: assessment.bigronjones.com]
   │
   ▼
Step 1: Mandatory Fitness Assessment
   │     • 6 diagnostic questions (Goal, Gender, Level, Obstacle, Environment, Style)
   │     • Computes deterministic prescription from 8 BigRonJones programs
   ▼
Step 2: Free Resistance Bands Offer ($0 + $15 S&H)
   │     • Shared 30-sale cap with Funnel B
   │     • If cap >= 30: automatically skipped directly to Step 3
   ▼
Step 3: Matched Training Program ($249)
   │     • One of eight programs matched to assessment answers
   ├─────────────────────────────────────────┐
   ▼ [YES: $249 Purchased]                   ▼ [NO: $249 Declined]
Step 4: Two-Program Upsell                Step 3b: $199 Downsell
   │     • Choose 2 distinct programs              │ (Self-directed DIY edition)
   │     • 20% off each ($199.20 each)             ├────────────────────────┐
   │     • Total: $398.40                          ▼ [YES: $199 Purchased]  ▼ [NO: Declined]
   ▼                                       Confirmation             Neutral Exit
Step 5: $3,000 Coaching Offer             (Direct Access Granted)  (Prescription Saved)
   │     • Men’s Fitness Alliance ($3k)
   │     • Women’s Wellness Program ($3k)
   ▼
Confirmation & VIP Access
```

---

## 2. Commercial & Pricing Rules
* **Resistance Bands:** $0.00 product + $15.00 shipping ($15.00 total).
* **Matched Core Program:** $249.00 one-time.
* **Downsell Program:** $199.00 one-time.
* **Two-Program Upsell:** $199.20 each program × 2 = **$398.40 total** (20% discount).
* **Ascension Coaching:** $3,000.00 PIF or 4 monthly installments of $750.00.

---

## 3. Local Development & Build Commands

```bash
# Start local development server (port 3001)
npm run dev

# Run TypeScript typecheck
npm run typecheck

# Build production bundle
npm run build
```
