window.onload = function () {
    // 向本地存储添加数据
    function set(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
    // 从本地存储获取数据
    function get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    var myStorage = {
        set: set,
        get: get
    }


    //创建根实例
    var vm = new Vue({
        el: '#app',
        data: {
            active: 0,
            // 输入值
            inputValue: '',
            // list存放input输入的数据
            list: [],
            // 已完成的数据
            finishedList: [],
            // 未完成的数据
            unfinishedList: [],
            isFinished: false,
        },
        methods: {
            add() {
                // 如果数据为空，则提示
                if (this.inputValue.trim() == '') {
                    alert('请输入内容~~');
                    return;
                }
                this.list.push({ text: this.inputValue, isFinished: false });
                // 把输入框里的数据添加到list后，清除inputValue的值
                this.inputValue = '';
                console.log(this.list);
            },
            // 删除项目
            remove(item) {
                // 使用splice删除该项数据
                this.list.splice(this.list.indexOf(item), 1);
            },
            // 勾选完成项目
            finish(item) {
                item.isFinished = !item.isFinished;
            },
            set(key, val) {
                localStorage.setItem(key, JSON.stringify(val));
            },
            get(key) {
                return JSON.parse(localStorage.getItem(key));
            }


        },

        // watch函数监视list的变化(点击完成或删除)
        watch: {
            list: {
                // deep和handler作用？？？
                deep: true,
                handler(val) {
                    // 当list的值有变化的时候，把list的值添加到localStorage中
                    if (val) {
                        myStorage.set('todolist', val);
                    }
                    this.finishedList = [];
                    this.unfinishedList = [];
                    for (v in this.list) {
                        if (this.list[v].isFinished == true) {
                            this.finishedList.push(this.list[v]);
                        } else {
                            this.unfinishedList.push(this.list[v]);
                        }
                    }
                    // console.log('已完成', this.finishedList);
                    // console.log('未完成', this.unfinishedList);

                }
            },

        },

        // 为什么是mounted? mounted生命周期：元素挂载到了实例上，模板中的html渲染到了html页面中
        mounted() {
            this.list = myStorage.get('todolist') || [];

        },

    });
}