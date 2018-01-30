const addImage = (url) => { // 异步加载图片
	return new Promise( (resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve(img);
		}
		img.onerror = () => {
			reject('not found');
		}
		img.src=url;
	})
}
const ajaxFn = (url) => { // ajax请求数据
	return new Promise((resolve, reject) => {
		let xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xhr.open('get', url);
		xhr.send(null);
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== 4) {return;}
			if (xhr.status === 200) {
				resolve(xhr.responseText);
			} else {
				reject(new Error('not found image'));
			}
		}
	})
}