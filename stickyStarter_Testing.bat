@echo off
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo uhh wtf
    pause
    exit /b
)
echo lording the lord
start cmd /k "node stickyProxy.js"
echo openinin the fil
start "" "index.html"
pause
