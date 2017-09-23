# 说明

### 简介

本例子不介绍什么是gulp了，用到gulp的人都应该有所了解它能做什么了，如果你还看不懂它能做什么说明你还不需要它。

我们直接进入基本的例子学习怎么使用gulp一步步搭建我们的前端工程开发环境，提升我们的开发速度和工程可维护性。

gulp的简介和案例请参考官网：[中文](http://www.gulpjs.com.cn/) [英文](https://gulpjs.com/) [github API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)

一个最简单的gulp的工程包含的文档和目录结构有（gulpfile.js,package.json）

### 需要的环境
* node
如果你还没有安装，请先安装node环境。我们教程例子的版本是6.10

### 操作代码

* 首先安装gulp

注意：为了提高构建速度和安装包的速度，我们更换一下npm的源

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```shell
npm init -y 					//创建package.json文件样板，-y代表选择都选yes，如果没有-y，则要一步步选择输入
cnpm install gulp --save-dev 	//开发依赖工具添加参数--save-dev，本命令行简写可以这样cnpm i -D gulp 或者cnpm i gulp -D
```

* 创建gulpfile（touch gulpfile.js）

接下来我们做一个简单的事情来熟悉一下gulp

1. 任务：合并多个js文件

```shell
cnpm i -D gulp-concat
```

```js
const gulp = require('gulp');
const concat = require('gulp-concat');

```