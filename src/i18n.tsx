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
          misc_switch: 'Switch',
          misc_selectfile: 'Select File',
          misc_copy: 'Copy',
          misc_calc: 'Calculate',
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
            {'title': 'Respawn TTY Shell', 'link': '../SpawnTTY'},
            {'title': 'Useful Linux Cmd', 'link': '../linuxCmd'},
            {'title': 'Useful Windows Cmd', 'link': '../windowsCmd'},
            {'title': 'Useful Powershell Cmd & AD', 'link': '../powershell'},
            {'title': 'Windows File Transfer', 'link': '../FileTrans'},
            {'title': 'Data Encoder', 'link': '../Encoder'},
            {'title': 'Oneliner', 'link': '../OneLiner'},
            {'title': 'Cmd Obfuscate', 'link': '../CmdObfuscate'},
            {'title': 'Obfuscated Files or Information', 'link': '../FileEncodeTrans'},
            {'title': 'Calculate Hash', 'link': '../Hashing'},
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
          msfconsole_cmd1: 'Open Msfconsole listener and generate backdoor:',
          msfvenom_cmd2: 'Launch Console & Load Handler:',
          msfvenom_cmd3: 'Load Handler Only:',
          msfvenom_show_adv: 'Show advanced options',
          msfvenom_customParams: 'Custom Payload Advanced Options',
          tty_title: 'Spawn TTY Shell',
          tty_desc: 'Often during pen tests you may obtain a shell without having tty, yet wish to interact further with the system. Here are some commands which will allow you to spawn a tty shell. Obviously some of this will depend on the system environment and installed packages.',
          tty_solution1: '1. Spawn TTY Shell with Python',
          tty_solution2: '2. Spawn TTY Shell with Socat',
          tty_solution3: '3. Spawn TTY Shell with Pwncat',
          tty_solution1_use: 'Execute in reverse shell',
          tty_solution2_getbin: 'Get Socat binary and upload to target',
          tty_solution2_getcmd: 'Execute socat in target to get reverse shell',
          tty_solution3_getbin: 'Install Pwncat in attacker',
          tty_solution3_use: 'Create listener with pwncat',
          tty_solution3_shell: 'Get Target Doamin\'s Shell through pwncat',
          tty_solution3_tty: 'You have tty shell already',
          tty_autocomp: 'Allow autocomplete',
          tty_background: 'Finally (and most importantly) we will background the shell using',
          tty_background1: 'Back in our own terminal we use',
          tty_background2: 'This does two things: first, it turns off our own terminal echo which gives us access to tab autocompletes, the arrow keys, and Ctrl + C to kill processes',
          data_encoder_title: 'Data Encoder',
          data_encoder_desc: 'Adversaries may encode data to make the content of command and control traffic more difficult to detect. Command and control (C2) information can be encoded using a standard data encoding system. Use of data encoding may adhere to existing protocol specifications and includes use of ASCII, Unicode, Base64, MIME, or other binary-to-text and character encoding systems.Some data encoding systems may also result in data compression, such as gzip.',
          cmd_obfuscate: 'Commandline Obfuscator',
          cmd_obfuscate_desc: 'Commandline Obfuscator is used to edit command line and confuse EDR devices.',
          quotation: 'quotation',
          Carets: 'Carets',
          variable: 'variable',
          hash_enerator_title: 'Hash Generator',
          hash_enerator_desc: 'A hash function is any function that can be used to map data of arbitrary size to fixed-size values. The values returned by a hash function are called hash values, hash codes, digests, or simply hashes.',
          hash_enerator_reference: [
            {'title': 'Decrypt MD5, SHA1, MySQL, NTLM, SHA256, MD5 Email, SHA256 Email, SHA512, Wordpress, Bcrypt hashes for free online', 'link': 'https://hashes.com/en/decrypt/hash'},
            {'title': 'crackstation', 'link': 'https://crackstation.net/'},
            {'title': 'Md5CheckerCn.exe', 'link': '../files/Md5CheckerCn.exe'}
          ],
          hash_multifiles: "Calc hash of files",
          hash_copy: 'Your hash has been copied successfully',
          hash_copy_err: 'Nothing to copy',
          oneliner_title: 'One-line Generator',
          oneliner_desc: 'Generate One-line-commandline to execute<br />Bash b64/hex/rot47: Require Bash command line or Bash script<br />Python: Require python code<br />Powershell: Require powershell code (part "powershell -c" is not necessary )',
          linux_cmd_title: 'Useful Linux command for your Penetration Testing',
          linux_cmd_desc: 'List of useful commands on Linux.',
          getKernelVersion: 'Get Linux Kernel Version',
          getSystemVersion: 'Get Linux System Version',
          getHostInfo: 'Get Host Info',
          getIP: 'Get Network Info',
          getUserAndPass: 'Get Users Info',
          getBashHistory: 'Get bash history',
          getSuid: 'Get SUID binary',
          getWritablePath: 'Get Writable Path',
          getEnvironmentVariables: 'Get Environment Variables',
          getServiceSettings: 'Get Service Settings',
          getCronTabs: 'Get Crontab Task Info',
          getSystemAndUserInfo: 'Get System and User Info',
          getService: 'Get System Services',
          getNetWorkInfo: 'Get Network Info',
          getProcess: 'Get Process Info',
          process: 'Process',
          getMiscInfo: 'Get other info',
          Service: 'Operate System Service',
          wlan: 'Get wlan password',
          powershell_title: 'Powershell handy commands',
          powershell_desc: 'List of useful Powershell commands',
          filetrans_title: 'Windows File Transfer Methods',
          filetrans_desc: 'Over the past few years, the Windows operating system has evolved and new versions come with different utilities for file transfer operations. Understanding file transfer in Windows can be helpful to both attackers and defenders alike. Attackers can use various file transfer methods to operate and avoid being caught.',
          filetrans_ps: 'PowerShell Download File Method',
          filetrans_psfl: 'PowerShell DownloadString - Fileless Method',
          filetrans_psfl_webrequest: 'PowerShell Invoke-WebRequest',
          filetrans_psfl_webrequest_desc: 'From PowerShell 3.0 onwards, the "Invoke-WebRequest" cmdlet is also available, but it is noticeably slower at downloading files. You can use the aliases "iwr", "curl", and "wget" instead of the Invoke-WebRequest full name.',
          filetrans_smb: 'SMB Downloads',
          filetrans_smb_desc_1: 'The SMB protocol that runs on port TCP/445 is most commonly found in enterprise networks where Windows services are running. It allows applications and users to transfer files between and between remote servers.',
          filetrans_smb_desc_2: 'We can use SMB to download files from our attacker machine easily. We need to create an SMB server in our machine with smbserver.py from Impacket and then use copy, move, PowerShell Copy-Item, or any other tool that allows connection to SMB.',
          filetrans_smb_desc_3: 'New versions of Windows block unauthenticated guest access!',
          filetrans_smb_desc_4: 'To transfer files in this scenario, we can set a username and password using our Impacket SMB server and mount the SMB server on our windows target machine:',
          filetrans_ftp: 'FTP Download',
          filetrans_ftp_up: 'FTP Uploads',
          filetrans_ftp_desc: 'Another way to transfer files is using FTP (File Transfer Protocol), which use port TCP/21 and TCP/20. We can use the FTP client or PowerShell Net.WebClient to download files from an FTP server. We can configure an FTP Server in our attack host using Python3 pyftpdlib module. It can be installed with the following command:',
          filetrans_ftp_ps: 'Transfering Files from an FTP Server Using PowerShell',
        }
      },
      zh: {
        translation: {
          misc_encode: '编码',
          misc_decode: '解码',
          misc_switch: '交换',
          misc_copy: '复制',
          misc_selectfile: '选择文件',
          misc_clear: '清除',
          misc_calc: '计算',
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
            {'title': '升级 Linux 交互式 Shell (TTY)', 'link': '../SpawnTTY'},
            {'title': '实用 Linux 命令行', 'link': '../linuxCmd'},
            {'title': '实用 Windows 命令行', 'link': '../windowsCmd'},
            {'title': '实用 Powershell 与 AD 域命令行', 'link': '../powershell'},
            {'title': 'Windows 文件传输', 'link': '../FileTrans'},
            {'title': '编解码器', 'link': '../Encoder'},
            {'title': 'Oneliner', 'link': '../OneLiner'},
            {'title': 'Cmd 混淆器', 'link': '../CmdObfuscate'},
            {'title': '文件与信息混淆', 'link': '../FileEncodeTrans'},
            {'title': '哈希计算器', 'link': '../Hashing'},
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
          msfvenom_desc: 'MSFVenom 是 Metasploit 的命令行工具，用于生成 Metasploit 中各种类型的 shell 代码或程序。<br />本页通过可视化的方式协助用户生成 MSFVemon 命令。<br /> Payload 中，含有 /meterpreter/ 的一般是staged payload，体积大，不需要二次加载；含有 /meterpreter_ 的一般是stageless payload，体积小但需要二次加载。<br />具体可以通过执行 msfvenom -p xxxxx --list-options 来查看指定 payload 类型，或通过 msfvenom --list payloads 来查看所有 payload 类型。<br />自定义Payload高级选项：参考 msf 中选择 Payload 后执行 advanced 命令所获得的介绍。',
          msfvenom_cmd1: 'MSFVenom 生成后门程序:',
          msfconsole_cmd1: 'MSFConsole 监听并生成后门程序:',
          msfvenom_cmd2: '启动 MSFConsole 并加载监听器 Handler:',
          msfvenom_cmd3: 'MSFConsole 加载监听器 Handler:',
          msfvenom_show_adv: '显示高级选项',
          msfvenom_customParams: '自定义Payload高级选项',
          tty_title: '升级交互式 Shell (Spawn TTY Shell)',
          tty_desc: '当收获一个来自 Linux 的反弹 Shell 后，往往是非交互式的 Shell，无法执行例如 sudo 等需要交互式的命令，因此我们需要使用一些办法来获取交互式 Shell。',
          tty_solution1: '1. 通过 Python 升级 Shell',
          tty_solution2: '2. 通过 Socat 升级 Shell',
          tty_solution3: '3. 通过 Pwncat 升级 Shell',
          tty_solution1_use: '在获得的反弹 Shell 中执行',
          tty_solution2_getbin: '获取 Socat 二进制程序，上传至目标主机',
          tty_solution2_getcmd: '在攻击机上监听端口，在目标主机执行 Socat 命令，获取反弹 Shell',
          tty_solution3_getbin: '在攻击机上安装 Pwncat',
          tty_solution3_use: '在攻击机上使用 Pwncat 创建监听',
          tty_solution3_shell: '在目标主机上执行反弹 Shell 命令后，通过 Pwncat 进入远程主机的 Shell',
          tty_solution3_tty: 'Pwncat 会自动升级到交互式 Shell 并实现自动补全等能力，不需要额外设置',
          tty_autocomp: '(可选) 依次操作实现自动补全',
          tty_background: '关键步骤：挂起当前进程，回到自己的终端',
          tty_background1: '回到自己的终端后执行以下命令',
          tty_background2: '敲几下回车，最终能够获取 tab 自动补全、方向键、Ctrl + C 杀死进程等终端能力。',
          data_encoder_title: '编解码器',
          data_encoder_desc: '本页提供了一些编码方式 (Base64、Hex、URL编码等)，可以帮助用户进行一些简单的编解码工作。考虑到输入输出的编码可能对结果造成影响，请尽量输入英文、数字、字母，避免使用容易出现乱码的语言和文字。',
          cmd_obfuscate: '命令行混淆器',
          cmd_obfuscate_desc: '本页提供了一个用于混淆命令行的工具，以降低 EDR 等设备检测到命令行中关键词的概率。混淆方案包括：脱字符(^)、引号、Tab、变量、编码等。<br />注意：1. 不保证混淆后的命令总能正常执行。2. 输入内容使用英文，其他语言容易出现编码错误。',
          quotation: '引号',
          Carets: '脱字符(^)',
          variable: '变量',
          hash_enerator_title: '哈希计算器',
          hash_enerator_desc: '该页面提供一些常见的哈希计算功能，包括：MD5、SHA、国密算法，还能够选择本机的多个文件进行计算。<br />计算多行字符串的哈希时，考虑到换行符的区别(CR、LF)，在不同平台下计算结果可能不同。<br />文末参考部分提供了一些能够检索已知哈希的网站。',
          hash_enerator_reference: [
            {'title': 'Decrypt MD5, SHA1, MySQL, NTLM, SHA256, MD5 Email, SHA256 Email, SHA512, Wordpress, Bcrypt hashes for free online', 'link': 'https://hashes.com/en/decrypt/hash'},
            {'title': 'Crackstation', 'link': 'https://crackstation.net/'},
            {'title': 'Md5CheckerCn.exe', 'link': '../files/Md5CheckerCn.exe'}
          ],
          hash_multifiles: "计算文件哈希",
          hash_copy: '已复制 Hash 到剪贴板',
          hash_copy_err: '没什么可以复制的',
          oneliner_title: '单行命令行压缩 (OneLiner)',
          oneliner_desc: '将 bash 命令、powershell 命令、cmd命令、python脚本等多行的、含有特殊符号的命令行压缩到一行，以提高隐蔽性，减少干扰。<br />编码模式中 Multi 指各种跨平台脚本环境。编码时只需要传入对应语言的 payload 即可。<br />- Bash b64/hex/rot47: 需要 Bash 命令行或 Bash 脚本<br />- Python: 需要输入 Python 代码<br />- PowerShell: 需要 PowerShell 代码 (不需要 powershell -bypass -c 等部分)<br />考虑到输入输出的编码可能对结果造成影响，请尽量输入英文、数字、字母，并避免使用容易出现乱码的语言和文字。',
          linux_cmd_title: 'Linux 实用命令',
          linux_cmd_desc: 'Linux 环境下用于系统信息探测的常用命令。',
          windows_cmd_title: 'Windows 实用命令',
          windows_cmd_desc: 'Windows 环境下用于系统信息探测的常用命令。',
          getKernelVersion: '获取内核版本',
          getSystemVersion: '获取系统版本',
          getHostInfo: '获取主机信息',
          getIP: '获取网络信息',
          getUserAndPass: '获取用户信息',
          getBashHistory: '获取执行命令历史',
          getSuid: '获取 SUID 进程',
          getWritablePath: '获取可写目录',
          getEnvironmentVariables: '获取环境变量',
          getServiceSettings: '获取服务信息',
          getCronTabs: '获取 Crontab 任务信息',
          getSystemAndUserInfo: '获取系统和用户信息',
          getService: '获取系统服务',
          getNetWorkInfo: '获取网络信息',
          getProcess: '获取进程信息',
          process: '处理',
          getMiscInfo: '获取其他系统信息',
          Service: '操作系统服务',
          wlan: '获取保存的无线网络密码',
          powershell_title: 'Powershell 与 AD 域命令',
          powershell_desc: '一些有用的 PowerShell 命令和脚本，以及与AD域相关的命令',
          filetrans_title: 'Windows 下的文件传输',
          filetrans_desc: '一些在 Windows 上传输文件的方法，可以被用于绕过一些基础的检测。',
          filetrans_ps: '基于 PowerShell 的文件传输',
          filetrans_psfl: '基于 PowerShell 的无文件加载',
          filetrans_psfl_webrequest: '基于 PowerShell(>=3.0) 的 Invoke-WebRequest文件下载',
          filetrans_psfl_webrequest_desc: '自 PowerShell 3.0 开始，引入了 "Invoke-WebRequest" 命令用于下载文件，但速度较慢，可以使用基于该方法的其他命令，如"iwr", "curl", "wget"。',
          filetrans_smb: 'SMB 文件下载',
          filetrans_smb_desc_1: '在端口 TCP/445 上运行的 SMB 协议最常见于运行 Windows 服务的企业网络中。它允许应用程序和用户在远程服务器之间传输文件。',
          filetrans_smb_desc_2: '我们需要使用Impacket 中的smbserver.py在我们的计算机中创建一个 SMB 服务器，然后使用copy、move、PowerShell -c "Copy-Item" 或任何其他允许连接到 SMB 的工具来从我们的服务器上获取文件。',
          filetrans_smb_desc_3: '新版本的 Windows 不再允许未授权访问！',
          filetrans_smb_desc_4: '要在这种情况下传输文件，我们可以使用 Impacket SMB 服务器设置用户名和密码，并将 SMB 服务器作为虚拟磁盘挂载到 Windows 目标计算机上：',
          filetrans_ftp: 'FTP 文件下载',
          filetrans_ftp_desc: '安装并启动 FTP 服务:',
          filetrans_ftp_ps: '通过 PowerShell 命令传输文件',
          filetrans_ftp_up: 'FTP 文件上传',
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
