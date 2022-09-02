# uniapp-template

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### 注意

static 与 assets 都是放置静态资源的，具体区别如下：

- static 目录下的文件是不编译的，所以可以使用 **绝对路径**，如 `/static/img/logo.png`。最终生成的文件是原样输出的。
- assets 目录下的文件是经过 `webpack` 编译的，所以最终生成的文件会带有 hash 值。
