# DietPi Website
This is the official repository for hosting collaborative development of the official DietPi OS home page https://dietpi.com/ as well as the DietPi-Software overview page https://dietpi.com/dietpi-software.html.

[![CodeFactor](https://www.codefactor.io/repository/github/michaing/dietpi-website/badge)](https://www.codefactor.io/repository/github/michaing/dietpi-website)

## License
<a rel="cc:attributionURL" property="dct:title" href="https://dietpi.com/">DietPi-Website</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://dietpi.com/">DietPi</a> is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License - <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.

<a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/"><img src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>

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
- [minify](https://github.com/tdewolff/minify) to minify HTML and CSS files
- [JavaScript Minifier](https://javascript-minifier.com/api) to minify JavaScript files

## Deploy instructions
Deploy to `/tmp/DietPi-Website-master` (no input argument):
```
bash -c "$(curl -sSfL https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash)"
```
Deploy to `/var/www` (target path as input argument $1):
```
bash -c "$(curl -sSfL https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash)" bash '/var/www'
```
