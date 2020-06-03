# imagemin-gifsicle [![Build Status](https://travis-ci.org/imagemin/imagemin-gifsicle.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-gifsicle)

> Imagemin plugin for [Gifsicle](https://www.lcdf.org/gifsicle/)

## Install

```
$ npm install ShaunLWM/imagemin-gifsicle
```

## Usage

```js
const imagemin = require("imagemin");
const imageminGifsicle = require("imagemin-gifsicle");

(async () => {
	await imagemin(["images/*.gif"], "build/images", {
		use: [imageminGifsicle()],
	});

	console.log("Images optimized");
})();
```

## API

### imageminGifsicle(options?)(buffer)

Returns a `Promise<Buffer>` with the optimized image.

#### options

Type: `object`

##### interlaced

Type: `boolean`\
Default: `false`

Interlace gif for progressive rendering.

##### optimizationLevel

Type: `number`\
Default: `1`

Select an optimization level between `1` and `3`.

> The optimization level determines how much optimization is done; higher levels take longer, but may have better results.

1. Stores only the changed portion of each image.
2. Also uses transparency to shrink the file further.
3. Try several optimization methods (usually slower, sometimes better results)

##### colors

Type: `number`

Reduce the number of distinct colors in each output GIF to num or less. Num must be between 2 and 256.

##### lossy

Type: `number`\
Default: `20`

Alter image colors to shrink output file size at the cost of artifacts and noise. Lossiness determines how many artifacts are allowed; higher values can result in smaller file sizes, but cause more artifacts.

##### useCols

Type: `string`\
Default: null

Select colormap: [`web`, `bw`]

##### resize_method

Type: `string`
Default: `lanczos3`

Set the method used to resize images. The `sample` method runs very quickly, but when shrinking images, it produces noisy results. The `mix` method is somewhat slower, but produces better-looking results. The default method is currently `mix`.

Gifsicle also supports more complex resamplers, including Catmull-Rom cubic resampling (`catrom`), the Mitchell-Netravali filter (`mitchell`), a 2-lobed Lanczos filter (`lanczos2`), and a 3-lobed Lanczos filter (`lanczos3`). These filters are slower still, but can give sharper, better results.

##### gamma

Type: `number`

Set the gamma correction to gamma, which can be a real number or ‘srgb’.

##### crop

Type: `array`

Crop box in format `[left, top, width, height]`.

##### flip_h

Type: `boolean`

Flips GIF horizontally.

##### flip_v

Type: `boolean`

Flips GIF vertically.

##### rotate

Type: `number`

Rotates GIF image. Valid values are `90`, `180` and `270`. All other values are silently ignored.

##### output_webp

Type: `boolean`<br>
Default: `false`

Output buffer contains `WebP` image. `gif2webp` binary needs to be present in your `$PATH` for this conversion to work.

#### buffer

Type: `Buffer`

Buffer to optimize.
