# image-clip
> Clip out transparent pixels from an image

Converts an image or canvas like this:

![Before clip](before.png)

to a canvas with the edges clipped off:

![After clip](after.png)

## Installation
```sh
npm install semibran/image-clip
```

## Usage
```javascript
const clip = require('image-clip')
```

### `clip`
```javascript
clip(image, rect*) // => HTMLCanvasElement
```

Get the clipped version of an `Image` or `HTMLCanvasElement`. If `rect` is not provided, `clip.bounds` will be used instead.

### `bounds`
```javascript
clip.bounds(image) // => Rect
```

Get the relative bounding box of a prospective clipped image in the form `{ x, y, width, height }`. See [`semibran/rect`](https://github.com/semibran/rect) for more details.

## License
MIT
