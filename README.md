This project is Node based back end app for AQMS.

## Requirement ##

NodeJS >= v12.16.1
MongoDB >= 4.2

## How to run ##

1. Clone the repo and enter project repo.
2. Instal NVM
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
3. Install node version 
```sh
nvm install v8.11.4
npm install pm2@4.2.3 -g
npm i
```
4. Install MongoDB
5. Add Database ESBHADB and `users` collection with below user entry
```
{
    "role":"Super Admin",
    "userName":"sudo",
    "password":"sudo123"
}
``` 
6. Run node command to start the app in development mode
```sh
npx shipit dev start:dev
```
7. Add Device in device management page
8. Use AQMS.postman_collection.json for add live data enrty

## Deplyment ##
```sh
npx shipit ENV deploy
npx shipit staging deploy
```