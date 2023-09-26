export const app_data_path = 
(
    process.env.APPDATA || 
    (
        process.platform == 'darwin' ? 
        process.env.HOME + '/Library/Preferences' : 
        process.env.HOME + "/.local/share"
    )
);

export const database_path = app_data_path + '/cover-calculator/Sqlite';
export const database_file = database_path + 'database.db';