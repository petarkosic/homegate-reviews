/**
 * DISCLAIMER: This file contains fictional user data.
 *
 * The user names, email addresses, and passwords provided in this file are entirely fictitious.
 * They do not represent real individuals or accounts, and any resemblance to actual persons, living or
 * dead, or real email addresses is purely coincidental.
 *
 * This data should NEVER be used for any malicious or unauthorized purposes, including but not limited to
 * identity theft, unauthorized access, or any form of harm. Please handle it responsibly and ethically.
 */

type UserDataType = {
	[fullName: string]: {
		email: string;
		password: string;
	};
};

export const usersData: UserDataType = {
	'Emily Johnson': {
		email: 'emily.johnson@gmail.com',
		password: 'password123',
	},
	'David Thompson': { email: 'david_thompson@yahoo.com', password: 'pass4321' },
	'Sarah Rodriguez': {
		email: 'sarah-rodriguez@outlook.com',
		password: 'qwerty123',
	},
	'Michael Adams': { email: 'michael.adams@gmail.com', password: 'abc9876' },
	'Jennifer Lee': { email: 'jennifer_lee@yahoo.com', password: 'p@ssword' },
	'Matthew Roberts': {
		email: 'matthew-roberts@outlook.com',
		password: 'securePass',
	},
	'Olivia Brown': { email: 'olivia.brown@gmail.com', password: 'password123' },
	'Ethan Campbell': { email: 'ethan-campbell@yahoo.com', password: 'pass1234' },
	'Victoria Thompson': {
		email: 'victoria_thompson@outlook.com',
		password: 'abcde987',
	},
	'Daniel Miller': { email: 'daniel.miller@gmail.com', password: '123qweas' },
	'Sophia Garcia': { email: 'sophia-garcia@yahoo.com', password: 'passw0rd' },
	'Henry Kim': { email: 'henry_kim@outlook.com', password: 'secure123' },
	'Ava Williams': { email: 'ava.williams@gmail.com', password: 'password12' },
	'Benjamin Martin': {
		email: 'benjamin_martin@yahoo.com',
		password: 'abcd4321',
	},
	'Amelia White': { email: 'amelia-white@outlook.com', password: '98765abc' },
	'Jacob Turner': { email: 'jacob_turner@gmail.com', password: 'pass4567' },
	'Zoe Evans': { email: 'zoe.evans@yahoo.com', password: 'xyz9876' },
	'Gabriel Hernandez': {
		email: 'gabriel_hernandez@outlook.com',
		password: 'a1b2c3d4',
	},
	'Lily Scott': { email: 'lily.scott@gmail.com', password: 'passwordabc' },
	'Ryan Cooper': { email: 'ryan_cooper@yahoo.com', password: '12345xyz' },
	'Michael Thompson': {
		email: 'michael.thompson@outlook.com',
		password: 'secure098',
	},
	'Sarah Miller': { email: 'sarah_miller@gmail.com', password: 'mypass123' },
	'Ethan Wilson': { email: 'ethan-wilson@yahoo.com', password: 'password456' },
	'Olivia Harris': { email: 'olivia.harris@outlook.com', password: 'myPass12' },
	'Daniel Rodriguez': {
		email: 'daniel_rodriguez@gmail.com',
		password: 'abcd1234',
	},
	'Sophia Martinez': {
		email: 'sophia_martinez@yahoo.com',
		password: 'xyz12345',
	},
	'Benjamin Turner': {
		email: 'benjamin-turner@outlook.com',
		password: 'myp@ssword',
	},
	'Ava Martinez': { email: 'ava.martinez@gmail.com', password: 'a1b2c3d4' },
	'Gabriel Scott': { email: 'gabriel_scott@yahoo.com', password: 'qwerty098' },
	'Lily Turner': { email: 'lily-turner@outlook.com', password: 'mypass!23' },
};

export const usersFullNamesList: string[] = Object.keys(usersData).sort(
	(a, b) => a.localeCompare(b)
);
