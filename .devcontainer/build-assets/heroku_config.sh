#!/bin/bash
# Script to allow Heroku API key to be pasted
# and exported as an environment variable
#
# Matt Rudge, May 2021

echo "Heroku authentication configuration script"
echo "Code Institute, 2021"
echo
echo "Get your Heroku API key by going to https://dashboard.heroku.com"
echo "Go to Account Settings and click on Reveal to view your Heroku API key"
echo 

if [[ -z "${HEROKU_API_KEY}" ]]; then
    echo "Paste your Heroku API key here or press Enter to quit:"
    read -r apikey
    if [[ -z "${apikey}" ]]; then
        echo "No API key provided. Exiting."
        exit 0
    fi
    
    # Simple validation for the API key (length check)
    if [[ ${#apikey} -lt 20 ]]; then
        echo "Invalid API key. Please check and try again."
        exit 1
    fi

    # Check if HEROKU_API_KEY is already in ~/.bashrc
    if ! grep -q "export HEROKU_API_KEY=" ~/.bashrc; then
        echo "export HEROKU_API_KEY=${apikey}" >> ~/.bashrc
    else
        sed -i "s|export HEROKU_API_KEY=.*|export HEROKU_API_KEY=${apikey}|" ~/.bashrc
    fi
    
    echo "Added the export. Please run 'source ~/.bashrc' in your terminal to refresh the environment."
    echo "Done!"
else
    echo "API key is already set."
    echo
    echo "To reset the API key, please input 'reset':"
    read -r reset_trigger
    if [[ ${reset_trigger} == reset ]]; then
        unset HEROKU_API_KEY
        echo "API key removed!"
    else
        echo "API key unchanged."
    fi
    echo
    echo "Exiting"
fi
