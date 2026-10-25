#!/bin/bash
# rebuild local harness from the build output
set -e
: "${S:?}"
cd $S/work && node snapshot.js && node assemble.js
cp $S/build/home.css $S/work/home.js $S/harness/
sed -e 's#%%A%%#http://127.0.0.1:8766#g' -e 's#%%V%%#'$(date +%s)'#g' $S/build/home.fragment.html > $S/harness/frag.html
python3 -I - <<PY
S="$S"
f=open(S+'/harness/frag.html').read()
open(S+'/harness/index.html','w').write('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>harness</title><style>body{margin:0}</style></head><body>\n'+f+'\n</body></html>')
PY
