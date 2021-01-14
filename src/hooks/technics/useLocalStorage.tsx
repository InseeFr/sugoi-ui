import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});
	const setValue = (value: any) => {
		try {
			if (value) {
				const valueToStore =
					value instanceof Function
						? value(storedValue)
						: value;
				setStoredValue(valueToStore);
				window.localStorage.setItem(
					key,
					JSON.stringify(valueToStore),
				);
			} else {
				window.localStorage.removeItem(key);
			}
		} catch (error) {}
	};

	return [storedValue, setValue];
};

export default useLocalStorage;
