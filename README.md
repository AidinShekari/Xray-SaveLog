# Xray-SaveLog

## Overview

`Xray-SaveLog` is a utility designed to log user connection data from Xray Core. It automatically saves connection logs to a specified file.

## Features

- **Automatic Logging:** Logs connection details of users connected to Xray Core.

## Prerequisites

Before installing `Xray-SaveLog`, ensure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Xray Core](https://github.com/XTLS/Xray-core) (configured and running)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/AidinShekari/Xray-SaveLog.git
    cd Xray-SaveLog
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm start
    ```

    By default, the application will save user connection logs to `./root/vpndb.json`. Ensure that the `./root` directory exists and has the appropriate write permissions.

## Usage

Once the application is running, it will automatically start logging connection data to `./root/vpndb.json`.

## Other Projects
- [Xray-DiscordBot](https://github.com/AidinShekari/Xray-DiscordBot)
