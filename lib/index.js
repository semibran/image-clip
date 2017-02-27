module.exports = function clip(image) {

	var canvas = document.createElement('canvas')
	var context = canvas.getContext('2d')
	canvas.width = image.width
	canvas.height = image.height
	context.drawImage(image, 0, 0)

	var left, top, right, bottom
	left = top = Infinity
	right = bottom = -Infinity

	var imageData = context.getImageData(0, 0, image.width, image.height)
	var data = imageData.data
	for (let y = image.height; y--;) {
		for (let x = image.width; x--;) {
			let index = (y * image.width + x) * 4 // Navigate one-dimensional array
			let alpha = data[index + 3]           // [red, green, blue, *alpha*]
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

	canvas.width = width
	canvas.height = height
	context.drawImage(image, -left, -top)

	return canvas

}
