function fetchCustom(url: string, key: string) {
    return async function(method: string, params: any) {
        const response = await fetch(url, {
         method: "POST", 
            headers: {
                "X-Auth": key,
                "Content-Type": "application/json",
        },

        body: JSON.stringify({
            "action": method,
            "params": params,
        }),
    });

    return response.json().then(arg => console.log(arg));
}
}

export { fetchCustom }