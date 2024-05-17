// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          misc_encode: 'Encode',
          misc_decode: 'Decode',
          misc_copy: 'Copy',
          misc_clear: 'Clear',
          misc_ref: "Reference",
          misc_add_custtom: 'Add Custom Params',
          about: 'About',
          Contributors: 'Contributors',
          about_text: 'This project is a fork from:',
          aboutme0: 'Great, sacred, wise, omnipotent AI:',
          aboutme1: 'Despicable, shameless, vulgar, low-class, crude hacker:',
          aboutme2: 'Embarrassing, creepy, perverted otaku:',
          aboutlink: 'Function link',
          functionLinks: [
            {'title': 'Reverse Shell', 'link': '../RevShell'},
            {'title': 'PHP WebShell', 'link': '../PHPWebShell'},
            {'title': 'Obfuscated Files or Information', 'link': '../FileEncodeTrans'},
            {'title': 'MSFVenom Builder', 'link': '../MSFVenom'},
          ],
          revshell_title: 'Reverse Shell',
          revshell_desc: 'A reverse shell is a type of network communication in which a connection is established from a remote host (the "attacker") to a target host (the "victim") and the attacker is able to execute commands on the victim\'s machine as if they were running on the attacker\'s machine. <br />This is typically done by exploiting a vulnerability in the victim\'s system or by tricking the victim into running a malicious program that establishes the reverse shell.',
          revshell_copied: 'Your reverse shell has been copied to the clipboard!',
          revshell_encode_copied: 'Your encoded reverse shell has been copied to the clipboard!',
          revshell_expand: 'ExpandAll',
          revshell_collapse: 'CollapseAll',
          revshell_infoURLCopied: 'URL has been copied to the clipboard!',
          fileTrans_title: 'Obfuscated Files or Information',
          fileTrans_desc: 'Adversaries may attempt to make an executable or file difficult to discover or analyze by encrypting, encoding, or otherwise obfuscating its contents on the system or in transit. <br />This is common behavior that can be used across different platforms and the network to evade defenses.',
          fileTrans_reference: [
            {'title': 'Obfuscated Files or Information, Technique T1027 - Enterprise | MITRE ATT&CK®', 'link': 'https://attack.mitre.org/techniques/T1027/'},
            {'title': 'atomic-red-team/atomics/T1027/T1027.md', 'link': 'https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1027/T1027.md'}
          ],
          fileTrans_err1: 'Please enter some text to encode or upload a file',
          fileTrans_err2: 'Please enter output file name or path',
          fileTrans_err3: 'Invalid Base64 input',
          fileTrans_err4: 'Please upload a file',
          fileTrans_err5: 'Please select encode mode',
          fileTrans_largefile_warn: 'The selected file size exceeds 10MB. Do you want to continue uploading?',
          fileTrans_info1: 'Read file ',
          fileTrans_selection_plain: 'Plain Text',
          fileTrans_selection_file: 'File',
          fileTrans_select_transmode: 'Select encode mode',
          php_webshell_title: 'PHP WebShell',
          php_webshell_desc: 'Attackers who successfully exploit a remote command execution vulnerability can use a reverse shell to obtain an interactive shell session on the target machine and continue their attack.',
          php_webshell_desc1: 'This script will make an outbound TCP connection to a hardcoded IP and port.',
          php_webshell_desc2: 'When you have successfully uploaded your payload, just put your commands after the variable ?cmd=(ex: ?cmd=\"ls -la\")',
          php_webshell_preview: 'Watch the preview',
          php_webshell_showsource: 'View the souce code',
          php_webshell_p0wny_desc: 'p0wny@shell:~# is a very basic, single-file, PHP shell. It can be used to quickly execute commands on a server when pentesting a PHP application.',
          php_webshell_filebox_desc: 'FileBox is a single-file php file manager. Allow upload, download, db connect. Support PHP 5.x .',
          php_webshell_tinyfilemanager_desc: 'TinyFileManager is a single-file php file manager. Allow upload, download. Support PHP 5.x and 7.x .',
          php_webshell_phpexplorer_desc: 'PHP file mananger created by chatgpt. Allow browser all file in target OS.',
          php_webshell_obfuscate: 'Obfuscated PHP Web Shell',
          msfvenom_title: 'MSF Venom Builder',
          msfvenom_desc: 'Msfvenom is a command line instance of Metasploit that is used to generate and output all of the various types of shell code that are available in Metasploit.',
          msfvenom_cmd1: 'MSF Venom Command:',
          msfvenom_cmd2: 'Launch Console & Load Handler:',
          msfvenom_cmd3: 'Load Handler Only:',
          msfvenom_show_adv: 'Show advanced options',
          msfvenom_customParams: 'Custom Payload Advanced Options',
          tty_title: 'Spawn TTY Shell',
          tty_desc: 'Often during pen tests you may obtain a shell without having tty, yet wish to interact further with the system. Here are some commands which will allow you to spawn a tty shell. Obviously some of this will depend on the system environment and installed packages.',
          tty_solution1: '1. Spawn TTY Shell with Python',
          tty_solution2: '2. Spawn TTY Shell with Socat',
          tty_solution2_getbin: 'Get Socat Binary, execute in target',
          tty_solution2_getcmd: 'Get Socat Reverse Shell',
          tty_autocomp: 'Allow autocomplete',
          tty_background: 'Finally (and most importantly) we will background the shell using',
          tty_background1: 'Back in our own terminal we use',
          tty_background2: 'This does two things: first, it turns off our own terminal echo which gives us access to tab autocompletes, the arrow keys, and Ctrl + C to kill processes',
        }
      },
      zh: {
        translation: {
          misc_encode: '编码',
          misc_decode: '解码',
          misc_copy: '复制',
          misc_clear: '清除',
          misc_ref: "参考",
          misc_add_custtom: '添加自定义参数',
          about: '关于',
          Contributors: '贡献者',
          about_text: '该项目 Fork 自:',
          aboutme0: '伟大神圣智慧全能的AI:',
          aboutme1: '卑鄙无耻下流低级的废物黑客:',
          aboutme2: '猥琐禽兽变态的二次元死宅:',
          aboutlink: '功能链接',
          functionLinks: [
            {'title': '反弹 Shell', 'link': '../RevShell'},
            {'title': 'PHP WebShell', 'link': '../PHPWebShell'},
            {'title': '文件与信息混淆', 'link': '../FileEncodeTrans'},
            {'title': 'MSFVenom 命令行构造', 'link': '../MSFVenom'},
          ],
          revshell_title: '反弹 Shell (Reverse Shell)',
          revshell_desc: '反弹 shell 一般是指 "由受害主机反向向攻击者主机建立网络连接，使攻击者能够通过网络在受害主机上操作 Shell" 的行为。<br />通常是通过利用受害主机中的软件漏洞，或诱使受害者运行后门程序以建立反弹 Shell。<br />以下部分命令提供了基于各种编码的单行命令行 (OneLiner)。<br />更多姿势(包括加密姿势)可以参考 msfvenom payload \'unix/reverse_\' 系列',
          revshell_copied: '已复制命令行到剪贴板',
          revshell_encode_copied: '已复制编码的命令行到剪贴板',
          revshell_expand: '全部展开',
          revshell_collapse: '全部折叠',
          revshell_infoURLCopied: '已复制 URL 到剪贴板',
          fileTrans_title: '文件与信息混淆 (Obfuscated Files or Information)',
          fileTrans_desc: '在向受害者主机传输文件的过程中，攻击者可能会尝试使用加密、编码等方式对文件内容进行混淆处理，以降低被安全设备检测到的概率。<br />本页提供一种通过编码的方式上传文件与二进制程序的方案，适用于绕过一些简单的防御。<br />通过输入需要写入的文件的内容和名称，或选择一个本地的文件，页面会生成bash或cmd命令，在目标主机上执行命令即可写入相同的文件。',
          fileTrans_reference: [
            {'title': 'Obfuscated Files or Information, Technique T1027 - Enterprise | MITRE ATT&CK®', 'link': 'https://attack.mitre.org/techniques/T1027/'},
            {'title': 'atomic-red-team/atomics/T1027/T1027.md', 'link': 'https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1027/T1027.md'}
          ],
          fileTrans_err1: '输入要编码的内容或上传文件',
          fileTrans_err2: '需要设置输出的文件名或路径',
          fileTrans_err3: '输入的Base64字符串不合法',
          fileTrans_err4: '上传一个文件',
          fileTrans_err5: '选择一个编码模式',
          fileTrans_info1: '读取文件 ',
          fileTrans_largefile_warn: '所选文件较大，可能造成页面卡顿，是否继续？',
          fileTrans_payloadcopied: '已复制 Payload 到剪贴板',
          fileTrans_selection_plain: '纯文本',
          fileTrans_selection_file: '文件',
          fileTrans_select_transmode: '选择编码模式',
          php_webshell_title: 'PHP WebShell',
          php_webshell_desc: '在对 PHP 网站实施渗透的时候，可以通过写入 PHP 后门文件来获取控制。',
          php_webshell_desc1: '该后门文件会反弹 Shell 到文件中硬编码的攻击者 IP 和端口。Test in PHP 5.6.9, WinServer 2012R2 .',
          php_webshell_desc2: '成功上传后，通过访问 cmd 参数即可利用: http://target.com/path/to/shell.php?cmd=\"ls -la\"',
          php_webshell_preview: '预览',
          php_webshell_showsource: '查看源码',
          php_webshell_p0wny_desc: 'p0wny shell 是一款单文件终端风格的 PHP Webshell，提供基础的命令执行功能。',
          php_webshell_filebox_desc: 'FileBox 是一款单文件 PHP，提供基础的文件管理功能，提供上传、下载、数据库连接等功能。只兼容 PHP 5.x。',
          php_webshell_tinyfilemanager_desc: 'TinyFileManager 是一款单文件 PHP，提供基础的文件管理功能，提供上传、下载等功能。兼容 PHP 5.x 和 7.x。',
          php_webshell_phpexplorer_desc: 'ChatGPT 编写的单文件 PHP 文件浏览器，可以浏览系统根目录下所有文件，不仅局限于 web 目录。',
          php_webshell_obfuscate: 'PHP WebShell 文件混淆',
          msfvenom_title: 'MSFVenom 命令行构造',
          msfvenom_desc: 'MSFVenom 是 Metasploit 的命令行工具，用于生成 Metasploit 中各种类型的 shell 代码或程序。<br />本页通过可视化的方式协助用户生成 MSFVemon 命令。<br /> Payload 中，含有 /meterpreter/ 的一般是stageless payload，体积小但需要二次加载；含有 /meterpreter_ 的一般是staged payload，体积大，不需要二次加载。<br />自定义Payload高级选项：参考 msf 中选择 Payload 后执行 advanced 命令所获得的介绍。',
          msfvenom_cmd1: 'MSFVenom 生成命令:',
          msfvenom_cmd2: '启动 MSFConsole 并加载监听器 Handler:',
          msfvenom_cmd3: '只加载监听器 Handler:',
          msfvenom_show_adv: '显示高级选项',
          msfvenom_customParams: '自定义Payload高级选项',
          tty_title: '升级交互式 Shell (Spawn TTY Shell)',
          tty_desc: '当收获一个来自 Linux 的反弹 Shell 后，往往是非交互式的 Shell，无法执行例如 sudo 等需要交互式的命令，因此我们需要使用一些办法来获取交互式 Shell。',
          tty_solution1: '1. 通过 Python 升级 Shell',
          tty_solution2: '2. 通过 Socat 升级 Shell',
          tty_solution2_getbin: '获取 Socat 二进制程序，在目标主机执行',
          tty_solution2_getcmd: '获取 Socat 反弹 Shell 命令行',
          tty_autocomp: '(可选) 依次操作实现自动补全',
          tty_background: '关键步骤：挂起当前进程，回到自己的终端',
          tty_background1: '回到自己的终端后执行以下命令',
          tty_background2: '敲几下回车，最终能够获取 tab 自动补全、方向键、Ctrl + C 杀死进程等终端能力。',
        }
      }
    },
    lng: navigator.language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;