# Todo

- pages
    - currently playing on /music
- socials
- breadcrum title
- about me section
- contact form

```
docker buildx build --platform linux/arm64 -t devla/devla.dev --load .
docker save -o image_arm64.tar devla/devla.dev
```