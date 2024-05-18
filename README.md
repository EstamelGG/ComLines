# ComLines
 A custom check list of command lines

# 需求背景

工作中有非常多的命令行需要用，背不下来。用笔记软件自然非常好使，但很多时候命令行中需要修改一些参数，比如ip地址、用户名等，这时候就得复制出来做修改再复制粘贴使用。如果需要再对字符串做编解码、拼接、正则、文本替换等需求，就很难用笔记软件实现了。

# 参考项目
- https://gchq.github.io/CyberChef/
- https://github.com/LasCC/HackTools

这两个工具都很好但都有不足:
1. 赛博厨子有非常丰富的加解密编解码等数据处理功能，但似乎只能对输入输出全量的运算，逻辑类似于output = hex(utf16(b58(b64(input))))，我们需要这样的运算逻辑：output = hex(b64(text1) + ":" + b64(text2))
2. hacktools前端很不错，但他毕竟是个浏览器插件，没有url跳转也没有锚点，没办法分享链接和配置项

```
npm install --force
npm start
```

# todo

1. 设计一个命令行 oneliner 编码器，提供：

    linux b64

    linux hex

    linux rot47

    powershell b64

    python + zlib + b64 命令执行

2. 设计基于powershell的内存加载exe模块

3. Linux 搬一些 [gtfobins](https://gtfobins.github.io/) 上的常用提权组件来，再列举一些常见的提权cve

4. CTF like 字符串绕过
