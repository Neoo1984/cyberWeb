#### 1.开发环境

1. nodejs

   > nodes >=8.9

#### 2.开发工具

1.webstorm  或者vscode

> webstorm激活工具：http://vrg123.com/

#### 3.开发框架/库

1. vue 2.6.10
2. vuex 3.1.0
3. vue-cli
4. vue-router 3.0.6
5. axios 0.18.1
6. element UI

#### 4.开发资料

1. https://cn.vuejs.org/v2/guide/
2. https://element.eleme.cn/#/zh-CN/component/table

#### 5.项目主要代码结构

<img src="/Users/neo/Library/Application Support/typora-user-images/image-20210526111529900.png" alt="image-20210526111529900" style="zoom:50%;" />

1. buid 和 dist : 打包用，打包后的所有代码在dist目录下，打包后把dist目录下全部文件放到服务器
2. mock 前期自定义的虚拟数据
3. nodemoduls：node的依赖，复制代码后在本地重新下载（小文件太多，不要复制粘贴）

```javascript
> src
	>api 接口
  >assets 静态资源
	>components 公用组件
	>icons
  >layout 公用布局
  >router 路由
  >store vuex
  >styles 覆盖css
  >utils 工具方法封装
  	>request.js 封装axios实例
  >views 页面（每个页面一个文件夹，每个文件夹下面必须有index）
.env.production 生产服配置域名
package.json 所有安装的依赖和环境
vue.config.js 项目配置文件
```

#### 6.项目安装/运行/打包

> 在package.json中的scripts，可以查看脚本的命令

```javascript
//进入项目根目录，下载node依赖
npm install
//开启本地项目
npm run dev
//项目打包
npm run build:prod 
```

#### 其他

> 本说明文档放置在项目根目录下



