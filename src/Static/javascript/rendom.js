ajaxFn('http://localhost:8020/img').then((result) => { // 渲染数据
	const data = JSON.parse(result);
	const wrap = document.createElement('div');
	wrap.id = 'wrap';// id
	let str = '<ul id="ulist">';
	let ols = '<ol id="olist">'
	data.forEach((item, index) => {
		str += `<li><img src=${item}></li>`;
		ols += `<li>${index+1}</li>`;
	})
	str += '</ul>';
	ols += '</ol><span id="lef"><</span><span id="rig">></span>';
	wrap.innerHTML = str;
	wrap.innerHTML += ols;
	document.body.appendChild(wrap);
	new Carousel({
		wrap: 'wrap',
		ulist: 'ulist',
		olist: 'olist',
		olis: 'li',
		imgs: 'img',
		lef: 'lef',
		rig: 'rig'
	})	
})
