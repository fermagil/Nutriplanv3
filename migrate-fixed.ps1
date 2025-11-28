Write-Host "ðŸ”§ INICIANDO MIGRACIÃ“N DE FUNCIONES..." -ForegroundColor Green

# Paso 1: Reemplazar funciones bÃ¡sicas de UI
Write-Host "Paso 1: Reemplazando funciones de UI..." -ForegroundColor Yellow

$scriptPath = "assets\js\script.js"
$content = Get-Content $scriptPath -Raw

# Reemplazar displayError
$content = $content -replace 'function displayError\(container, message\) \{[\s\S]*?^\}','// displayError ELIMINADO - usar DOMUtils.displayError'

# Reemplazar displayInfo  
$content = $content -replace 'function displayInfo\(container, message\) \{[\s\S]*?^\}','// displayInfo ELIMINADO - usar DOMUtils.displayInfo'

# Reemplazar clearContainer
$content = $content -replace 'function clearContainer\(container\) \{[\s\S]*?^\}','// clearContainer ELIMINADO - usar DOMUtils.clearContainer'

# Guardar cambios
$content | Set-Content $scriptPath -Encoding UTF8
Write-Host "âœ… Funciones UI reemplazadas" -ForegroundColor Green

# Paso 2: Reemplazar llamadas a funciones
Write-Host "Paso 2: Reemplazando llamadas a funciones..." -ForegroundColor Yellow

$content = Get-Content $scriptPath -Raw

# Reemplazar todas las llamadas displayError
$content = $content -replace 'displayError\(','DOMUtils.displayError('

# Reemplazar todas las llamadas displayInfo
$content = $content -replace 'displayInfo\(','DOMUtils.displayInfo('

# Reemplazar todas las llamadas clearContainer
$content = $content -replace 'clearContainer\(','DOMUtils.clearContainer('

# Guardar cambios
$content | Set-Content $scriptPath -Encoding UTF8
Write-Host "âœ… Llamadas a funciones reemplazadas" -ForegroundColor Green

Write-Host "ðŸŽ‰ MIGRACIÃ“N COMPLETADA!" -ForegroundColor Green
Write-Host "Revisa el archivo y prueba la aplicaciÃ³n." -ForegroundColor Cyan
