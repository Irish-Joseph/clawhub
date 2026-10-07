# Content-Rights Proxy Timeout and Recovery

## Intent

The staff content-rights proxy (`convex/httpApiV1/contentRightsV1.ts`) forwards
authenticated admin reads and correspondence writes to the Hermit origin. Both
outbound fetches are bounded by a ten-second abort deadline
(`HERMIT_CONTENT_RIGHTS_FETCH_TIMEOUT_MS`), and the uncertain-write recovery
contract is fixed so a stalled origin can never produce duplicate emails.

Background: issue #3671 (unbounded proxy fetches could pin the Convex action
until the platform limit when Hermit stalled).

## The ten-second budget

- Applies to both the GET case fetch and the POST correspondence fetch.
- Rationale: ten seconds is generous for a responsive forms backend —
  representative correspondence uploads, including a 10 MB attachment, were
  measured completing in well under one second end-to-end through the proxy —
  while staying far below the Convex platform action limit, so a stalled
  origin fails fast and free instead of pinning the action.
- The constant is exported from `contentRightsV1.ts`. If production timing
  evidence ever shows representative uploads approaching the budget, the
  calibration move is to split a second exported POST constant; no structural
  change is needed.

## Failure contract

- Deadline expiry (or any outbound fetch failure) surfaces through the
  existing catch path as `502 Hermit content rights service unavailable`.
- The proxy performs **no automatic retries**. A timed-out POST must not be
  assumed to have been rolled back on Hermit's side: the deadline can expire
  after Hermit already recorded or sent the email.

## Uncertain correspondence POST recovery

The proxy and the staff API are deliberately conservative about resubmission:

- `GET /api/v1/content-rights/{caseId}` may show the correspondence entry; if
  it is present the write landed and the email must not be sent again.
- An **empty or negative case read is not evidence that nothing was sent.**
  The case read is a hint, not the source of truth for non-delivery: it can be
  incomplete, paginated, or lagging, and acting on it could duplicate an email
  that Hermit already sent.
- Recovery therefore requires confirmation on the Hermit side (the Hermit form
  admin view or the content-rights owner) before any resend. The API read alone
  never authorizes a resubmission.

## Related records

- `docs/http-api.md` → "Staff Content rights proxy" (staff-facing summary).
- `convex/httpApiV1/contentRightsV1.test.ts` (timeout regressions).
