#!/usr/bin/env bash

echo "> Execution Post-Install script";
echo "> Changing directory to client folder (app_client)";
cd app_client;
echo;
echo "> Install client node packages";
npm install;
echo "> Compiling static files";
gulp build;
echo "> Removing unused node packages";
rm -rf node_modules;
echo "> Postinstallation done";
