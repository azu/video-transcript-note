# Framework

## Core System(public)

- Context
- Dispatcher
- Store
- UseCase

## Sub System

- StoreGroup
- UseCaseExecutor

## Dispatcher

- `onDispatch(payload)`
- `dispatch(payload)`

`payload` object must have `type` property.

```js
{
    type: "type"
}
```

is a minimal payload object.

```js
{
    type: "show",
    value: "value",
}
```

payload object also have other properties maybe.