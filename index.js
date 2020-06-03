"use strict";
const execa = require("execa");
const gifsicle = require("gifsicle");
const isGif = require("is-gif");

module.exports = (options = {}) => async (input) => {
	options = Object.assign(
		{
			resize_method: "lanczos3",
			optimizationLevel: 2,
			output_webp: false,
		},
		options
	);

	if (!Buffer.isBuffer(input)) {
		throw new TypeError(
			`Expected \`input\` to be of type \`Buffer\` but received type \`${typeof input}\``
		);
	}

	if (!isGif(input)) {
		return input;
	}

	const args = ["--no-warnings", "--no-app-extensions"];

	if (options.interlaced) {
		args.push("--interlace");
	}

	if (options.optimizationLevel) {
		args.push(`--optimize=${options.optimizationLevel}`);
	}

	if (options.colors) {
		args.push(`--colors=${options.colors}`);
	}

	if (options.useCols) {
		args.push(`--use-col=${options.useCols}`);
	}

	if (options.lossy) {
		args.push(`--lossy=${options.lossy}`);
	}

	if (opts.resize_method) {
		args.push(`--resize-method=${opts.resize_method}`);
	}

	if (opts.gamma) {
		args.push(`--gamma=${opts.gamma}`);
	}

	if (opts.crop) {
		args.push(
			`--crop=${opts.crop[0]},${opts.crop[1]}+${opts.crop[2]}x${opts.crop[3]}`
		);
	}

	if (opts.flip_h) {
		args.push(`--flip-horizontal`);
	}

	if (opts.flip_v) {
		args.push(`--flip-vertical`);
	}

	if (opts.rotate) {
		if (opts.rotate == 90) args.push(`--rotate-90`);
		if (opts.rotate == 180) args.push(`--rotate-180`);
		if (opts.rotate == 270) args.push(`--rotate-270`);
	}

	if (opts.width) {
		if (!opts.stretch) {
			args.push(`--resize-fit-width=${opts.width}`);
		} else {
			args.push(`--resize-width=${opts.width}`);
		}
	}

	if (opts.height) {
		if (!opts.stretch) {
			args.push(`--resize-fit-height=${opts.height}`);
		} else {
			args.push(`--resize-height=${opts.height}`);
		}
	}

	args.push("--output", "-");

	try {
		const { stdout } = await execa(gifsicle, args, {
			input,
			encoding: null,
		});

		if (opts.output_webp) {
			const webp_output = await execa(
				"gif2webp",
				[
					"-quiet",
					"-mt",
					"-metadata",
					"none",
					"-q",
					"85",
					"-m",
					"2",
					"-lossy",
					"-o",
					"-",
					"--",
					"-",
				],
				{ input: stdout, encoding: null }
			);
			return webp_output.stdout;
		} else {
			return stdout;
		}
	} catch (error) {
		error.message = error.stderr || error.message;
		throw error;
	}
};
