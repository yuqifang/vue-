// 定义一个VUE的类 （构造函数）
class Vue {
	constructor(options) {
		this.$el = document.querySelector(options.el)
		this.$data = options.data

		// 实例化一个EventBus的实例对象
		this.$bus = new EventBus()

		Object.keys(this.$data).forEach(key => {
			// 调用一个 defineReact() 的方式
			this.defineReact(key, this.$data[key])
		})

		this.compile(this.$el)
	}
	/**
	 * 数据的绑定
	 * @param {String} key 键
	 * @param {Any} value 值 
	*/
	defineReact(key, value) {
		Object.defineProperty(this, key, {
			get() {
				return value
			},
			set(newVal) {
				value = newVal
				this.$data[key] = newVal
				// 发布消息通知页面更新
				this.$bus.emit(key)
			}
		})
	}

	/**
	 * 编译DOM树
	 * @param {DocumentFragment} dom 需要解析的DOM对象
	*/
	compile(dom) {
		// 1. 取出当前DOM的子节点
		let childNodes = dom.childNodes
		// 2. 循环遍历它
		childNodes.forEach(node => {
			// 判断节点类型
			if (node.nodeType === 1) {
				// 元素节点 TODO
				// console.log('元素')
			} else if (node.nodeType === 3 && /{|}/g.test(node.textContent)) {
				// 文本节点并且是包含插值表达式的
				// 1.得到要使用的数据的key是什么
				let exp = node.textContent.replace(/{|}/g, '').trim()
				// 2.修改当前节点的 textContent
				node.textContent = this[exp]
				// 3.订阅
				this.$bus.on(exp, () => {
					// 回调函数更新页面内容
					node.textContent = this[exp]
				})
			}
			// 判断当前节点是否还存在子节点，如果存在做递归操作
			if (node.hasChildNodes()) {
				this.compile(node)
			}
		})
	}
}

// 定义一个EventBus类 （实现发布订阅）
class EventBus {
	constructor() {
		this.dep = {}
	}

	/**
	 * 订阅
	 * @param {String} eventName 订阅的数据
	 * @param {Function} callback 回调函数 
	 */
	on (eventName, callback) {
		if (!this.dep[eventName]) {
			this.dep[eventName] = []
		}
		this.dep[eventName].push(callback)
	}

	/**
	 * 发布
	 * @param {String} eventName 
	 */
	emit (eventName) {
		this.dep[eventName].forEach(cb => {
			cb()
		})
	}
}