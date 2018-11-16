[//]: # ({{#wrapWith "content-section"}})

[//]: # ({{#wrapWith "grid-row"}})
[//]: #     ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})


**`VEAMS` provides one of the most flexible and efficient generator to build Frontend Web Apps, HTML5 web interfaces and Prototypes.**

1. You can use Grunt or Webpack as task runner/bundler/loader.
1. You can create a static site with Mangony.
1. You can create a React App with Redux, Redux-Observables, Router and more.
1. You can build a technical HTML documentation.
1. You can add Bootstrap, Foundation, Bourbon and Lost to your project.
1. You can add the complete `VEAMS` stack to your project.
1. You can enable hinting and linting.
1. You have a mock API written in NodeJS in place.

[//]: #     ({{/wrapWith}})
[//]: #     ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})
[//]: #         ({{> video }})
[//]: #     ({{/wrapWith}})
[//]: # ({{/wrapWith}})

[//]: # ({{/wrapWith}})
[//]: # ({{#wrapWith "content-section"}})

[//]: # ({{#wrapWith "grid-row"}})
[//]: #     ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})

## Usage

To generate a new project just open your console, go to a specific project folder and type the following:

``` bash
veams new project
```

That's it.

**Just answer the questions and generate your individual project.**

All dependencies and task files will be automagically downloaded and configured. You can start your project in your console via 

``` bash
npm start
```
[//]: #     ({{/wrapWith}})
[//]: #     ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})


### Folder structure

That's what the folder structure should look like after scaffolding a new project ...

``` bash
 ├── app
 │   ├── ...
 ├── configs
 │   ├── ...
 ├── environments
 │   ├── ...
 └── src
     ├── app
     │   ├── assets
     │   │   ├── ...
     │   ├── core
     │   │   ├── ...
     │   ├── pages
     │   │   ├── ...
     │   └── shared
     │       └── ...
     └── server
```

[//]: #     ({{/wrapWith}})
[//]: # ({{/wrapWith}})

[//]: # ({{/wrapWith}})

[//]: # ({{#wrapWith "content-section"}})

[//]: # ({{#wrapWith "grid-row"}})
[//]: #     ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})

## Configuration

An important file is the `veams-cli.json`.

This file contains the whole `VEAMS` configuration for your project and can be modified to your needs. 

1. You can reference to custom or predefined blueprints. 
1. You can modify your entry files which gets updated when you generate or install a component.
1. You can define custom paths to specific sections in your project to simplify the scaffold process. 
1. You can update the ports. 
1. You can provide the start URL. 

[//]: #     ({{/wrapWith}})
[//]: #     ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})


``` json
{
    "projectType": "static-page-app",
    "blueprints": {
        "api": {
            "skipImports": true,
            "path": "node_modules/@veams/bp-mock-api"
        }
    },
    "config": {
        "src": "configs/tasks/_grunt/*.js"
    },
    "entries": {
        "style": "src/app/app.scss",
        "script": "src/app/app.js"
    },
    "insertpoints": [
        "src/app/app.js",
        "src/app/core/layouts",
        "src/app/pages",
        "src/app/features",
        "src/app/app.events.js"
    ],
    "paths": {
        "api": "src/server/api",
        "app": "src/app",
        "dest": "app",
        "assets": "src/app/assets",
        "env": "environments",
        "component": "src/app/shared/components",
        "config": "configs",
        "docs": "src/docs",
        "mocks": "src/server/mocks",
        "server": "src/server",
        "src": "src",
        "utility": "src/app/shared/utilities"
    },
    "ports": {
        "app": 3000,
        "server": 2999
    },
    "startPath": "home/index.html"
}
```

[//]: #     ({{/wrapWith}})
[//]: # ({{/wrapWith}})

[//]: # ({{/wrapWith}})
