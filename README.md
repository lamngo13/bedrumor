# deployment notes

for local development: in index.html -> href="/bedrumor/"

run the following command inside angapp:

I think gh readme is displaying this weird so I try inside quotes:

"ng deploy --base-href='//bedrumor\' --repo=https://github.com/lamngo13/bedrumor.git"
tldr is that there are two normal slashes before bedrumor and a single backslash after (no spaces) idk why gh readme isn't rendering lmao


ng deploy --base-href='//bedrumor\' --repo=https://github.com/lamngo13/bedrumor.git

ALSO

locally, assets (aka images) will have a ../../ preceding their filepath, but that will not be the case for deployment

local: ../../assets/img/logopt2.png

deployment: assets/img/logopt2.png


Notes:

DISPLAY BAR DOESNT SHOW UP UNTIL HOVERED (ON SAFARI*)


-------------

main is the branch for deployment


dev is the optimal branch for tracking - but not w the tweaks for deployment

-------------


