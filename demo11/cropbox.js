//import $ from 'jquery';

export default class CropBox {

	constructor(options = {},el) {
		this._init();

		// jQuery.fn.cropbox = (options)=>{
		// 	return new this(options, this);
		// };
	}

	_init() {
		//default;
		this.options = {
			width: 400,
			height: 400,
			innerWidth: 200,
			innerHeight: 200
		};
		this.ratio = 1;
		this.state = {};
		this.image = new Image();
	}

	getDataURL() {
		const canvas = document.createElement("canvas"),
			dim = el.css('background-position').split(' '),
			size = el.css('background-size').split(' '),
			dx = parseInt(dim[0]) - el.width() / 2 + width / 2,
			dy = parseInt(dim[1]) - el.height() / 2 + height / 2,
			dw = parseInt(size[0]),
			dh = parseInt(size[1]),
			sh = parseInt(this.image.height),
			sw = parseInt(this.image.width);

		canvas.width = this.options.innerWidth;
		canvas.height = this.options.innerHeight;

		const context = canvas.getContext("2d");
		context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
		var imageData = canvas.toDataURL('image/png');
		return imageData;
	}

	renderTo(el) {
		this.el = $(el);

		return this;
	}


}