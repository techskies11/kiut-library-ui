export interface CheckinByDay {
  date: string;
  checkin_initiated: number;
  record_locator_init_count: number;
  record_locator_started_count: number;
  record_locator_completed_count: number;
  record_locator_closed_count: number;
  record_locator_abandoned_count: number;
  record_locator_create_payment_count?: number;
}

export interface CheckinData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_record_locator_init?: number;
  total_record_locator_started?: number;
  total_record_locator_completed?: number;
  total_record_locator_closed?: number;
  total_record_locator_init_abandoned?: number;
  total_checkin_initiated?: number;
  total_record_locator_unrecovered?: number;
  total_record_locator_init_abandoned_error?: number | null;
  total_record_locator_init_abandoned_voluntary?: number | null;
  total_checkin_pre_init_abandoned_error?: number | null;
  total_checkin_pre_init_abandoned_voluntary?: number | null;
  total_checkin_retrieval_user_error?: number | null;
  total_checkin_retrieval_business_rule?: number | null;
  total_checkin_retrieval_tech_error?: number | null;
  total_checkin_retrieval_unknown_error?: number | null;
  record_locator_by_day?: CheckinByDay[];
}

export interface FailedStep {
  step_name: string;
  failed_count: number;
}

export interface FailedByDay {
  date: string;
  steps: FailedStep[];
}

export interface UnrecoveredByDay {
  date: string;
  unrecovered_count: number;
}

export interface UnrecoveredByStep {
  step_name: string;
  count: number;
}

export interface UnrecoveredByStepByDay {
  date: string;
  steps: { step_name: string; count: number }[];
}

export interface FailedData {
  airline_name?: string;
  start_date?: string;
  end_date?: string;
  total_checkin_failed?: number;
  total_checkin_unrecovered?: number;
  total_checkin_init_abandoned?: number;
  failed_by_step_by_day?: FailedByDay[];
  unrecovered_by_step_by_day?: UnrecoveredByStepByDay[];
  unrecovered_by_step?: UnrecoveredByStep[];
  unrecovered_by_day?: UnrecoveredByDay[];
}

export interface CheckinVolumeDay {
  date: string;
  initiated: number;
  success: number;
  abandoned: number;
  errors: number;
}

export interface CheckinFunnelBreakdown {
  initiated: number;
  init: number;
  abandonedInit: number;
  bookingSuccess: number;
  started: number;
  completed: number;
  closed: number;
  totalUnrecovered: number;
  preInitAbandonedError: number;
  preInitAbandonedVoluntary: number;
  hasPreInitAbandonedSplit: boolean;
  abandonedError: number;
  abandonedVoluntary: number;
  hasAbandonedSplit: boolean;
  abandonedStartedFallback: number;
  abandonedBeforeInit: number;
  unifiedPreRetrievedError: number;
  preRetrievedAbandon: number;
  retrievalUserError: number;
  retrievalBusinessRule: number;
  retrievalTechError: number;
  retrievalUnknownError: number;
  hasRetrievalErrorSplit: boolean;
  preRetrievalErrors: number;
  rawBpFailed: number;
  bpFailed: number;
  abandonedAfterClosed: number;
  abandonedBeforeClosed: number;
  success: number;
  totalAbandoned: number;
  totalErrors: number;
}

const BOARDING_PASS_FAILED_STEPS = new Set([
  "choose_boardingpass",
  "boarding_pass",
  "generate_boarding_pass",
]);

export function isBoardingPassFailedStep(stepName: string | undefined): boolean {
  if (!stepName) return false;
  const normalized = stepName.toLowerCase().trim();
  return (
    BOARDING_PASS_FAILED_STEPS.has(normalized) ||
    normalized.includes("boarding_pass")
  );
}

export function getBoardingPassFailedCountForDay(failedDay?: FailedByDay | null): number {
  if (!failedDay?.steps?.length) return 0;
  return failedDay.steps.reduce((total, step) => {
    if (!isBoardingPassFailedStep(step.step_name)) return total;
    return total + (step.failed_count || 0);
  }, 0);
}

export function getBoardingPassFailedCount(
  failedData: FailedData | null | undefined,
): number {
  const byDay = failedData?.failed_by_step_by_day || [];
  let total = 0;
  for (const day of byDay) {
    total += getBoardingPassFailedCountForDay(day);
  }
  if (total > 0) return total;

  for (const step of failedData?.unrecovered_by_step || []) {
    if (isBoardingPassFailedStep(step.step_name)) {
      total += step.count || 0;
    }
  }
  return total;
}

export function unrecoveredForDay(
  date: string,
  failedData?: FailedData | null,
): number {
  const unrecovered = failedData?.unrecovered_by_day?.find((day) => day.date === date);
  if (unrecovered) return unrecovered.unrecovered_count || 0;

  const byStepDay = failedData?.unrecovered_by_step_by_day?.find(
    (day) => day.date === date,
  );
  if (byStepDay?.steps?.length) {
    return byStepDay.steps.reduce((sum, step) => sum + (step.count || 0), 0);
  }

  return 0;
}

