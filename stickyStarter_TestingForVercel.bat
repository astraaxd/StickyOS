@echo off
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo install vercel buddy!
    pause
    exit /b
)
echo boop bop!
echo {
    "rewrites": [
        {
            "source": "/proxy",
            "destination": "/api/stickyProxy"
        }
    ]
} > vercel.json
echo deioploring!
vercel --prod
echo doner!
pause
