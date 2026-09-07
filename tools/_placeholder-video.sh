#!/usr/bin/env bash
# Slow Ken-Burns pans over the generated stills -> small H.264 mp4s.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FF="$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())')"

pan () {  # $1 still  $2 out  $3 seconds  $4 WxH
  local W H; W="${4%x*}"; H="${4#*x}"
  "$FF" -y -loglevel error -loop 1 -i "$ROOT/$1" \
    -vf "scale=$((W*2)):-2,zoompan=z='min(zoom+0.00045,1.30)':d=$(( $3 * 25 )):x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=$4:fps=25,format=yuv420p" \
    -t "$3" -c:v libx264 -preset veryfast -crf 30 -movflags +faststart -an "$ROOT/$2"
  printf '  video  %s  (%s)\n' "$2" "$(du -h "$ROOT/$2" | cut -f1)"
}

pan assets/media/hero-bg.jpg                        assets/media/hero.mp4                12 1280x720
pan "collaterals/Sanvi/cover.jpg"                   "collaterals/Sanvi/Sanvi Video/Sanvi Aero Gardens _ 1, 2 & 3 BHK Luxury Apartments Near Bengaluru Airport.mp4" 16 1280x720
pan "collaterals/Hummingvalley/cover.jpg"           "collaterals/Hummingvalley/Video/New AV Video.mp4" 14 1280x720
pan "collaterals/Hummingvalley/Master Plan/Master Plan THV.png" "collaterals/Hummingvalley/Video/Triton Humming Valley Bangalore _ Luxury Villas Near Nandi Hills.mp4" 14 1280x720
