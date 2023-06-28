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

最简单和最好的方法是通过多次使用useState函数来创建独立的状态 "片段"。
https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
我个人的理解是，一起更新的最小的状态创建一个状态。比方说FQA里面提到的，left和top是每次更新都要更新的，那就left和top放在一个状态里面在一起。课程里面的更新状态，一次只会更新left或者right，那就为left和right各自创建一个状态。

> 一个典型的开发者的大部分时间都花在调试和阅读现有的代码上。偶尔我们也会写一两行新的代码，但我们的大部分时间都花在试图弄清楚为什么某个东西坏了或某个东西是如何工作的。因此，良好的调试实践和工具是非常重要的。

Do Not Define Components Within Components.
由于React在每次渲染时都将定义在另一个组件内的组件视为一个新的组件。这使得React无法优化该组件。
