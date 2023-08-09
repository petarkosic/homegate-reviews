function formatNumber(number: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CHF',
		maximumFractionDigits: 0,
	}).format(number);
}

function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

export { formatNumber, formatDate };
