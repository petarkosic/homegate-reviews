import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/vue';
import DisclaimerModal from '../../components/DisclaimerModal.vue';

describe('DislaimerModal', () => {
	it('should show modal on page load', async () => {
		const { getByText } = render(DisclaimerModal);

		expect(getByText('Welcome to the Homegate Apartment Reviews')).toBeTruthy();
	});

	it('should hide modal on close button click', async () => {
		const { getByText } = render(DisclaimerModal);

		await fireEvent.click(getByText('Close'));

		await waitFor(() =>
			expect(
				screen.queryByText('Welcome to the Homegate Apartment Reviews')
			).toBeFalsy()
		);
	});

	it('should navigate to step 2 when "Next" button is clicked', async () => {
		const { getByText } = render(DisclaimerModal);

		await fireEvent.click(getByText('Next'));

		expect(getByText('Key Features')).toBeTruthy();
	});

	it('should navigate to step 1 when "Previous" button is clicked on step 2', async () => {
		const { getByText } = render(DisclaimerModal);

		await fireEvent.click(getByText('Next'));

		await fireEvent.click(getByText('Previous'));

		expect(getByText('Welcome to the Homegate Apartment Reviews')).toBeTruthy();
	});

	it('should disable "Previous" button on step 1', async () => {
		const { getByText, queryByRole } = render(DisclaimerModal);

		await fireEvent.click(getByText('Next'));

		await fireEvent.click(getByText('Previous'));

		expect(queryByRole('button', { name: 'Previous' })).toBeNull();
	});

	it('should disable "Next" button on step 3', async () => {
		const { getByText, queryByRole } = render(DisclaimerModal);

		await fireEvent.click(getByText('Next'));
		await fireEvent.click(getByText('Next'));

		expect(queryByRole('button', { name: 'Next' })).toBeNull();
	});
});
