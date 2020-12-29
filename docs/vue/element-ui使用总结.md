# element-ui使用总结

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

## select选择器

1. 遇到的问题：select组件在进行远程搜索，并可以多选的时候，需要重置搜索条件，直接简单的把v-model的数组清空，页面上还是会保留已选择的选项。

2. 解决办法：给select组件添加ref属性，调用组件的handleClearClick方法，相当于模拟点击右侧clear按钮

   ![select组件](https://i.loli.net/2020/12/29/w2kPSTQmYBJzsFD.png)

```vue
<template>
	<el-select
	  v-model="searchModel.selectTags"
	  multiple
	  collapse-tags
	  filterable
	  clearable
	  remote
	  ref="selectTags"
	  :remote-method="searchTags"
	  :loading="searchTagLoading"
	  placeholder="远程搜索标签"
	>
      <el-option
		 v-for="item in tagsList"
		 :key="item.value"
         :label="item.label"
         :value="item.value"
      ></el-option>
    </el-select>
	<el-button @click="reset($event)">
		重置
	</el-button>
</template>
<script>
    new Vue({
        methods: {
            resetForm(e) {
                // 必须获取和传递event事件
                this.$refs['selectTags'].handleClearClick(event)
            }
        }
    })
</script>
```

