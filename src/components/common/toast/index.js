import Toast from './Toast.vue'

const plugin = {}

function removeDom(event) {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target)
    }
}

plugin.install = (Vue) => {
    const ToastConstructor = Vue.extend(Toast)

    ToastConstructor.prototype.close = function() {
        this.isShow = false
        this.message = ''
        this.$el.addEventListener('transitionend', removeDom)
    }

    Vue.prototype.$toast = (options={}) => {
        const toast = new ToastConstructor()
        toast.$mount(document.createElement('div'))

        document.body.appendChild(toast.$el)

        const duration = options.duration || 2500
        toast.message = options.message
        toast.isShow = true

        setTimeout(() => {
            toast.close()
        },duration)
    }
}

export default plugin