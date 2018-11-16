[//]: # ({{#wrapWith "content-section"}})

[//]: #     ({{#wrapWith "grid-row"}})
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-tablet-l-8"}})

One of the main features in `@veams/cli` is the scaffolding part of so called blueprints. 
This can be a component, react container, service or anything else. 

As default and fallback `@veams/cli` is generating a component for you which is optimized for the `VEAMS` framework.
But you can customize the whole generation process to your needs. 

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
[//]: #         ({{#wrapWith "grid-col" colClasses="is-col-tablet-l-8"}})

### Main features in a nutshell

- prompts can be easily extended by the developer
- developers can write their own templates
- installation of provided blueprint templates possible
- custom types? No problem!

Means, to scaffold blueprints is not limited to ``VEAMS``.

You can use it in React, Angular, Vue, `VEAMS` or even non javascript projects.

[//]: #         ({{/wrapWith}})
[//]: #     ({{/wrapWith}})

[//]: # ({{/wrapWith}})