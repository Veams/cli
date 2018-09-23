[//]: # ({{#wrapWith "content-section"}})

[//]: #     ({{#wrapWith "grid-row"}})
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-8"}})

## Usage 

The CLI has a some commands you can execute. To see all commands open up the terminal and type in: 

``` bash 
veams help
```

With that you can find help instructions how to use @veams/cli. 

But we always want to provide a better explanation. Here we go:


## Commands

`VEAMS` contains some major commands. These are: 

|Command     | Shortcut | Description |
|------------|----------|-------------------------------------------------------|
|generate    | -g | Add a component or custom blueprint to your project (@see Command: generate) |
|help    | -h | Show the help. |
|install | -i | Install extensions (@see Command: install). |
|new     | -n | Create something new (@see Command: new) |
|update  | -u | Update veams-cli and all packages |
|version | -v | Show VEAMS version |

For one command you can provide arguments (`veams command [arguments]`). 


### Command: new

The `new` command creates a complete new setup for a project. 
With that you can start to create a project from scratch.

The CLI guides you through a few questions and scaffolds a projects based on your given answers.


|Arguments | Shortcut | Description                            | Example |
|----------|----------|----------------------------------------|---------|
|project  | p | Create a new project from scratch.     | `veams new project` |

### Command: generate

The `generate` command generates a `blueprint` into your current project. 
This could be a component, container or store for a React App, a new Mock API endpoint or a `VEAMS` Component.

It is up to you how the `blueprint` can look like. [You want to know more?](https://www.veams.org/docs/blueprints/) 

|Arguments | Shortcut | Description                            | Example |
|----------|----------|----------------------------------------|---------|
|component [name] | c | Add a component to your project   | `veams generate component slider` |
|utility [name] | u | Add an utility to your project   | `veams generate utility grid-col` |
|bp [name] |  | You can also add custom blueprints   | `veams generate react-container article` |

### Command: install

With the `install` command you can integrate already existing `blueprints` into you project.  

|Arguments              | Shortcut | Description                         | Example |
|-----------------------|----------|-------------------------------------|--------|
|blueprint [path] [type]| bp | Install a blueprint based on `VEAMS`.  | `veams install blueprint C:\blueprint\slider component` |
|component [name] | c | Install a specific veams-component. | `veams install component slider (--S)` |
|utility [name] | u | Install a specific veams-utility. | `veams install utility grid (--S)` |

[//]: #         ({{/wrapWith}})
[//]: #     ({{/wrapWith}})
[//]: # ({{/wrapWith}})