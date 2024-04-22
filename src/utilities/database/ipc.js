const electron = window.require('electron');

const { ipcRenderer } = electron;

//***********************************************
// send
//
// Send a query to the main process to be executed
// by the database.
//
// query - The query to be executed.
// params - array of parameters to be passed to the query.
//
// Returns a promise that resolves with the results of the query.
//
export default function send(query, params) 
{
    return new Promise((resolve, reject) => 
    {
        ipcRenderer.once('db-reply', (_, arg) => 
        {
            resolve(arg);
        });

        ipcRenderer.once('db-error', (_, arg) => 
        {
            reject(arg);
        });
        
        ipcRenderer.send('db-query', {query, params});
    });
}