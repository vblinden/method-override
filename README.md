# method_override

Let you use HTTP verbs such as DELETE or PUT in HTML forms.

## Example

```ts [asd.ts]
import { methodOverrideMiddleware } from 'https://deno.land/x/method_override/mod.ts'

export const handler = [
  methodOverrideMiddleware,

  // Other middleware...
];
```

You can now override the method in your HTML form.

```html
<form action="" method="post">
  <input type="hidden" name="_method" value="DELETE">
</form>
```
