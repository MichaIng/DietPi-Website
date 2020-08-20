#!/bin/bash
{
# Optional target directory input
TARGET_DIR=$1

# Load DietPi-Globals
. /boot/dietpi/func/dietpi-globals

# Main
G_EXEC cd /tmp
G_EXEC curl -sSfLO https://github.com/MichaIng/DietPi-Website/archive/master.tar.gz
G_EXEC tar xf master.tar.gz
G_EXEC_NOHALT=1 G_EXEC rm master.tar.gz
G_EXEC cd DietPi-Website-master
G_EXEC_NOHALT=1 G_EXEC rm README.md LICENSE deploy.bash

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
G_EXEC curl -sSfLO https://use.fontawesome.com/releases/v5.14.0/fontawesome-free-5.14.0-web.zip
G_EXEC unzip fontawesome-free-5.14.0-web.zip
G_EXEC rm fontawesome-free-5.14.0-web.zip
G_EXEC mkdir -p fonts
G_EXEC mv fontawesome-free-5.14.0-web/webfonts/fa-solid-900.woff{,2} fonts/
G_EXEC_NOHALT=1 G_EXEC rm -R fontawesome-free-5.14.0-web
# - Roboto
G_EXEC cd fonts
G_EXEC curl -sSfLO https://raw.githubusercontent.com/neverpanic/google-font-download/master/google-font-download
G_EXEC chmod +x google-font-download
G_EXEC_OUTPUT=1 G_EXEC ./google-font-download -l 'latin,latin-ext' -o roboto.css 'Roboto:'{300,400,700} -f woff2,woff
G_EXEC_NOHALT=1 G_EXEC rm google-font-download roboto.css
G_EXEC cd ..

# Minify
# - Install/update
G_EXEC curl -sSfL "$(curl -sSfL https://api.github.com/repos/tdewolff/minify/releases/latest | mawk -F\" '/\"browser_download_url\".*linux_amd64\.tar\.gz\"$/{print $4}')" -o minify.tar.gz
G_EXEC tar xf minify.tar.gz
G_EXEC_NOHALT=1 G_EXEC rm minify.tar.gz README.md LICENSE
G_EXEC mkdir -p /usr/local/share/bash-completion/completions
G_EXEC mv bash_completion /usr/local/share/bash-completion/completions/minify
G_EXEC mkdir -p /usr/local/bin
G_EXEC mv minify /usr/local/bin/
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
	G_EXEC minify -o "${i%.css}.min.css" "$i"
	G_EXEC_NOHALT=1 G_EXEC rm "$i"
done
# - Minify HTML: Override original file afterwards
for i in ./*.html
do
	G_EXEC minify -o "${i%.html}.min.html" "$i"
	G_EXEC mv "${i%.html}.min.html" "$i"
done

# Move/Merge into target directory
if [[ $TARGET_DIR ]]; then
	if [[ -d $TARGET_DIR ]]; then
		G_EXEC cp -R . "${TARGET_DIR%/}/"
	else
		cd ..
		G_EXEC mv DietPi-Website-master "$TARGET_DIR"
	fi
fi
}
