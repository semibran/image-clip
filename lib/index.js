var Rect = require('rect')

module.exports = clip
clip.bounds = bounds

function clip(image, rect) {

	var canvas = canvasify(image)

	if (!rect)
		rect = bounds(canvas)

	var context = canvas.getContext('2d')

	canvas.width = rect.width
	canvas.height = rect.height
	context.drawImage(image, -rect.left, -rect.top)

	return canvas

}

function bounds(image) {

	var canvas = image
	if (image instanceof Image)
		canvas = canvasify(image)

	var context = canvas.getContext('2d')

	var left, top, right, bottom
	left = top = Infinity
	right = bottom = -Infinity

	var imageData = context.getImageData(0, 0, image.width, image.height)
	var data = imageData.data
	for (let y = canvas.height; y--;) {
		for (let x = canvas.width; x--;) {
			let index = (y * canvas.width + x) * 4
			let alpha = data[index + 3]
			if (alpha) {
				if (x < left)
					left = x
				if (y < top)
					top = y
				if (x > right)
					right = x
				if (y > bottom)
					bottom = y
			}
		}
	}

	var width = right - left + 1
	var height = bottom - top + 1

	return Rect(left, top, width, height)

}

function canvasify(image) {
	var canvas = document.createElement('canvas')
	var context = canvas.getContext('2d')
	canvas.width = image.width
	canvas.height = image.height
	context.drawImage(image, 0, 0)
	return canvas
}
