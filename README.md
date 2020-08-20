# DietPi Website
This is the official repository for hosting collaborative development of the official DietPi OS home page https://dietpi.com/ as well as the DietPi-Software overview page https://dietpi.com/dietpi-software.html.

## License
<p xmlns:dct="http://purl.org/dc/terms/" xmlns:cc="http://creativecommons.org/ns#" class="license-text"><a rel="cc:attributionURL" property="dct:title" href="https://dietpi.com/">DietPi-Website</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://dietpi.com/">DietPi</a> is licensed under <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg"></a></p>

- Original website theme: [Pluton](https://www.graphberry.com/item/pluton-single-page-bootstrap-html-template) by [Graphberry](https://www.graphberry.com/)
- Initial content author and webmaster until 2019: [Daniel Knight (Fourdee)](https://github.com/Fourdee)

## 3rd party resources
- [jQuery](https://github.com/jquery/jquery) v3.5.1
- [Bootstrap](https://github.com/twbs/bootstrap) v4.5.2
- [Mixitup](https://github.com/patrickkunka/mixitup) v3.3.1
- [jquery.cslider](https://github.com/Le-Stagiaire/jquery.cslider) with a slight modification to allow wrapping slides into a container element
- [Font Awesome Free](https://fontawesome.com/) v5.14.0
- [Roboto](https://fonts.google.com/specimen/Roboto)
- [google-font-download](https://github.com/neverpanic/google-font-download) for Roboto download
- [minify](https://github.com/tdewolff/minify) to minify all HTML and CSS files
- [JavaScript Minifier](https://javascript-minifier.com/api) to minify JavaScript files

## Deploy instructions
Deploy to `/tmp/DietPi-Website-master` (no input argument):
```
bash -c "$(curl -sSfL https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash)"
```
Deploy to `/var/www` (target path as input argument):
```
curl -sSfLO https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash
chmod +x deploy.bash
./deploy.bash /var/www
```
