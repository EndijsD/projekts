const localProtocol = 'http';
const localHostname = 'localhost';
const localPort = '3001';
const localURL = localProtocol + '://' + localHostname + ':' + localPort + '/';

const liveProtocol = 'https';
const liveHostname = 'system-server.up.railway.app';
const liveURL = liveProtocol + '://' + liveHostname + '/';

const useLocalServer = true;

const url = useLocalServer ? localURL : liveURL;

export default url;
