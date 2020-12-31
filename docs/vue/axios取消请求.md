# axios取消请求

axios官网提供[两种方法](http://www.axios-js.com/zh-cn/docs/#%E5%8F%96%E6%B6%88)取消请求，这里推荐第二种

```javascript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
     // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');

```

```javascript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

应用场景

1. 输入验证

   输入验证除了必须的debounce防抖外，还可以添加取消请求进一步优化网络资源，这是一个简单的示例。

```vue
<script>
new Vue({
    data(){
        const checkCnName = async (rule, value, callback) => {
            await this.validCnName({ rule, value, callback })
        },
        return {
            rules: {
                cnName: {
                required: true,
                validator: this.debounce(checkCnName, 300),
                trigger: ['change']
              }
            },
            // 用来保存上一次跟当前请求的cancelToken
            preValidCnNameCancelToken: null,
            nowValidCnNameCancelToken: null
        }
    },
    methods: {
        debounce(fn, delay) {
            // 记录上一次的延时器
            var timer = null
            var delay = delay || 200
            return function () {
                var args = arguments
                var that = this
                // 清除上一次延时器
                clearTimeout(timer)
                timer = setTimeout(function () {
                    fn.apply(that, args)
                }, delay)
            }
        },
        // 验证中文名称是否存在api
        async validCnName(validParams) {
          const { rule, value, callback } = validParams
          const that = this
          // 远程验证前先拿到上一次请求的cancalToken,
          // 如果上次请求是pending状态，该token会是一个axios.CancelToken的实例函数
          // 如果上次请求已经返回结果，该token会被置为null
          this.preValidCnNameCancelToken = this.nowValidCnNameCancelToken
          if (this.preValidCnNameCancelToken) {
            // 可以传递一个message
            this.preValidCnNameCancelToken(`previous cnName valid canceled`)
            // 取消请求后置空
            this.preValidCnNameCancelToken = null
          }
          const CancelToken = axios.CancelToken
          if (!value) {
            return callback(new Error('中文名称不能为空'))
          } else {
            if (!/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
              return callback(new Error('必须包含中文'))
            }
            // 使用 try...catch 拿到 await 的结果
            try {
              const res = await request.post(
                '/check',
                {
                  cnName: value
                },
                {
                  cancelToken: new CancelToken(c => {
                    that.nowValidCnNameCancelToken = c
                  })
                }
              )
              // 请求完成后将当前cancelToken置空
              that.nowValidCnNameCancelToken = null
              if (res.data.result == 'success') {
                return callback()
              } else {
                return callback(res.data.message)
              }
            } catch (err) {
              if (axios.isCancel(err)) {
                console.log('cancel request', err.message)
              } else {
                  // ...
              }
            }
          }
        }
    }
})
</script>
```

