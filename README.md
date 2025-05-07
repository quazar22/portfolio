# Portfolio

## Introduction
Welcome to my portfolio website! It was created awhile ago using create-react-app, so it is a little out of date. I justify this by stating that maintaining old software is just apart of the job, right? Realistically I will update it to use NextJS/Tailwind at some point, as I've grown a bit more familiar with that combo. 

My goal with this site is to elaborate on my experience and side projects beyond what could reasonably fit on my resume/CV. I also wanted to add a small blog to detail some other things that I work on that might not fit into the site as a project. It covers some basic information about me, my work experiences, a few personal projects (mostly aside from work that I can share), it includes a contact me section, and finally the blog.

## Stack
- ReactJS for the frontend
- Sanity CMS for storing project/blog data
- Appwrite DB for storing contact me info (I use it for other things too, not just this)
- ExpressJS endpoint for processing contact messages
- Github Actions to automatically deploy new versions from main branch

## How to run dev
1. In the terminal, run `npm i` to install the necessary packages
2. Start the frontend with `npm run start`
3. To debug, use the vscode launch configuration "Launch Chrome against localhost"

## Deploying
Docker is used to run the app in a production environment. Navigate to the portfolio directory and type `docker compose up -d` to start the app.

## Sanity CMS


Sanity CMS is used to update the project and blog entries. The CMS project as well as the schemas for projects and blogs are included with it. This will run, but requires authentication to modify entries against my database. To change the sanity projectId for use in your own portfolio, you'll need to update the project id in:

```
portfolio/portfoliocms/sanity.cli.ts
portfolio/portfoliocms/sanity.config.ts
portfolio/src/Components/Projects.tsx
portfolio/src/utils/url.ts
```

### Sanity Installation
Sanity is a separate sub-package included in the portfolio. I thought it beneficial to include it like this as the two are closely tied together and I often use them together.

1. Run `npm i` to install the node packages
2. Run `npm run dev` to run sanity in dev mode
3. Navigate to `localhost:3333` to access the Sanity UI