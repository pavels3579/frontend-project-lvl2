# README

[![Maintainability](https://api.codeclimate.com/v1/badges/0e0f9af228d6414e51af/maintainability)](https://codeclimate.com/github/pavels3579/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/0e0f9af228d6414e51af/test_coverage)](https://codeclimate.com/github/pavels3579/frontend-project-lvl2/test_coverage)
![CI](https://github.com/pavels3579/frontend-project-lvl2/workflows/CI/badge.svg)


Second Hexlet's JavaScrpt project

# Difference generator

## Setup

```sh
$ make install
$ make publish
sudo npm link
```

<a href="https://asciinema.org/a/JHA7bWRpsO2ji5u1m58UVphL5" target="_blank"><img src="https://asciinema.org/a/JHA7bWRpsO2ji5u1m58UVphL5.svg" /></a>

## Comparing simple files

JSON

```sh
gendiff ./__fixtures__/before2.json ./__fixtures__/after2.json
```


INI

```sh
gendiff ./__fixtures__/before.ini ./__fixtures__/after.ini
```



YML

```sh
gendiff ./__fixtures__/before.yml ./__fixtures__/after.yml
```


