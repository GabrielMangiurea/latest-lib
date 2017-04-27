'use strict';

const urlResolve = require('url').resolve;
const got = require('got');

module.exports = (name, opts) => {
	return new Promise((resolve, reject) => {
		if (!name) {
			return reject(new Error(`Please specify the name of the library`));
		}

		got(`https://api.cdnjs.com/libraries?search=${name}&fields=assets`, {json: true})
		.then(res => {
			if (res.body.results.length > 0) {
				// Return only the first result
				const library = res.body.results[0];
				// https://cdnjs.cloudflare.com/ajax/libs/[library]/[version]/[files]
				const rootDirectory = library.latest.substring(
					0,
					(library.latest.indexOf(library.assets[0].version) +
					library.assets[0].version.length)
				).concat('/');
				// Return only the latest version
				let files = library.assets[0].files.map(item => urlResolve(rootDirectory, item));

				if (opts && opts.only) {
					switch (opts.only) {
						case 'css':
							files = files.filter(item => /\.css$/.test(item) === true);
							break;
						case 'js' :
							files = files.filter(item => /\.js$/.test(item) === true);
							break;
						default: break;
					}
				}

				return resolve({
					name: library.name,
					version: library.assets[0].version,
					files
				});
			}

			return reject(new Error(`Cannot find any library named ${name}`));
		}).catch(err => reject(new Error(err)));
	});
};
