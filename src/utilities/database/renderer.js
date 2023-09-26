const electron = window.require('electron');

const { ipcRenderer } = electron;

export default function send(query, params) 
{
    return new Promise((resolve) => 
    {
        ipcRenderer.once('db-reply', (_, arg) => 
        {
            resolve(arg);
        });
        
        ipcRenderer.send('db-query', {query, params});
    });
}