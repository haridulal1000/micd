class StringUtils {
	static sanitise(str: string): string {
		const firstLetter = str.charAt(0).toUpperCase();
		const restOfWord = str.slice(1).toLowerCase();
		const word = firstLetter + restOfWord;
		return word.replace(/[-_]/g, ' ');
	}
}

export default StringUtils;
