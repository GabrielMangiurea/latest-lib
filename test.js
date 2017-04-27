'use strict';

import test from 'ava';

const m = require('./');

test('success: should return an object with props (name, version, files) of the right type', async t => {
	const f = await m('bootstrap');
	t.is(typeof f, 'object');
	t.is(typeof f.name, 'string');
	t.is(typeof f.version, 'string');
	t.is(typeof f.files, 'object');
	t.is(Array.isArray(f.files), true);
});

test('success: should return the correct name of the library', async t => {
	const f = await m('bootstrap');
	t.is(f.name, 'twitter-bootstrap');
});

test('failure: should return an error object', async t => {
	await m()
	.catch(err => {
		t.is(typeof err, 'object');
	});
});
