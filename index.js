const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const logFilePath = '/usr/local/x-ui/access.log';
const jsonFilePath = '/root/vpndb.json';

let logData = {};
let cleanedEmail = '';

if (fs.existsSync(jsonFilePath)) {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    logData = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading vpndb.json:', error);
  }
}

const watcher = chokidar.watch(logFilePath, {
  persistent: true,
});

watcher.on('change', () => {
  fs.readFile(logFilePath, 'utf8', (error, data) => {
    if (error) {
      console.error('Error reading X-UI access.log:', error);
    } else {
      const logLines = data.trim().split('\n');

      logLines.forEach((line) => {
        const timeMatch = line.match(/^(\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}:\d{2})/);
        const ipAndPortMatch = line.match(/(\d{1,3}\.){3}\d{1,3}/);
        const emailMatch = line.match(/email:\s*(\S+)/);

        if (timeMatch && ipAndPortMatch && emailMatch) {
          const time = timeMatch[0];
          const ip = ipAndPortMatch[0];
          const email = emailMatch[1];

          cleanedEmail = email.replace(/-R|-\d+$/, '');

          logData[cleanedEmail] = {
            time,
            ip,
          };
        }
      });

      fs.writeFile(jsonFilePath, JSON.stringify(logData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error saving log data to JSON:', err);
        } else {
          const reset = "\x1b[0m";
          const color = "\x1b[36m";
          console.log(`${color}${cleanedEmail}${reset} Log data saved to JSON file.`);
        }
      });
    }
  });
});

watcher.add(logFilePath);