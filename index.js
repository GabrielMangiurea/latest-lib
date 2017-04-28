'use strict';

const urlResolve = require('url').resolve;
const got = require('got');

module.exports = (name, opts) => {
	return new Promise((resolve, reject) => {
		if (!name) {
			return reject(new Error(`Please specify the name of the library`));
		}

		got(`https://api.cdnjs.com/libraries?search=${name}&fields=version,assets`, {json: true})
		.then(res => {
			if (res.body.results.length > 0) {
				// Return only the first result
				const library = res.body.results[0];
				const versionAssets = library.assets.filter(files => {
					return files.version === library.version;
				});
				// https://cdnjs.cloudflare.com/ajax/libs/[library]/[version]/[files]
				const rootDirectory = library.latest.substring(
					0,
					(library.latest.indexOf(library.version) +
					library.version.length)
				).concat('/');
				// Return only the latest version
				let files = versionAssets[0].files.map(item => urlResolve(rootDirectory, item));

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
					version: versionAssets[0].version,
					files
				});
			}

			return reject(new Error(`Cannot find any library named ${name}`));
		}).catch(err => reject(new Error(err)));
	});
};
