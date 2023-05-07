# well-known-fursona

[fursona.gmem.ca](https://fursona.gmem.ca)

[blog post](https://blog.gabrielsimmer.com/posts/well-known-fursona/)

small sveltekit+tailwind application for loading and displaying a [fursona schema](https://github.com/theHedgehog0/fursona-schema)
from .well-known/fursona.

deployed to vercel to use their edge functions

## local development

local development uses the vercel cli to ensure the function can be reached locally.

```shell
$ npm i
$ npm run dev-vercel
```

## mirroring to github

Development of this primarily takes place over on [sourcehut](https://git.sr.ht/~gmem/well-known-fursona). Pull requests and issues are welcome to GitHub though, and your patches will be commited
to sourcehut with proper attribution. The repository is mirrored to GitHub on push to allow for easier, non [git send email].(https://git-send-email.io/) contributions. All testing and deployment goes through sourcehut.
