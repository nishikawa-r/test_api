const params = { // 渡したいパラメータをJSON形式で書く
    licens: "1",
};

const query_params = new URLSearchParams(params);
fetch('http://localhost:8000/api/licens?' + query_params)
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
