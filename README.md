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

OKAY IT WORKS BUT MANUALLY CHANGE BASE HREF TO BE / ON GH PAGES BRANCH

Make code work normally

Set base href to / in index.html

Run the command ng deploy --base-href=’/’

(this creates the gh-pages branch as specified)

(it seems that the index.html gets messed up somewhere along that process)

CLONE (however you want) gh-pages branch EXACTLY and manually change only the base href to be / (make sure you remember the cloned branch name with this change)

Originally it was base href="C:/Program Files/Git/" but now it should be base href="/"

Go to github website settings > pages select the cloned-modified branch (root directory) and hit save (make sure to put in bedrumor.com in the custom domain)

I did something weird with the CNAME record I’m not sure what (in namecheap)

PUT THE CNAME record somewhere in the dist folder or just around???

Check to see assets work