function allocateProportionally(total: number, weights: number[]): number[] {
  if (total <= 0 || weights.length === 0) {
    return weights.map(() => 0);
  }

  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  if (weightSum <= 0) {
    return weights.map(() => 0);
  }

  const raw = weights.map((weight) => (total * weight) / weightSum);
  const allocated = raw.map(Math.floor);
  let remainder = total - allocated.reduce((sum, value) => sum + value, 0);

  const ranked = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);

  for (let i = 0; i < remainder; i += 1) {
    allocated[ranked[i % ranked.length].index] += 1;
  }

  return allocated;
}

export function computeCheckinFunnelBreakdown(
  checkinData?: CheckinData | null,
  failedData?: FailedData | null,
): CheckinFunnelBreakdown | null {
  const initiated = checkinData?.total_checkin_initiated || 0;
  if (!initiated) return null;

  const init = checkinData?.total_record_locator_init || 0;
  const abandonedInit = checkinData?.total_record_locator_init_abandoned || 0;
  const preInitAbandonedErrorRaw =
    checkinData?.total_checkin_pre_init_abandoned_error;
  const preInitAbandonedVoluntaryRaw =
    checkinData?.total_checkin_pre_init_abandoned_voluntary;
  const hasPreInitAbandonedSplit =
    (preInitAbandonedErrorRaw !== null &&
      preInitAbandonedErrorRaw !== undefined) ||
    (preInitAbandonedVoluntaryRaw !== null &&
      preInitAbandonedVoluntaryRaw !== undefined);
  const preInitAbandonedError = hasPreInitAbandonedSplit
    ? Math.max(Number(preInitAbandonedErrorRaw) || 0, 0)
    : 0;
  const preInitAbandonedVoluntary = hasPreInitAbandonedSplit
    ? Math.max(Number(preInitAbandonedVoluntaryRaw) || 0, 0)
    : 0;
  const abandonedErrorRaw =
    checkinData?.total_record_locator_init_abandoned_error;
  const abandonedVoluntaryRaw =
    checkinData?.total_record_locator_init_abandoned_voluntary;
  const hasAbandonedSplit =
    (abandonedErrorRaw !== null && abandonedErrorRaw !== undefined) ||
    (abandonedVoluntaryRaw !== null && abandonedVoluntaryRaw !== undefined);
  const abandonedError = hasAbandonedSplit
    ? Math.max(Number(abandonedErrorRaw) || 0, 0)
    : 0;
  const abandonedVoluntary = hasAbandonedSplit
    ? Math.max(Number(abandonedVoluntaryRaw) || 0, 0)
    : 0;
  const abandonedStartedFallback = hasAbandonedSplit
    ? Math.max(abandonedInit - abandonedError - abandonedVoluntary, 0)
    : abandonedInit;
  const bookingSuccess = Math.max(init - abandonedInit, 0);
  const started = checkinData?.total_record_locator_started || 0;
  const completed = checkinData?.total_record_locator_completed || 0;
  const closed = checkinData?.total_record_locator_closed || 0;
  const totalUnrecovered = checkinData?.total_record_locator_unrecovered || 0;

  const abandonedBeforeInit = Math.max(initiated - init, 0);
  const unifiedPreRetrievedError = preInitAbandonedError + abandonedError;
  const preRetrievedAbandon = hasPreInitAbandonedSplit
    ? preInitAbandonedVoluntary +
      (hasAbandonedSplit
        ? abandonedVoluntary + abandonedStartedFallback
        : abandonedInit)
    : abandonedBeforeInit +
      (hasAbandonedSplit
        ? abandonedVoluntary + abandonedStartedFallback
        : abandonedInit);

  const retrievalUserError = Math.max(
    Number(checkinData?.total_checkin_retrieval_user_error) || 0,
    0,
  );
  const retrievalBusinessRule = Math.max(
    Number(checkinData?.total_checkin_retrieval_business_rule) || 0,
    0,
  );
  const retrievalTechError = Math.max(
    Number(checkinData?.total_checkin_retrieval_tech_error) || 0,
    0,
  );
  const retrievalUnknownError = Math.max(
    Number(checkinData?.total_checkin_retrieval_unknown_error) || 0,
    0,
  );
  const hasRetrievalErrorSplit =
    checkinData?.total_checkin_retrieval_user_error != null ||
    checkinData?.total_checkin_retrieval_business_rule != null ||
    checkinData?.total_checkin_retrieval_tech_error != null ||
    checkinData?.total_checkin_retrieval_unknown_error != null;

  const preRetrievalErrors = hasRetrievalErrorSplit
    ? retrievalUserError +
      retrievalBusinessRule +
      retrievalTechError +
      retrievalUnknownError
    : unifiedPreRetrievedError;

  const rawBpFailed = getBoardingPassFailedCount(failedData);
  const bpFailed = Math.min(rawBpFailed, Math.max(closed - completed, 0));
  const abandonedAfterClosed = Math.max(closed - completed - bpFailed, 0);
  const abandonedBeforeClosed = Math.max(started - closed - totalUnrecovered, 0);

  const totalAbandoned =
    preRetrievedAbandon + abandonedBeforeClosed + abandonedAfterClosed;
  const totalErrors = preRetrievalErrors + totalUnrecovered + bpFailed;

  return {
    initiated,
    init,
    abandonedInit,
    bookingSuccess,
    started,
    completed,
    closed,
    totalUnrecovered,
    preInitAbandonedError,
    preInitAbandonedVoluntary,
    hasPreInitAbandonedSplit,
    abandonedError,
    abandonedVoluntary,
    hasAbandonedSplit,
    abandonedStartedFallback,
    abandonedBeforeInit,
    unifiedPreRetrievedError,
    preRetrievedAbandon,
    retrievalUserError,
    retrievalBusinessRule,
    retrievalTechError,
    retrievalUnknownError,
    hasRetrievalErrorSplit,
    preRetrievalErrors,
    rawBpFailed,
    bpFailed,
    abandonedAfterClosed,
    abandonedBeforeClosed,
    success: closed,
    totalAbandoned,
    totalErrors,
  };
}

