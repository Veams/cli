[//]: # ({{#wrapWith "content-section"}})

[//]: #     ({{#wrapWith "grid-row"}})
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-8"}})

One of the main features in `@veams/cli` is the scaffolding part of blueprints.

[//]: #         ({{/wrapWith}})
[//]: #     ({{/wrapWith}})

[//]: # ({{/wrapWith}})
[//]: # ({{#wrapWith "content-section"}})

[//]: #     ({{#wrapWith "grid-row"}})
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})

## Usage

You can easily generate a new component into your project by doing: 

``` bash
veams generate component my-component-name 
```

or in a shorter syntax:

``` bash 
veams -g c my-component-name
```

The component will be saved in `shared` folder. If you want to save it in another directory you only need to provide the full path: 

``` bash 
veams -g c app/core/components/my-component-name
```

[//]: #         ({{/wrapWith}})
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-6"}})
[//]: #             ({{> video }})
[//]: #         ({{/wrapWith}})
[//]: #     ({{/wrapWith}})

[//]: # ({{/wrapWith}})
[//]: # ({{#wrapWith "content-section"}})

[//]: #     ({{#wrapWith "grid-row"}})
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-mobile-l-8"}})

### Main features in a nutshell

- prompts can be easily extended by the developer
- developers can write their own templates
- installation of provided blueprint templates possible
- custom types? No problem!

Means, to scaffold blueprints is not limited to `Veams`.

You can use it in React, Angular, Vue, Veams or even non javascript projects.

[//]: #         ({{/wrapWith}})
[//]: #     ({{/wrapWith}})

[//]: # ({{/wrapWith}})