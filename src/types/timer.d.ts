export interface UseTimerReturn {
    timer: Ref<number>;
    start: () => void;
    stop: () => void;
    reset: () => void;
}

export type IntervalId = number | null;
