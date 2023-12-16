import {
	getAllApartmentIDs,
	getNumberOfImages,
} from '../../helpers/numberOfImages';

vi.mock('../../helpers/numberOfImages.ts');

describe('getNumberOfImages', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should return an empty array if no apartments exist', () => {
		vi.mocked(getAllApartmentIDs).mockReturnValue([]);

		expect(getAllApartmentIDs()).toEqual([]);
	});

	it('should return correct number of images for existing apartment ID', () => {
		vi.mocked(getNumberOfImages).mockReturnValue(5);

		expect(getNumberOfImages('3003238714')).toBe(5);
	});

	it('should return 0 for non-existent apartment ID', () => {
		vi.mocked(getNumberOfImages).mockReturnValue(0);

		expect(getNumberOfImages('1234567890')).toBe(0);
	});
});
