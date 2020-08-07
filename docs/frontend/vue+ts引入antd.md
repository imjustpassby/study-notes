# Vue+TypeScript引入ant-design-vue

## 按需引入（开发模式）

1. `npm i ant-design-vue less less-loade`

2. shims-vue.d.ts

```typescript
declare module 'ant-design-vue' {
  const antd: any
  export default antd
}
```

3. vue.config.js

```javascript
module.exports = {
...
css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
...
}
```

4. utils/antd-components.ts

```typescript
import Vue from 'vue';
import antd from 'ant-design-vue';
const {
  Input,
  Modal
} = antd;

Vue.use(Input);

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
```

5. main.ts

```typescript
import '@/utils/antd-components.ts';
```

## cdn（线上模式）

1. `npm install ant-design-vue less less-loader --save `

   `npm install babel-plugin-import --save-dev`

2. public/index.html

```html
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.1/dist/antd.min.css"
	integrity="sha256-NIZ+iUokooM5YNTdBUe/XDoqD1yp4uhMhvEVMKII54M="
	crossorigin="anonymous"
/>
<script
	src="https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.1/dist/antd.min.js"
	integrity="sha256-GHCenl1npvmuBUsslHuxLm03DD1i/fXZWHoP+jkwgpg="
	crossorigin="anonymous"
></script>
```

3. vue.config.js

```
module.exports ={
    ...
    configureWebpack: config => {
        return {
            ...
            externals: {
                'ant-design-vue': 'antd'
            },
            ...
        }
    },
    css: {
        loaderOptions: {
            // antd主题色修改
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    }
}
```

4. shims-vue-d.ts

```typescript
declare module 'ant-design-vue' {
  const antd: any;
  export default antd;
}
```

5. babel.config.js

```
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
};
```

6. main.ts

```typescript
import antd from 'ant-design-vue';
Vue.use(antd);
```

