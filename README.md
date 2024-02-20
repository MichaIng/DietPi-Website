<h1 align="center"><img src="https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/images/dietpi-logo_180x180.png" alt="DietPi logo" width="180" height="180" loading="lazy"></h1>
<p align="center">
	<b>Lightweight justice for your single-board computer!</b>
	<br><br>
	optimised • simplified • for everyone
	<br><br>
	<a href="https://dietpi.com/" target="_blank" rel="noopener">Website</a> • <a href="https://dietpi.com/#download" target="_blank" rel="noopener">Downloads</a> • <a href="https://dietpi.com/docs/" target="_blank" rel="noopener">Documentation</a> • <a href="https://dietpi.com/forum/" target="_blank" rel="noopener">Forum</a> • <a href="https://dietpi.com/blog/" target="_blank" rel="noopener">Blog</a>
</p>
<hr>
<p align="center">
	<strong>Ready to run</strong> optimised software choices with <a href="https://dietpi.com/dietpi-software.html" target="_blank" rel="noopener"><strong>dietpi-software</strong></a>
	<br>Feature-rich configuration tool for your device with <strong>dietpi-config</strong>.
</p>
<hr>

## Introduction

This is the official repository for hosting collaborative development of the official DietPi OS home page <https://dietpi.com/>, including **DietPi-Software** overview page <https://dietpi.com/dietpi-software.html>.

[![CodeFactor](https://www.codefactor.io/repository/github/michaing/dietpi-website/badge)](https://www.codefactor.io/repository/github/michaing/dietpi-website)

## Deploy instructions

Deploy to `/tmp/DietPi-Website-master` (no input argument):

```sh
bash -c "$(curl -sSf 'https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash')"
```

Deploy to `/var/www` (target path as input argument $1):

```sh
bash -c "$(curl -sSf 'https://raw.githubusercontent.com/MichaIng/DietPi-Website/master/deploy.bash')" bash /var/www
```

Arguments `$2` and `$3` can be optionally used to define the GitHub branch and owner to pull the website from.

## View local changes

There are two options to view your local changes:

1. Using a webserver which serves the local website
2. Using a GUI based system to view the HTML files in a browser

### Using a webserver

As a prerequisite you need a running webserver on your system. Otherwise you can install one via `dietpi-software`, for example Apache:

```sh
sudo dietpi-software install 83
```

When you deployed the website to `/var/www` as explained above, you can view it from any browser in your LAN via:

```
http://<your.IP>/
```

### Using a GUI based system

In case you have a GUI based system, you can view the HTML files directly in your browser:

- Deploy the DietPi website to `/tmp/DietPi-Website-master` or any other local directory as explained above.
- Display it in your browser by opening `/tmp/DietPi-Website-master/index.html` via drag & drop or -> **File** -> **Open**.
- The address line in your browser then typically shows `file:///tmp/DietPi-Website-master/index.html`.

## Contributing

There are many ways you could contribute to DietPi project. You could work on the DietPi project, website design, extend the documentation, or just run tests.

If you have experience with GitHub, you could either look for existent issue to start with or report a new one. Website code updates should be done directly on GitHub, using the development branch: **[dev](https://github.com/MichaIng/DietPi-Website/tree/dev)**, creating a pull request (PR).

If you need help:

- Send an email: <micha@dietpi.com>
- Read the documentation: <https://dietpi.com/docs/>
- Join our forum: <https://dietpi.com/forum/>
- GitHub: <https://github.com/MichaIng/DietPi-Website>

To see the full list of possibilities, please check our [contribution](https://dietpi.com/contribute.html) page.

## License

<a rel="cc:attributionURL" property="dct:title" href="https://dietpi.com/" target="_blank" rel="noopener">DietPi-Website</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://dietpi.com/" target="_blank" rel="noopener">DietPi</a> is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License - <a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>.

<a rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener"><img src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"></a>

- Original website theme: [Pluton](https://www.graphberry.com/item/pluton-single-page-bootstrap-html-template) by [Graphberry](https://www.graphberry.com/)
- Initial content author and webmaster until 2019: [Daniel Knight (Fourdee)](https://github.com/Fourdee)
- This website shows logos of 3rd party software and providers which are excluded from the above license. They may only be used related to their product, for details, check individual trademark rules and licenses.

## 3rd party resources

- [Bootstrap](https://github.com/twbs/bootstrap) v5.3.3
- [Mixitup](https://github.com/patrickkunka/mixitup) v3.3.1 modified for our needs
- [jquery.cslider](https://github.com/Le-Stagiaire/jquery.cslider) modified for our needs and converted to vanilla JavaScript
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome) v5.15.4 individual glyphs: [fa-download](https://github.com/FortAwesome/Font-Awesome/blob/5.x/svgs/solid/download.svg), [fa-book](https://github.com/FortAwesome/Font-Awesome/blob/5.x/svgs/solid/book.svg) and [fa-external-link-alt](https://github.com/FortAwesome/Font-Awesome/blob/5.x/svgs/solid/external-link-alt.svg)
- [minify](https://github.com/tdewolff/minify) to minify HTML, CSS and JavaScript files
