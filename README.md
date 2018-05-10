<p align="center"><img src="http://www.veams.org/img/svg/icons/veams-std.svg">
<br>
<br>
<a href="https://gitter.im/Sebastian-Fitzner/Veams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge"><img src="https://badges.gitter.im/Sebastian-Fitzner/Veams.svg" alt="Gitter Chat" /></a>
</p>

<p align="center">
	<strong>The command line interface for Veams.</strong>
	<br>
	<a href="http://veams.org">Visit the Veams website.</a><br>
</p>

## Documentation

Veams-cli gives you the possibility to 
- scaffold a new project
- scaffold a new component from scratch
- scaffold a custom blueprint from scratch
- install Veams Components

## Installation

Install the `cli` via: 

### NPM 

```bash
npm install -g @veams/cli
```

## Usage 

Here you can find help instructions how you can use veams-cli:

`veams command [arguments]`

|Command     | Shortcut | Description |
|------------|----------|-------------------------------------------------------|
|generate    | -g | Add a component or custom blueprint to your project (@see Command: generate) |
|help    | -h | Show the help. |
|install | -i | Install extensions (@see Command: install). |
|new     | -n | Create something new (@see Command: new) |
|update  | -u | Update veams-cli and all packages |
|version | -v | Show VEAMS version |

### Command: new

|Arguments | Shortcut | Description                            | Example |
|----------|----------|----------------------------------------|---------|
|blueprint [name] | bp | Create a new blueprint from scratch.   | `veams new blueprint accordion` |
|project  | p | Create a new project from scratch.     | `veams new project` |

### Command: generate

|Arguments | Shortcut | Description                            | Example |
|----------|----------|----------------------------------------|---------|
|component [name] | c | Add a component to your project   | `veams generate component slider` |
|utility [name] | u | Add an utility to your project   | `veams generate utility grid-col` |
|bp [name] |  | You can also add custom blueprints   | `veams generate react-container article` |

### Command: install

|Arguments              | Shortcut | Description                         | Example |
|-----------------------|----------|-------------------------------------|--------|
|blueprint [path] [type]| bp | Install a blueprint based on Veams.  | `veams install blueprint C:\blueprint\slider component` |
|component [name] | c | Install a specific veams-component. | `veams install component slider (--S)` |
|utility [name] | u | Install a specific veams-utility. | `veams install utility grid (--S)` |