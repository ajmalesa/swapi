# swapi

## Requirements:

<a href="https://docs.docker.com/get-docker/">Docker</a>

## Build and preview locally 

On your local machine, clone this repo and cd into repo directory:

```bash
git clone --recursive https://github.com/ajmalesa/swapi
cd swapi
```

Then build container:

```bash
docker build -t swapi:1.1 .
```

Then run container, mapping container's port 80 to host's port 80: 

```bash
docker run -it -d -p 80:80 swapi:1.1
```

Open browser and go to <a href="http://localhost:80">localhost</a>

## View live version

<a target="_blank" href="https://swapi.ajmalesa.com">Live</a>
