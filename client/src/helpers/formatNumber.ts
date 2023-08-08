export default function formatNumber(number: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'CHF',
		maximumFractionDigits: 0,
	}).format(number);
}
