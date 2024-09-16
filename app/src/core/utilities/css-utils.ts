import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

class CssUtils {
	public static cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
}

export default CssUtils;
