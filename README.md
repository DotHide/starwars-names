## StarWars Names

[![Travis](https://img.shields.io/travis/DotHide/starwars-names.svg?style=flat-square)](https://travis-ci.org/DotHide/starwars-names) [![Codecov](https://img.shields.io/codecov/c/github/DotHide/starwars-names.svg?style=flat-square)](https://codecov.io/github/DotHide/starwars-names?branch=master) [![npm](https://img.shields.io/npm/v/starwars-names-dothide.svg?style=flat-square)](https://www.npmjs.com/package/starwars-names-dothide) [![npm](https://img.shields.io/npm/dm/starwars-names-dothide.svg?style=flat-square)](https://www.npmjs.com/package/starwars-names-dothide) [![npm](https://img.shields.io/npm/l/starwars-names-dothide.svg?style=flat-square)](https://www.npmjs.com/package/starwars-names-dothide)

GitHub 怎么用？Issue 还能通过 commit 来同步关闭？版本号是怎么定义的？如何自动发行版本？Commit 还有公约和规范？怎样做持续构建？……

也许在工作中您会遇到诸如此类的问题，不论您是菜鸟还是老手，这篇文章也许都能让你在其中找到一些有价值可借鉴的东西，这是一个教我学会「如何编写一个 JS 开源库」的实践项目，同时也让我领悟了许多开源项目的工程管理方法和工具，包括 **版本管理、测试编写、自动版本发行、代码提交公约、持续构建（CI）、提交前测试、测试覆盖率及其报告** 等，总体感觉受益匪浅，在此对教程原文[[1]](#教程原文（Source）)表示感谢，并决定将视频中的大量知识通过写作分享给诸位，在学习过程中我也加入了一些自己的思考，将视频内容转换成了更通俗的语言，没时间看视频的朋友兴许可以瞧瞧这里，对于简单的技能可以跳过，相关技能的章节已做了电梯，可以直达进行阅读。如果您觉得本文有用，请您赏颗⭐️

它让我学会了以下 **新技能（√）**：

* 【[技能 1](#技能 1 账户建立)】**账户建立**：建立 GitHub 及 npmjs 账号
* 【[技能 2](#技能 2 账户配置)】**账户配置**：配置 NPM，并构建第一个库
* 【[技能 3](#技能 3 代码提交)】**代码提交**：提交开源库至 GitHub  
  【[技能 3.1](#免密登录（SSH Key）)】免密登录：无需每次输入密码登录 Linux 主机
* 【技能 4】**代码发布**：发布到 [NPM Repo](https://www.npmjs.com)
* 【技能 5】**版本管理1**：发布一个发行版本（Release Version）至 GitHub
* 【技能 6】**版本管理2**：发布一个发行版本至 NPM
* 【技能 7】**版本管理3**：发布一个 beta 版本
* 【技能 8】**单元测试**：利用 Mocha 和 Chai 建立单元测试
* 【技能 9】**自动版本发行**：利用 semantic-release 自动化发行
* 【技能 10】**代码提交公约**：利用 commitizen 编写提交公约
* 【技能 11】**持续构建（CI）1**：利用 TravisCI 持续构建
* 【技能 12】**提交前测试**：利用 ghooks 做提交前自动化测试
* 【技能 13】**测试覆盖率1**：利用 Istanbul 做代码覆盖
* 【技能 14】**测试覆盖率2**：添加代码覆盖率报告
* 【技能 15】**GH特效**：在 README 中添加徽章
* 【技能 16】**ES6支持1**：添加 ES6 支持
* 【技能 17】**ES6支持2**使用 Mocha & Babel 对测试添加 ES6 支持
* 【技能 18】**持续构建（CI）2**：Travis 上的限制分支构建

项目的名称叫 starwars-names，有两个非常简单的功能，但重点不在这里，重点是借助这样一个微型 JS 库（Micro JS Lib），向人们展示整个过程，使我们能应用到大型 JS 库（Huge JS Lib）中去：

1. 列出星球大战人物名（ all ）
2. 随机输出一个人物名（ random() ）

最终，你可以这样使用它：
```js
starWarsNames = require('starwars-names');
console.log(starWarsNames.all);
// List All StarWars Names
[
  "4-LOM",
  "Aayla Secura",
  "Admiral Ackbar",
  ...

  "Zam Wesell",
  "Zayne Carrick",
  "Zuckuss"
]

console.log(starWarsNames.random());
// Output a random starWarsName
"Revan"
```

让我们开始吧，首先找个目录，建个文件夹并进入：`$ mkdir starwars-names && cd $_`

### 技能 1 账户建立
GitHub 账号作为新时代的必要装备散发着其迷人的光环，但是有账号和会用是两码事，所以这个光环能不能发挥作用取决于账号底下内容的丰富程度。看完这篇文章我相信会对 GitHub 账号有新的认识，至少对我而言是这样。此外，我们还需要建立 npmjs 账号，用于发布 NPM 包（最终我们的开源项目将能以 `$ npm install starwars-names` 的方式进行安装）。

#### GitHub 账户
访问 https://github.com/ ，注册 GitHub 账号，并新建代码库（+ New repository），名称填写为 starwars-names，并填写描述后得到如下页面的代码：
```shell
echo "# starwars-names" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:<yourUserName>/starwars-names.git
git push -u origin master
```

在项目目录中直接执行以上代码，进行首次提交，然后回头看项目的页面就编程代码了。

#### NPM 账户
访问 https://www.npmjs.com/ ，注册 NPM 账号。

### 技能 2 账户配置
#### 设置 GitHub 环境变量
其实主要有以下几项设置：
```bash
# 设置账户信息
$ git config --global user.name '<yourName>'
$ git config --global user.email '<yourEmail>'

# 设置命令别名
$ git config --global alias.st status
$ git config --global alias.cm commit
$ git config --global alias.co checkout
...
```
设置后，输入 `$ cat ~/.gitconfig` 可以查看设置情况

#### 设置 npm 环境变量
由于我们后面要做 `$ npm init` 来生成 `package.json` 文件，但文件中的许多变量设置可以通过 npm 环境变量来设置，以省去每次输入的麻烦。我们去 https://docs.npmjs.com/misc/config 找到 init- 开头的四个变量
```shell
$ npm set init-author-name "<yourName>"
$ npm set init-author-email "<yourEmail>"
$ npm set init-author-url "https://github.com/<yourUserName>"
$ npm set init-license "MIT"
# 关于 license 选择可以参看这篇博客(http://blog.jobbole.com/44175/)

# 然后在本地添加你的账号
$ npm adduser
Username: # 输入 NPM 账户名
Password: # 输入密码
Email: (this IS public) # 输入你的邮箱（会公开）
```
> 没有 npm 命令？去 [NodeJS](https://nodejs.org/en/) 上下载 Node

设置后，输入 `$ cat ~/.npmrc` 可以查看设置情况

#### 初始化 package.json
接着执行 `$ npm init`
```bash
...
Press ^C at any time to quit.
name: (starwars-names) # 默认回车
version: (1.0.0) # 默认回车
description: Get random StarWars Names
entry point: (index.js) # 建议改为 src/index.js
test command: # 暂无先留空
git repository: (https://github.com/<yourUserName>/starwars-names.git) # 提示你的 GitHub 库，回车
keywords: starwars random
license: (MIT) # 默认回车
... # 最后它会让你确认文件内容，并询问
Is this ok? (yes) # 回车后将在项目目录中建立 package.json
```

#### 增加第三方依赖库
由于刚才我们设置了 enter point，所以先建文件夹和 index.js 文件：`$ mkdir src && touch src/index.js`
我们的项目功能需要引用另一个库 unique-random-array，在此我们正好学习引用依赖（Adding an Dependency），因此需要先安装这个库：
```bash
$ npm install --save unique-random-array 
```

至此，文件结构如下：
```
starwars-names/               * 项目目录
├── node_modules/             * Node 依赖目录
│   └── unique-random-array/  * unique-random-array 依赖库
│       └── ...
├── src/                      * 代码目录
│   └── index.js              * 项目主文件
├── package.json              * NPM 配置文件
└── README.md                 * README 文件
```
#### 编写第一个库文件
在编辑 index.js 之前还需要创建一个数据文件 starwars-names.json，它的内容如下（已简化）：
```js
[
  "4-LOM",
  "Aayla Secura",
  "Admiral Ackbar",
  "Admiral Thrawn",
  // ...
  "Zam Wesell",
  "Zayne Carrick",
  "Zuckuss"
]
```

接着编辑 index.js 文件，它将会是这个样子：
```js
// src/index.js
var uniqueRandomArray = require('unique-random-array');
var starWarsNames = require('./starwars-names.json');

module.exports = {
  all: starWarsNames,
  random: uniqueRandomArray(starWarsNames)
}
```

保存后，如果我们想做个快速的测试，可以打开 node 命令行工具： `$ node `
```js
// node cli
> var lib = require('./src/index.js');
> lib.all
[
  "4-LOM",
  "Aayla Secura",
  "Admiral Ackbar",
  "Admiral Thrawn",
  ...
  "Zam Wesell",
  "Zayne Carrick",
  "Zuckuss"
]
> lib.random()
"Sebulba"
> lib.random()
"Jarael"

```

至此，我们完成了 NPM 的配置，并建立了第一个库文件，当前项目文件如下：
```
starwars-names/               * 项目目录
├── node_modules/             * Node 依赖目录
│   └── unique-random-array/  * unique-random-array 依赖库
│       └── ...
├── src/                      * 代码目录
│   ├── index.js              * 库主文件
│   └── starwars-name.json    * 数据文件
├── package.json              * NPM 配置文件
└── README.md                 * README 文件
```

### 技能 3 代码提交
这时，我们可以将现有的代码提交至 GitHub，不过在提交前我们需要先将你的机器跟 GitHub 做账号绑定（Adding SSH Keys to GitHub）：

* 首先打开 GitHub 网站并登陆，在右上角下拉选项中找到 Settings，然后找到左侧 SSH Keys，这时可以点击（New SSH Key）来添加你的钥匙。
* 输入 Title # 给钥匙起个名字，比如我的是：Jack's MBP
* 输入 Key # 这里有你想要的 Key 生成方法（https://help.github.com/articles/generating-an-ssh-key/）

保存后你的机器无需每次都输入账户密码即可提交代码了。

#### 免密登录（SSH Key）
这个过程就如免密登录 Linux 主机的方法一样，这里简单扯几句。如果你希望访问某台 Linux 主机 / 服务器时不需要每次都输入密码，可以在该台机器上做如下操作：

* 建立 authorized_keys 文件 `$ touch ~/.ssh/authorized_keys`
* 然后将你刚才的 SSH Key 粘贴到这个文件里即可
* 当然访问权限取决于你的账户权限

这时你再用 `$ ssh <yourAccount>@<yourHost>` 时就能直接登录了

#### 代码提交
接着说代码提交，在提交前我们注意到 node_modules/ 这个文件夹是不需要做代码管理的，它是 npm 通过 package.json 文件自动生成的，因此我们可以将它忽略（使用 .gitignore文件），在项目根目录添加 `.gitignore` 文件，并加入一行 `node_modules` 即可。

* 我们先运行一下： `$ git status`，确认一下需要被提交的文件
* 然后将所有文件加入工作区： `$ git add .`
* 接着执行提交命令： `$ git commit -am '完成了功能 all 和 random'`
* 最后推送到 GitHub： `$ git push`

至此，我们完成了代码提交，项目结构如下：
```
starwars-names/               * 项目目录
├── node_modules/             * Node 依赖目录
│   └── unique-random-array/  * unique-random-array 依赖库
│       └── ...
├── src/                      * 代码目录
│   ├── index.js              * 库主文件
│   └── starwars-name.json    * 数据文件
├── .gitignore                * 登记 Git 代码忽略内容
├── package.json              * NPM 配置文件
└── README.md                 * README 文件
```

### 教程原文（Source）
[1] [《How to Write an Open Source JavaScript Library》](https://egghead.io/series/how-to-write-an-open-source-javascript-library) by [Kent C. Dodds](http://kentcdodds.com)