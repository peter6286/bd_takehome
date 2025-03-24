# 多线程学习

## 第一代码分析题

### 输出结果：

```bash
eventLoop
async1 start
async2
eventLoop end
promise 2
promise 4
promise2 then
promise4 then
setTimeout 1
promise 1
promise then
async1 end
async3
```
- 同步代码先执行: 
console.log('eventLoop'); 输出 'eventLoop'
async1(); 调用 async1 函数，输出 'async1 start'，然后调用 async2，输出 'async2'。由于 await，async1 中断，继续执行后面的同步代码
console.log('eventLoop end'); 输出 'eventLoop end'
- 异步代码：
new Promise(...).then(...) 创建的 Promise 立即执行，输出 'promise 2'，然后将 .then 放入微任务队列
new Promise(...).then(...) 创建的第二个 Promise 立即执行，输出 'promise 4'，然后将 .then 放入微任务队列
微任务队列执行
'promise2 then' 'promise4 then'
- setTimeout 回调执行：
输出 setTimeout 1 回调函数中的Promise执行，输出 promise 1，然后将 .then 放入微任务队列。微任务队列再执行输出 promise then。
最后，async1 中断点继续，输出 async1 end，然后执行 async3，输出 async3



### 修改 async1() 为 await async1() 
结果将会不同await async1() 将等待 async1 完成后再继续后面的同步代码。
所以结果将变为
```bash
eventLoop
async1 start
async2
async1 end
async3
eventLoop end
promise 2
promise 4
promise2 then
promise4 then
setTimeout 1
promise 1
promise then
```




## 第二题Note Management App

这是一个简单的笔记管理应用，允许用户添加、编辑、删除和搜索笔记，并且支持拖动以重新排序笔记。

- **HTML**：构建应用的基本结构。
- **CSS**：提供样式和响应式设计。
- **JavaScript**：实现笔记的添加、编辑、删除、搜索和拖动功能。
- **LocalStorage**：用于在浏览器中持久化存储笔记数据。

## 如何使用

### 拉去GitHub仓库
```bash
git clone https://github.com/peter6286/bd_takehome.git
```


### 切换到项目目录

```bash
cd note-management-app
```

### 使用 live-server 运行应用
```bash
npm install -g live-server
```

### 运行 live-server
```bash
live-server
```





