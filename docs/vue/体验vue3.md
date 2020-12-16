# Vue3体验日记

## 15个Vue3常用API

+ [快速使用Vue3最新的15个常用API](https://mp.weixin.qq.com/s?__biz=MzI4NDYxNTM0OQ==&mid=2247486229&idx=1&sn=9ec801f3f2c1d0a67c25f74b509a016f&chksm=ebf9fccfdc8e75d985f2cbd550c020bd94c6c9937117abd5a97185915c09b68f0b433b36fdee&scene=126&sessionid=1607407783&key=140d9acf5ef9701c09b6a636a01379c66f4214b9b4d20fd9543b6c4a524c1cf261799bd97a05be8c6866eb9552f8e82a08947fd004de025b57b00407d9e29bb43464dd2f64dcb70c0a1ff8499d56af808c1d37d65a4923f095942fa6ac7db7714106b84a0e8e3fbaa176d1cb725be04484728e8c52c639d25bbf685d756b3b59&ascene=1&uin=Mjk2Njk4MjQ0MA%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=A5Av2R9ztjuSANK5UgO2o1w%3D&pass_ticket=qvS5hJTWNqEj%2BExnbSf8DGj2c5zb02pRe6iel3IaBe3LBSKZp3QXaW3hKqC9QuvA&wx_header=0)

## 与Vue2开发体验对比

1. transition 页面切换动画写法

   + Vue2

     ```vue
     <transition name="fade-transform" mode="out-in">
         <keep-alive include="">
             <router-view />
         </keep-alive>
     </transition>
     ```

     ```css
     /*fade-transform*/
     .fade-transform-leave-active,
     .fade-transform-enter-active {
       transition: all 0.5s;
     }
     .fade-transform-enter {
       opacity: 0;
       transform: translateX(-30px);
     }
     .fade-transform-leave-to {
       opacity: 0;
       transform: translateX(30px);
     }
     ```

     

   + Vue3

     ```vue
     <router-view v-slot="{ Component }">
         <transition name="fade-transform" appear>
             <component :is="Component" />
         </transition>
     </router-view>
     ```

     ```css
     /*fade-transform*/
     .fade-transform-leave-active {
       transition: all 0.5s ease-in-out;
     }
     .fade-transform-enter-active {
       /*必须设置延迟时间*/
       transition: all 0.5s ease-in-out 0.5s;
     }
     .fade-transform-enter-from {
       opacity: 0;
       transform: translateX(-30px);
     }
     .fade-transform-leave-to {
       opacity: 0;
       transform: translateX(30px);
     }
     ```

     

   



