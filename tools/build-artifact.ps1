# Bundles app/ into a single self-contained page (dist/decision-room.html) for publishing as a claude.ai artifact.
# The artifact host adds its own <html>/<head>/<body> skeleton, so the bundle contains page content only.
$root = Split-Path -Parent $PSScriptRoot
$app = Join-Path $root 'app'
$dist = Join-Path $root 'dist'
New-Item -ItemType Directory -Force $dist | Out-Null
$read = { param($n) [IO.File]::ReadAllText((Join-Path $app $n)) }
$out = @"
<title>Home Buying Decision Room</title>
<meta name="description" content="A research and decision room for first-time homebuyers in Delhi NCR. All property data is simulated.">
<style>
$(& $read 'styles.css')
</style>
<div class="stage">
  <div class="device"><div class="phone" id="phone"></div></div>
  <aside class="rail" id="rail" aria-label="Walkthrough notes"></aside>
</div>
<script>
$(& $read 'data.js')
</script>
<script>
$(& $read 'engine.js')
</script>
<script>
$(& $read 'app.js')
</script>
"@
[IO.File]::WriteAllText((Join-Path $dist 'decision-room.html'), $out, (New-Object Text.UTF8Encoding $false))
Write-Output "Built $(Join-Path $dist 'decision-room.html')"