function weightsOrFallback(weights: number[], fallback: number[]): number[] {
  return weights.some((weight) => weight > 0) ? weights : fallback;
}

export function computeCheckinVolumeDays(
  checkinData?: CheckinData | null,
  failedData?: FailedData | null,
): CheckinVolumeDay[] {
  const days = checkinData?.record_locator_by_day ?? [];
  if (!days.length) return [];

  const funnel = computeCheckinFunnelBreakdown(checkinData, failedData);
  if (!funnel) return [];

  const initiatedWeights = days.map((day) => day.checkin_initiated || 0);
  const startedWeights = days.map((day) => day.record_locator_started_count || 0);
  const closedWeights = days.map((day) => day.record_locator_closed_count || 0);

  const preGapWeights = days.map((day, index) =>
    Math.max(initiatedWeights[index] - startedWeights[index], 0),
  );

  const inFlowAbandonWeights = days.map((day, index) => {
    const unrecovered = unrecoveredForDay(day.date, failedData);
    return Math.max(
      startedWeights[index] - closedWeights[index] - unrecovered,
      0,
    );
  });

  const afterClosedWeights = days.map((day, index) => {
    const completed = day.record_locator_completed_count || 0;
    const closed = closedWeights[index];
    const failedDay = failedData?.failed_by_step_by_day?.find(
      (entry) => entry.date === day.date,
    );
    const rawBpFailed = getBoardingPassFailedCountForDay(failedDay);
    const bpFailed = Math.min(rawBpFailed, Math.max(closed - completed, 0));
    return Math.max(closed - completed - bpFailed, 0);
  });

  const unrecoveredWeights = days.map((day) =>
    unrecoveredForDay(day.date, failedData),
  );

  const bpFailedWeights = days.map((day, index) => {
    const completed = day.record_locator_completed_count || 0;
    const closed = closedWeights[index];
    const failedDay = failedData?.failed_by_step_by_day?.find(
      (entry) => entry.date === day.date,
    );
    const rawBpFailed = getBoardingPassFailedCountForDay(failedDay);
    return Math.min(rawBpFailed, Math.max(closed - completed, 0));
  });

  const preRetrievedAbandonByDay = allocateProportionally(
    funnel.preRetrievedAbandon,
    weightsOrFallback(preGapWeights, initiatedWeights),
  );
  const preRetrievalErrorsByDay = allocateProportionally(
    funnel.preRetrievalErrors,
    weightsOrFallback(preGapWeights, initiatedWeights),
  );
  const abandonedBeforeClosedByDay = allocateProportionally(
    funnel.abandonedBeforeClosed,
    weightsOrFallback(inFlowAbandonWeights, startedWeights),
  );
  const abandonedAfterClosedByDay = allocateProportionally(
    funnel.abandonedAfterClosed,
    weightsOrFallback(afterClosedWeights, closedWeights),
  );
  const unrecoveredByDay = allocateProportionally(
    funnel.totalUnrecovered,
    weightsOrFallback(unrecoveredWeights, initiatedWeights),
  );
  const bpFailedByDay = allocateProportionally(
    funnel.bpFailed,
    weightsOrFallback(bpFailedWeights, closedWeights),
  );

  return [...days]
    .map((day, index) => ({
      date: day.date,
      initiated: initiatedWeights[index],
      success: closedWeights[index],
      abandoned:
        preRetrievedAbandonByDay[index] +
        abandonedBeforeClosedByDay[index] +
        abandonedAfterClosedByDay[index],
      errors:
        preRetrievalErrorsByDay[index] +
        unrecoveredByDay[index] +
        bpFailedByDay[index],
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
