@echo off
title ClubHub Launcher
echo Launching ClubHub...

:: Run the PowerShell launcher script
powershell -ExecutionPolicy RemoteSigned -NoExit -File "%~dp0run_clubhub.ps1"
