# fullstackopen2023

当使用React时，所有需要渲染的内容通常被定义为React组件。

编译是由Babel处理的。用create-react-app创建的项目被配置为自动编译。

JSX是"XML-like"语言，这意味着每个标签都需要被关闭。

React组件名称必须大写。如果没有首字母大写会被当做是普通的 HTML 标签。

React组件的内容（通常）需要包含一个根元素。

使用根元素并不是唯一可行的选择。一个组件的array也是一个有效的解决方案。

```jsx
const App = () => {
  return [
    <h1>Greetings</h1>,
    <Hello name="Maya" age={26 + 10} />,
    <Footer />
  ]
}
```

如果组件在你认为应该渲染的时候没有渲染，或者在 "错误的时间 "渲染，你可以通过将组件的变量值记录到控制台来调试应用。

最简单和最好的方法是通过多次使用useState函数来创建独立的状态 "片段"。
https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
我个人的理解是，一起更新的最小的状态创建一个状态。比方说FQA里面提到的，left和top是每次更新都要更新的，那就left和top放在一个状态里面在一起。课程里面的更新状态，一次只会更新left或者right，那就为left和right各自创建一个状态。

> 一个典型的开发者的大部分时间都花在调试和阅读现有的代码上。偶尔我们也会写一两行新的代码，但我们的大部分时间都花在试图弄清楚为什么某个东西坏了或某个东西是如何工作的。因此，良好的调试实践和工具是非常重要的。

Do Not Define Components Within Components.
由于React在每次渲染时都将定义在另一个组件内的组件视为一个新的组件。这使得React无法优化该组件。

~前端项目的 `package.json` 中的 `proxy` 可以使得前端使用相对路径 API，访问运行在另外一个端口或者机器的后端服务。~ 更现代的方式是使用 vite.config.js 中声明 vite server proxy。

一个简单的前端项目的目录结构：
```
src
├── App.js
├── components/   # 组件文件夹
└── services/     # 与后端通信的代码（单一责任原则）
```

本着单一责任原则，将通信部分的代码提取到自己的模块是明智的。

一个简单的后端项目的目录结构：
```
.
├── build
├── index.js
├── models/             # 使用 Mongoose 的具体代码
├── mongo.js            # 测试连接 mongoDB
├── package-lock.json
├── package.json
└── requests/           # Rest Client test
```
models/ 文件夹放和数据库相关的代码。

<details>

<summary>用 NodeJS 和 Express 写服务端程序</summary>

Part 3 用 NodeJS 和 Express 写服务端程序，用到了一些库：
```
- cors      # 启用跨源资源共享
- dotenv    # 用于读取 .env 中的秘密信息
- express   # 一个很友好的 Node 服务端开发库
- mongoose  # 连接使用 MongoDB
- morgan    # 日志打印的中间件
```

Express 是一个路由和中间件的 web 框架，一个 Express 应用就是一系列的中间件函数调用。中间件是可以用来处理 request 和 response 对象的函数。在实践中，你可以同时使用几个中间件。当你有多个中间件时，它们会按照在 Express 中被使用的顺序一个一个地被执行。中间件是一个接收三个参数的函数。

中间件函数示例：
```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

Express 内置的中间件：
```js
const express = require('express')
const app = express()

app.use(express.josn())  // josn-parser
app.use(express.static('./build'))  // 服务静态文件
```

json-parser 从请求中获取原始数据，这些数据存储在 request 对象中，将其解析为一个 JavaScript 对象，并将其作为一个新的属性 body 分配给 request 对象。每当express收到一个HTTP GET请求时，它将首先检查build目录中是否包含一个与请求地址相对应的文件。如果找到了正确的文件，express将返回它。

错误作为参数被传递给 next 函数。如果 next 被调用时没有参数，那么将简单地继续执行下一个路由或中间件。如果 next 函数有参数，那么将执行 错误处理中间件。

注意错误处理中间件必须是最后一个载入的中间件！

在课程的示例代码中路由处理是 MVC 的 Controller，数据校验交给 Model 部分的代码处理。

</details>

<details>

<summary>Node.js 最佳实践</summary>

项目的目录结构进行修改后，我们最终得到以下结构。

```
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
```

</details>
