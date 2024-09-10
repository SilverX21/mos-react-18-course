# mosh-react-course

Learning repo for Mosh's React Course

## Creating the app

1- for this project, we will use Vite to create our application. Let's use this command:
`npm create vite@4.1.0` -> we'll use this specific version to follow along the course.
Otherwise, we can use the following command: `npm create vite@latest`

- then we will call it "react-app"
- We'll choose React and then TypeScript
- after that we, we will cd into the directory of the project: `cd react-app`
- we'll run the `npm install` command to install the dependencies
- then we will use the `npm run dev` to run the application

## Packages we are using in this project

2- For this project, we will use the following packages:

- Bootstrap (version 5.2.3) `npm i bootstrap@5.2.3`
- React (version 18.3.1)
- Vite (version 4.1.0)
- Styled Components (latest) `npm i styled-components`
- Types for Styled components (if needed) `npm i @types/styled-components`
- React Icons (version 4.7.1) `npm i react-icons@4.7.1`
- Immer (version 9.0.19) `npm i immer@9.0.19`
- React Hook Form (version 7.43) `npm i react-hook-form@7.43`
- Zod(version 3.20.6) `npm i zod@3.20.6`
- HookForm Resolvers (version 2.9.11) `npm i @hookform/resolvers@2.9.11`
- Axios (version 1.3.4) `npm i axios@1.3.4`

## Building application

To build the application, we need to run this command in the project folder: `npm run build`

There's a warning that could appear in the console:
(!) Some chunks are larger than 500 kBs after minification. Consider:

- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.

This happens due to the bundle size that could be too big.

After the build, there will appear a new folder with the name "dist", that is short for "distributable". This folder has min files, and compiled javascript code (the browsers don't know how to compile typescript)

## Pushing to another remote repository

1- Create a new repository in GitHub
2- grab the following commands from the README file:
`git remote add origin https://github.com/SilverX21/game-hub.git
git branch -M main
git push -u origin main`

## Setting up vercel for the project and deploying it to production
1- Run the commands in your project directory
2- after this, let's go to vercel and login
3- in my project, run the command `npm i -g vercel`
4- after vercel is installed, we must run this command to push this project to vercel: `vercel`
	- set up and deploy “C:\Cursos\game-hub”? -> carregar enter (Yes)
	- Which scope do you want to deploy to? (Use arrow keys)
		> Nuno's projects  -> carregar enter (Yes)
	- Link to existing project? -> enter (No)
	- What’s your project’s name? -> enter (aceita o default que aparecer na consola)
	- In which directory is your code located? -> enter (aceita o default que aparecer na consola)
	- Want to modify these settings? -> enter (No)
5- After we setup all of these, it will appear a link for production:
	- https://game-egx90mylu-nunos-projects-70cb57cf.vercel.app
	NOTE: the name could be different because there could be any other project in the world that could have the same name :)
	
## Linking the project in GitHub to Vercel
1- Go the your dashboard in vercel
2- In the project you want to link, click "Connected Git Repository"
3- In the options, select "GitHub"
4- Select the project refering to the project you set up in Vercel

After this, if we do any changes and push them to the repository, it will update this app in Vercel