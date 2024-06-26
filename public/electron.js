const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { dialog } = require('electron');

const icon_path = path.join(__dirname, 'favicon.ico');

function createWindow() 
{
    const win = new BrowserWindow(
    {
        width: 800,
        height: 600,
        minWidth: 450,
        minHeight: 500,
        webPreferences: 
        {
            nodeIntegration: true,
            contextIsolation: false
        },
        autoHideMenuBar: true,
        icon: icon_path,
    });

    win.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    if (isDev) 
    {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', () => 
{
    if (BrowserWindow.getAllWindows().length === 0) 
    {
        createWindow();
    }
});

const app_data_path = 
(
    process.env.APPDATA || 
    (
        process.platform == 'darwin' ? 
        process.env.HOME + '/Library/Preferences' : 
        process.env.HOME + "/.local/share"
    )
);

const database_path = app_data_path + '/cover-calculator/Sqlite/';
const database_file = database_path + 'database.db';

if (!fs.existsSync(database_path))
{
    console.log("Database path " 
    + database_path + 
    " didn't exist, creating it now.");

    fs.mkdirSync(database_path, { recursive: true });
}

const database = new sqlite3.Database(database_file);

ipcMain.on('db-query', (event, {query, params}) => 
{
    database.all(query, params, (error, rows) =>
    {
        if (error)
        {
            event.reply('db-error', error);
            return;
        }

        event.reply('db-reply', rows);
    });
});

//***********************************************
// This SQL command inserts a test user into the database.
// It is only used for testing purposes.
//
const insert_test_user = 
'INSERT OR REPLACE INTO customers (\
    zipcode,\
    state,\
    city,\
    address,\
    email,\
    last_name,\
    first_name,\
    id\
)\
VALUES (\
    97502,\
    \'OR\',\
    \'Central Point\',\
    \'557 Blue Heron Dr.\',\
    \'bryceschultz@live.com\',\
    \'Schultz\',\
    \'Bryce\',\
    0 \
);';

//***********************************************
// This object represents the tables in the database.
// It has a create property that contains the SQL to create the table.
// Future: add additional properties for easy access to other SQL commands.
//
const tables = 
{
    customers: 
    {
        create: 
            'CREATE TABLE IF NOT EXISTS customers (                         \
            id          INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,  \
            first_name  TEXT NOT NULL,                                      \
            last_name   TEXT,                                               \
            email       TEXT,                                               \
            address     TEXT,                                               \
            city        TEXT,                                               \
            state       TEXT,                                               \
            zipcode     TEXT                                                \
        );'
    },
    covers: 
    {
        create:
        'CREATE TABLE IF NOT EXISTS covers (                                                \
            id              INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,              \
            customer_id     INTEGER NOT NULL REFERENCES customers (id) ON DELETE CASCADE,   \
            purchase_date   TEXT,                                                           \
            type            INTEGER NOT NULL DEFAULT standard,                              \
            model           TEXT    DEFAULT none,                                           \
            length          INTEGER,                                                        \
            width           INTEGER,                                                        \
            corner_radius   INTEGER,                                                        \
            panel_count     INTEGER,                                                        \
            radius          INTEGER,                                                        \
            size_difference INTEGER,                                                        \
            color           TEXT    DEFAULT mineral,                                        \
            airs            INTEGER DEFAULT (0),                                            \
            in_ground       INTEGER DEFAULT (0)                                             \
        );'
    }
}

// Create the tables if they don't exist.
database.exec(tables.customers.create, (error) => 
{
    // If there was an error, log it and exit the process, this is fatal.
    if (error)
    {
        console.log("Error creating customers table:\n", error);
        dialog.showErrorBox('Error', 'Could not create customers table.') ;
        app.quit();
    }
});

database.exec(tables.covers.create, (error) => 
{
    // If there was an error, log it and exit the process, this is fatal.
    if (error)
    {
        console.log("Error creating covers table:\n", error);
        dialog.showErrorBox('Error', 'Could not create covers table.') ;
        app.quit();
    }
});

// Insert a test user.
// database.exec(insert_test_user);