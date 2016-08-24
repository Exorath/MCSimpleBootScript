# MCSimpleBootScript
_This script is EXTREMELY hard coded, it was a quick hack to get our build server going. You should not use it honnestly, it's public so we have easy, unauthenticated access to the script._

Note that you'll have to install some npm dependencies.
##Getting started?
1. Clone this repository in a folder of your liking
2. Place all your jars under ./jars
3. Place all your plugins under ./plugins
4. Edit the filepaths in config.json

##Adding a server
1. mkdir {server_dir}
2. copy the config of the sample server to the newly created dir
3. modify the server_dir and possibly other settings in the config
4. go back to the root dir
5. create a file <server_name>.sh (replace the config path to the copied config:
5.1. node app.js --config="{CONFIGPATH}" --global="config.json"
6. starting the server is as simple as running the <server_name>.sh, make sure to do it in it's own screen
