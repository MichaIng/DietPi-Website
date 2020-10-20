#!/bin/bash
{
# Inputs
# - Optional target directory
if [[ $1 == '/'* ]]
then
	TARGET_DIR=${1%/}

elif [[ $1 == '.' ]]
then
	TARGET_DIR=$PWD

elif [[ $1 ]]
then
	TARGET_DIR="$PWD/${1%/}"
else
	TARGET_DIR=
fi
# - Optional branch
if [[ $2 ]]
then
	BRANCH=$2

elif [[ $GITHUB_REF ]]
then
	BRANCH=${GITHUB_REF#refs/heads/}
else
	BRANCH='master'
fi

# Load DietPi-Globals
if [[ -f '/boot/dietpi/func/dietpi-globals' ]]
then
	. /boot/dietpi/func/dietpi-globals
else
	curl -sSfL https://raw.githubusercontent.com/MichaIng/DietPi/master/dietpi/func/dietpi-globals -o /tmp/dietpi-globals || exit 1
	. /tmp/dietpi-globals
	G_EXEC_NOHALT=1 G_EXEC rm /tmp/dietpi-globals
fi

# Main
G_EXEC cd /tmp
G_EXEC curl -sSfLO https://github.com/MichaIng/DietPi-Website/archive/$BRANCH.tar.gz
G_EXEC tar xf $BRANCH.tar.gz
G_EXEC_NOHALT=1 G_EXEC rm $BRANCH.tar.gz
G_EXEC cd DietPi-Website-$BRANCH
# Cleanup
[[ $GITHUB_ACTIONS == 1 ]] || G_EXEC_NOHALT=1 G_EXEC rm -R README.md LICENSE deploy.bash .??*

# 3rd party
G_EXEC curl -sSfL https://raw.githubusercontent.com/jquery/codeorigin.jquery.com/master/cdn/jquery-3.5.1.min.js -o js/jquery.min.js
G_EXEC curl -sSfL https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css -o css/bootstrap.min.css
G_EXEC sed -i '\|^/\*# sourceMappingURL=bootstrap.min.css.map \*/$|d' css/bootstrap.min.css # Suppress browser console warning about missing map file
G_EXEC curl -sSfL https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js -o js/bootstrap.min.js
G_EXEC sed -i '\|^//# sourceMappingURL=bootstrap.min.js.map$|d' js/bootstrap.min.js # Suppress browser console warning about missing map file
G_EXEC curl -sSfL https://raw.githubusercontent.com/patrickkunka/mixitup/61dac0554ab2b69fca3c927a173b0a000e4f6896/dist/mixitup.min.js -o js/mixitup.min.js
G_EXEC curl -sSfL https://raw.githubusercontent.com/Le-Stagiaire/jquery.cslider/4707d29f6501c2dd84a4aa33808b1efbfd0e083f/src/style.css -o css/jquery.cslider.css

# Fonts
# - Font Awesome
version='5.15.1'
G_EXEC curl -sSfLO https://use.fontawesome.com/releases/v$version/fontawesome-free-$version-web.zip
G_EXEC unzip fontawesome-free-$version-web.zip
G_EXEC rm fontawesome-free-$version-web.zip
G_EXEC mkdir -p fonts
G_EXEC mv fontawesome-free-$version-web/webfonts/fa-solid-900.woff{,2} fonts/
G_EXEC_NOHALT=1 G_EXEC rm -R fontawesome-free-$version-web
unset -v version
# - Roboto
G_EXEC cd fonts
G_EXEC curl -sSfLO https://raw.githubusercontent.com/neverpanic/google-font-download/master/google-font-download
G_EXEC chmod +x google-font-download
G_EXEC_OUTPUT=1 G_EXEC ./google-font-download -l 'latin,latin-ext' -o roboto.css 'Roboto:'{300,400,700} -f woff2,woff
G_EXEC_NOHALT=1 G_EXEC rm google-font-download roboto.css
G_EXEC cd ..

# Minify
# - Download
G_EXEC curl -sSfL "$(curl -sSfL https://api.github.com/repos/tdewolff/minify/releases/latest | mawk -F\" '/\"browser_download_url\".*linux_amd64\.tar\.gz\"$/{print $4}')" -o minify.tar.gz
G_EXEC tar xf minify.tar.gz minify
G_EXEC_NOHALT=1 G_EXEC rm minify.tar.gz
# - Minify js: Use web API since "minify" does not minify internal function and variable names.
for i in js/*.js
do
	[[ $i == *'.min.js' ]] && continue
	G_EXEC curl -X POST -sSfL --data-urlencode "input@$i" https://javascript-minifier.com/raw -o "${i%.js}.min.js"
	G_EXEC_NOHALT=1 G_EXEC rm "$i"
done
# - Minify CSS
for i in css/*.css
do
	[[ $i == *'.min.css' ]] && continue
	G_EXEC ./minify -o "${i%.css}.min.css" "$i"
	G_EXEC_NOHALT=1 G_EXEC rm "$i"
done
# - Minify HTML: Override original file afterwards
for i in ./*.html
do
	G_EXEC ./minify -o "${i%.html}.min.html" "$i"
	G_EXEC mv "${i%.html}.min.html" "$i"
done
G_EXEC_NOHALT=1 G_EXEC rm minify

# Move/Merge into target directory
if [[ $TARGET_DIR ]]
then
	if [[ -d $TARGET_DIR ]]
	then
		G_EXEC cp -R . "$TARGET_DIR/"
	else
		G_EXEC cd ..
		G_EXEC mv DietPi-Website-$BRANCH "$TARGET_DIR"
	fi
fi
}
