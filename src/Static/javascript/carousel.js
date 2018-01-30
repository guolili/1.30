class Carousel {
	constructor(args) {
		this.init(args);
		// this.autoPlay();
		// this.twoWay();
		this.sweepFn();
		this.orderFn();
		this.mouseFn();
	}
	init(args) {
		this.wrap = this.domId(args.wrap);
		this.ulist = this.domId(args.ulist);
		this.images = this.ulist.getElementsByTagName(args.imgs);
		this.olist = this.domId(args.olist);
		this.olis = this.olist.getElementsByTagName(args.olis);
		this.lef = this.domId(args.lef);
		this.rig = this.domId(args.rig);
		this.wid = this.images[0].width;
		this.count = 0;
		this.timer = null;
		this.flag = true;
		this.ulist.style.width = this.images.length * this.wid + 'px';
	}
	domId(dom) { // dom节点封装 bug
		return typeof dom === 'string' ? document.getElementById(dom) : dom;
	}
	sweepFn() {
		this.olis[0].className = 'bgColor';
		[...this.olis].map((item, index) => {
			item.onmouseover = () => {
				this.transformFn(index);
				this.count = index + 1;
				// this.leftFn(this.count);
			}
		})
	}
	rightFn() { // 点击按钮
		if (this.count < this.images.length - 1) {
			this.count++;
			this.ulist.style.marginLeft = this.count * this.wid + 'px';
		} else {
			this.count = 0;
		}
	}
	twoWay() {
		if (this.flag) {
			this.rightFn();
		} else {
			if (this.count < this.images.length) {
				this.count--;
			} else {
				this.count = this.images.length - 1;
			}
		}
		console.log(this.count);
		this.transformFn(this.count);
	}
	orderFn() {
		this.rig.onclick = () => {
			this.twoWay();
		}
	}
	autoPlay() {
		this.timer = setInterval(() => {
			// this.rightFn();
		},1300)
	}
	transformFn(indx) {
		[...this.olis].map((item, index) => {
			item.className = '';
		})
		this.olis[indx].className= 'bgColor'
	}
	mouseFn() {
		this.wrap.onmouseover = () => {
			clearInterval(this.timer);
		}
		this.wrap.onmouseout = () => {
			this.autoPlay();
		}
	}
 }