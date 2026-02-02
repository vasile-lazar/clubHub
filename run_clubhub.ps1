# launch-clubhub.ps1
Write-Host "Starting ClubHub..."

# --- Start SQL Server if not running ---
$sqlService = Get-Service -Name 'MSSQL$SQLEXPRESS' -ErrorAction SilentlyContinue
if ($sqlService.Status -ne 'Running') {
    Write-Host "Starting SQL Server..."
    Start-Service $sqlService
    Start-Sleep -Seconds 5
} else {
    Write-Host "SQL Server is already running."
}

# --- Start backend ---
Write-Host "Starting backend..."
$backend = Start-Process powershell -ArgumentList '-NoExit','-Command',"cd `"$PSScriptRoot\backend`"; dotnet run" -PassThru

# --- Wait for backend to be ready using /api/ping ---
Write-Host "Waiting for backend to be ready..."
$maxRetries = 10
$delay = 3
for ($i = 0; $i -lt $maxRetries; $i++) {
    try {
        $resp = Invoke-WebRequest -Uri 'http://localhost:5000/api/ping' -UseBasicParsing
        if ($resp.StatusCode -eq 200) { 
            Write-Host "Backend is ready!" 
            break 
        }
    } catch {}
    Write-Host -NoNewline "."
    Start-Sleep -Seconds $delay
}

Write-Host "" # just a newline after dots

# --- Start frontend ---
Write-Host "Starting frontend..."
Start-Process powershell -ArgumentList '-NoExit','-Command',"cd `"$PSScriptRoot\frontend`"; npm start"

Write-Host "ClubHub launched. Press Enter in this window to exit."
Read-Host
