export function getUrlParameter(paramKey: string): string | null {
    let sURLVariables;
    let i;
    let sParameterName;
    const sPageURL = window.location.search.substring(1);
    if (sPageURL) {
        sURLVariables = sPageURL.split('&');
        for (i = 0; i < sURLVariables.length; i += 1) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === paramKey) return sParameterName[1];
        }
    }
    return null;
}
