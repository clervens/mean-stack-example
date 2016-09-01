#!/bin/bash

echo "> Execution Post-Install script";
echo "> Changing directory to client folder (app_client)";
cd app_client;
echo;
echo "> Install client node packages";
npm i;
echo "> Compiling static files";
gulp build;
echo "> Postinstallation done";
