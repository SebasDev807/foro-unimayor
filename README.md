<p align="center">
	<img src="./public/imagenes/FUM-logo.png"  alt="FUM logo" title="calculator icon" width="125" height="auto" />
</p>

<p align="center">
	 Foro universitario colegio mayor del cauca.
</p>

## Table of contents

- [Table of Contents](#table-of-contents)
- [How to Contribute](#how-to-contribute)
  - [Contributor Behavior](#contributor-behavior)
  - [Setup Development Environment](#setup-development-environment)
  - [Pull Requests](#pull-requests)
  - [License](#license)

## How to Contribute

### Contributor Behavior

Be kind to one another. We're striving to make [Conventional Commits](https://www.conventionalcommits.org/) an inclusive
environment that's great for first time open-source contributors.

Conventional Commits use the [GitHub flow](https://guides.github.com/introduction/flow/) as main versioning workflow

### Setup Development Environment

1. Fork the repository.
2. Clone your forked repository to your local machine.

```bash
# HTTPS
git clone https://github.com/<your_profile_name>/foro-unimayor.git

# or SSH
git clone git@github.com:<your_profile_name>/foro-unimayor.git
```

3. Install the dependencies.

```bash
  # using npm
  npm install
```

4. setup the environment variables on .env file.

   > **_NOTE:_** you can copy the .env.example file and rename itto .env. Don't forget to fill the variables with the correct values.

5. Run the application.

```bash
  # using npm
  npm run dev
```

### Pull Requests

1. Create a new branch for each feature

```bash
# create a new branch and switch to it
git checkout -b <branch-name>
```

2. Make your changes and commit them.

```bash
# add the changes
git add .
# commit the changes
git commit -m "your commit message"
```

3. Merge the changes from to vite branch.

```bash
# switch to main branch
git switch  vite
# merge the changes from the feature branch
git merge <branch-name>
```

4. Send a pull request from each feature branch to **vite** branch.

```bash
# push the changes to the remote repository
git push origin vite
```

### License

[License](./LICENSE)
