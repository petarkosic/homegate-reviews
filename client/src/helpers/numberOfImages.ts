interface NumberOfImagesMap {
	[key: string]: number;
}

const numberOfImages: NumberOfImagesMap = {
	'3003238714': 5,
	'3003368114': 4,
	'3003317466': 6,
	'3003264256': 3,
	'3003304639': 5,
	'3003288394': 7,
	'3003113399': 4,
	'3003349788': 5,
	'3003336011': 6,
	'3003344682': 3,
};

export function getNumberOfImages(apartmentId: string): number {
	if (apartmentId in numberOfImages) {
		return numberOfImages[apartmentId];
	} else {
		return 0;
	}
}
