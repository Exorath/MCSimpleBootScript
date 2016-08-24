/*Copyright 2016 Exorath

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

var fs = require('fs-extra');
var argv = require('minimist')(process.argv.slice(2));

var global_config = JSON.parse(fs.readFileSync(argv["global"] || "../config.json"));
var config = JSON.parse(fs.readFileSync(argv["config"] || "config.json"));

var min_ram = config["mem_min"] || 512;
console.log("min ram: " + min_ram);
var max_ram = config["mem_max"] || 1024;
console.log("max ram: " +  max_ram);
var jar = config["jar"] || "spigot.jar";
var server_dir = config["server_dir"] || "./";
console.log("server dir: " + server_dir);
var copy_plugins = config["copy_plugins"] || true;

var jars_dir = global_config["jars_dir"] || "../jars/";
console.log("jars dir: " + jars_dir);
var plugins_dir = global_config["plugins_dir"] || "../plugins/";
console.log("plugins dir" + plugins_dir);

console.log("Trying to copy jar from " + jars_dir + jar + " to " + server_dir + jar);
fs.copySync(jars_dir + jar, server_dir + jar);
console.log("Copied jar!");
if(copy_plugins){
  console.log("Trying to remove plugins in " + server_dir + "plugins/") ;
  fs.ensureDirSync(server_dir + "plugins/");
  var fileNames = fs.readdirSync(server_dir + "plugins/");
  for(var i in fileNames){
    var fileName = fileNames[i];
    if(fileName.endsWith(".jar")){
      fs.unlinkSync(server_dir + "plugins/" + fileName);
      console.log("Removed: " + fileName + " successfully");
    }
  }
  console.log("All plugins removed.");
  console.log("Trying to copy plugins in " + plugins_dir);
  var fileNames = fs.readdirSync(plugins_dir);
  for(var i in fileNames){
    var fileName = fileNames[i];
    fs.copy(plugins_dir + fileName, server_dir + "plugins/" + fileName);
    console.log("Copied: " + fileName);
  }
  console.log("All plugins copied");
}else
  console.log("Global plugins ignored.");
startServer();

function startServer(){
console.log("Starting server...");
var spawn = require("child_process");
//var child = spawn.spawnSync('java -Xms' + min_ram +  "m" + " -Xmx" + max_ram + "m -jar " + server_dir + jar, [], { stdio:'inherit'});
var child = spawn.spawn('java', ['-Xms' + min_ram + "m", "-Xmx" + max_ram + "m", "-jar", server_dir + jar], {cwd: server_dir, stdio: 'inherit'});
child.on('close', (code) => {
  console.log("Restartin server...");
  startServer();
});
}
