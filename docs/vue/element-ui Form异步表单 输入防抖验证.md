# element-ui 异步表单

## Form

1. 异步表单提交验证，输入防抖远程验证

```vue
<template>
  <el-form
    :label-position="labelPosition"
    label-width="80px"
    :model="indicator"
    status-icon
    :rules="rules"
    ref="createIndicatorForm"
  >
    <el-form-item label="中文名称" required prop="cnName">
      <el-input v-model.trim="indicator.cnName"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
new Vue({
  data(){
	const checkCnName = async (rule, value, callback) => {
      await this.validCnName({ rule, value, callback })
    },
    return{
      indicator: {
       cnName: ''
      },
      rules: {
        cnName: {
          required: true,
          validator: this.debounce(checkCnName, 300),
          trigger: ['change']
        }
	  }
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
    async validCnName(validParams) {
        const { rule, value, callback } = validParams
        if (!value) {
            return callback(new Error('中文名称不能为空'))
        } else {
        if (!/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
            return callback(new Error('必须包含中文'))
        }
        const cnName = `cnName=${value}`
        const res = await request.post('/indicator/check/rpt?' + cnName)
        if (res.data.result == 'success') {
          return callback()
        } else {
          return callback(res.data.message)
        }
      }
    }
  }
})
</script>
```

