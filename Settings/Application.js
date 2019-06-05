export const connectionDetails = {
    url: "http://server.unique-apps.de",
    port: 9006
};

export function getRoute(route) {
    return connectionDetails.url + ":" + connectionDetails.port + "/" + route;
}
