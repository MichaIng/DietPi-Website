<html>
	<h1 align="center">
		<img src="https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/images/dietpi-logo_180x180.png" alt="DietPi Logo">
	</h1>
	<p align="center">
		<b>Lightweight justice for your single-board computer!</b>
		<br><br>
		optimised • simplified • for everyone
		<br><br>
		<a href="https://dietpi.com/">Website</a> • <a href="https://dietpi.com/docs/">Documentation</a> • <a href="https://dietpi.com/#download">View all supported platforms</a> • <a href="https://dietpi.com/phpbb">Forums</a>
	</p>
	<hr>
	<p align="center">
		<strong>Ready to run</strong> optimised software choices with <a href="https://dietpi.com/dietpi-software.html"><strong>dietpi-software</strong></a>
		<br>Feature-rich configuration tool for your device with <strong>dietpi-config</strong>.
	</p>
	<hr>
</html>

## Introduction

This is the official repository for hosting collaborative development of the official DietPi OS home page <https://dietpi.com/>, including **DietPi-Software** overview page <https://dietpi.com/dietpi-software.html>.

[![CodeFactor](https://www.codefactor.io/repository/github/michaing/dietpi-website/badge)](https://www.codefactor.io/repository/github/michaing/dietpi-website)

## Deploy instructions
Deploy to `/tmp/DietPi-Website-master` (no input argument):
```
bash -c "$(curl -sSfL https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash)"
```
Deploy to `/var/www` (target path as input argument $1):
```
bash -c "$(curl -sSfL https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash)" bash '/var/www'
```

## Contributing

There are many ways you could contribute to DietPi project. You could work on the DietPi project, website design, extend the documentation, or just run tests. To see the full list of possibilities, please check first the [Contribution](https://dietpi.com/contribute.html) page.

If you have experience with GitHub, you could either look for existent issue to start with or report a new one. Website code updates should be done directly on GitHub, using the development branch: **[dev](https://github.com/MichaIng/DietPi-Website/tree/dev)**, creating a Pull Request (PR).

If you need help:
- Send an email: micha@dietpi.com
- Contribute page: <https://dietpi.com/contribute.html>
- Read the documentation: <https://dietpi.com/docs>
- Join our forums: <https://dietpi.com/phpbb/>
- GitHub: <https://github.com/MichaIng/DietPi-Website>

## License

<a rel="cc:attributionURL" property="dct:title" href="https://dietpi.com/">DietPi-Website</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://dietpi.com/">DietPi</a> is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License - <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.

<a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/"><img src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>

- Original website theme: [Pluton](https://www.graphberry.com/item/pluton-single-page-bootstrap-html-template) by [Graphberry](https://www.graphberry.com/)
- Initial content author and webmaster until 2019: [Daniel Knight (Fourdee)](https://github.com/Fourdee)

## 3rd party resources

- [jQuery](https://github.com/jquery/jquery) v3.5.1
- [Bootstrap](https://github.com/twbs/bootstrap) v4.6.0
- [Mixitup](https://github.com/patrickkunka/mixitup) v3.3.1
- [jquery.cslider](https://github.com/Le-Stagiaire/jquery.cslider) with a slight modification to allow wrapping slides into a container element
- [Font Awesome Free](https://fontawesome.com/) v5.15.1 individual glyphs: fa-download, fa-book and fa-external-link-alt
- [minify](https://github.com/tdewolff/minify) to minify HTML and CSS files
- [JavaScript Minifier](https://javascript-minifier.com/api) to minify JavaScript files
