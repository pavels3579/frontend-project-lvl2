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

<a href="https://asciinema.org/a/QY9A9m1tFgGnBGY1LxUt9lGCm" target="_blank"><img src="https://asciinema.org/a/QY9A9m1tFgGnBGY1LxUt9lGCm.svg" /></a>

## Comparing simple files

JSON

```sh
gendiff ./__fixtures__/before2.json ./__fixtures__/after2.json
```

<a href="https://asciinema.org/a/k2HimPBcAeWW7WUTKdGHUFr52" target="_blank"><img src="https://asciinema.org/a/k2HimPBcAeWW7WUTKdGHUFr52.svg" /></a>

INI

```sh
gendiff ./__fixtures__/before.ini ./__fixtures__/after.ini
```

<a href="https://asciinema.org/a/6fPWE5bRFefdqsFU6GoRItBdg" target="_blank"><img src="https://asciinema.org/a/6fPWE5bRFefdqsFU6GoRItBdg.svg" /></a>

YML

```sh
gendiff ./__fixtures__/before.yml ./__fixtures__/after.yml
```

<a href="https://asciinema.org/a/FJD7NDqk9i0VTvFRvvIco97XG" target="_blank"><img src="https://asciinema.org/a/FJD7NDqk9i0VTvFRvvIco97XG.svg" /></a>


## Comparing complex files

```sh
gendiff ./__fixtures__/before.json ./__fixtures__/after.json
```

<a href="https://asciinema.org/a/qenGtOIgyGiG8gRIUHy2O5k2q" target="_blank"><img src="https://asciinema.org/a/qenGtOIgyGiG8gRIUHy2O5k2q.svg" /></a>


## Comparing files with different formats

```sh
gendiff --format stylish ./__fixtures__/before.json ./__fixtures__/after.json
```

```sh
gendiff --format plain ./__fixtures__/before.json ./__fixtures__/after.json
```

```sh
gendiff --format json ./__fixtures__/before.json ./__fixtures__/after.json
```

<a href="https://asciinema.org/a/X66RZ3EJCmowWal335VF6oppx" target="_blank"><img src="https://asciinema.org/a/X66RZ3EJCmowWal335VF6oppx.svg" /></a>
