PROJECT PHOTOGRAPHY
===================
These files are already in place — upload the folder as it is and the site
displays them. Nothing else needs changing.

Filenames are fixed. To swap a photograph, save the new one over the old file
using exactly the same name; to change which photograph goes where, or its
caption, edit the DATA object at the top of ../js/site.js.

  hero.jpg          2400x1340  the aerial down the internal street at sunset
                               sits behind the headline, full bleed

  band.jpg          1376x768   the rows in monsoon cloud
                               full-width strip after "The land"

  villa-3bhk.jpg     600x800   one elevation per villa type, portrait 3:4
  villa-4bhk.jpg    1200x1600
  villa-5bhk.jpg    1200x1600

  choreo-1.jpg      1500x1000  the four-frame scroll sequence in "Inside", 3:2
  choreo-2.jpg      1500x1000
  choreo-3.jpg      1500x1000
  choreo-4.jpg      1792x1195  <- this one opens to fill the screen

  gallery-1.jpg     1400x1050  the grid below that sequence
  gallery-2.jpg     1400x1050
  gallery-3.jpg     1400x1050
  gallery-4.jpg     1280x596   taken on site, June 2026
  gallery-5.jpg     1280x596   taken on site, June 2026
  gallery-6.jpg      480x1040  taken on site, June 2026

  cover-1.jpg       1000x750   the seven cards of the coverflow above the
  cover-2.jpg                  masterplan, 4:3. The centre card is the one
  cover-3.jpg                  the visitor reads, so put the strongest
  cover-4.jpg                  photographs at 1, 4 and 7 — those are the
  cover-5.jpg                  ones that land in the middle first.
  cover-6.jpg
  cover-7.jpg

SIZE MATTERS MORE THAN YOU THINK
A photograph is never drawn larger than the frame it sits in, so anything
past twice that frame's width is bytes a visitor pays for and never sees.
The right widths are:

  hero.jpg                    2400px   (full screen)
  band.jpg                    2000px   (full screen)
  villa-*.jpg                 1200px   (drawn at ~600px)
  choreo-*.jpg                1500px   (drawn at ~700px)
  gallery-*.jpg               1400px   (drawn at ~520px)
  cover-*.jpg                 1000px   (drawn at ~340px)

Keep each file under about 350 KB. Export at JPEG quality 80 — above that
the file doubles and nobody can see the difference. A 2.5 MB photograph is
roughly eight seconds of a 4G connection in the hills, on its own.
Everything is cropped to fill its frame, so the subject only needs to be
roughly centred. Any file that is missing falls back to artwork drawn in
code — nothing breaks, you just lose that photograph.
