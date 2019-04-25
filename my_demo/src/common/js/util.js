/**
 * 解析url参数
 * @return Object {id:12334}
 */
export function urlParse() {
	let url = window.location.search;
	let obj = {};
	let reg = /[?&][^?&]+=[^?&]+/g;
	let arr = url.match(reg);

	if (arr) {
		arr.forEach((item)=>{
			let temArr = item.substring(1).split('=');
			let key = temArr[0];
			let val = temArr[1];
			obj(key) = val;
		})
	}
	return obj
};

