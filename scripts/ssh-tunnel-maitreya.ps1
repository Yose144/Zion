Param(
  [ValidateSet('start','stop')][string]$Action = 'start'
)

$ErrorActionPreference = 'Stop'
$key = Join-Path $env:LOCALAPPDATA 'Zion\ssh\id_ed25519'
$kh  = Join-Path $env:LOCALAPPDATA 'Zion\ssh\known_hosts'
$server = '91.98.122.165'

function Start-Tunnel {
  Write-Host "[tunnel] Starting SSH tunnels -> $server (3333, 18089)"
  $args = @('-F','NUL','-i', $key,'-o',"UserKnownHostsFile=$kh",'-o','GlobalKnownHostsFile=NUL','-o','StrictHostKeyChecking=accept-new','-N','-L','127.0.0.1:3333:127.0.0.1:3333','-L','127.0.0.1:18089:127.0.0.1:18089',"root@$server")
  Start-Process -FilePath ssh -ArgumentList $args -WindowStyle Hidden | Out-Null
  Start-Sleep -Seconds 2
  Test-NetConnection -ComputerName 127.0.0.1 -Port 3333 | Out-Null
  Test-NetConnection -ComputerName 127.0.0.1 -Port 18089 | Out-Null
  Write-Host "[tunnel] Ready: 127.0.0.1:3333 and :18089"
}

function Stop-Tunnel {
  Write-Host "[tunnel] Stopping tunnels (best-effort)"
  Get-Process ssh -ErrorAction SilentlyContinue | Where-Object { $_.Path -like '*\ssh.exe' } | Stop-Process -Force -ErrorAction SilentlyContinue
}

if ($Action -eq 'start') { Start-Tunnel } else { Stop-Tunnel }
