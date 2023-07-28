import { onUnmounted } from 'vue';

type DebounceFunction<T extends any[]> = (...args: T) => void;

export function useDebounce<T extends any[]>(
	callback: DebounceFunction<T>,
	delay: number
): DebounceFunction<T> {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	const debounced: DebounceFunction<T> = (...args: T) => {
		clearTimeout(timeoutId!);
		timeoutId = setTimeout(() => callback(...args), delay);
	};

	onUnmounted(() => {
		clearTimeout(timeoutId!);
	});

	return debounced;
}
