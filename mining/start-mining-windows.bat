@echo off
REM ZION Mining Startup Script - Windows
REM Spouští XMRig pro těžení ZION blockchainu na Windows

echo 🪟 ZION Mining for Windows
echo Genesis Block Hash: d763b61e4e542a6973c8f649deb228e116bcf3ee099cec92be33efe288829ae1
echo Mining Address: ajmqontZjiVUmtNjQu1RNUYq1RZgd5EDodX3qgjcaTMoMzG8EkG4bVPgLhEgudBoH82fQU1iZVw6XPfddKWAHDdA3x92ToH4uo
echo Server: 91.98.122.165:18081
echo.

REM Check if server is accessible
echo Checking server connection...
curl -s http://91.98.122.165:18081/getinfo >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✅ Server is accessible
) else (
    echo ❌ Server is not accessible
    pause
    exit /b 1
)

echo 🔥 Starting XMRig for Windows...
cd /d "%~dp0platforms\windows\xmrig-6.21.3"
xmrig.exe --config=config-zion.json

pause