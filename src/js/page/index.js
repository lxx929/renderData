require(['../js/config.js'], () => {
    require(['ajax'], ($) => {
        init();


        function init() {
            ajax({
                url: '/api/getData',
                success: function(data) {
                    console.log(data.data);
                    if (data.code) {
                        render(data.data);
                        console.log(data)
                    }
                }
            });

            // let xhr = new XMLHttpRequest();
            // xhr.open('GET', '/api/getData', true);

            // xhr.onload = () => {
            //     if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            //         console.log(JSON.parse(xhr.responseText));
            //     }
            // }
            // xhr.send();
        }

        function render(data) {
            var html = "";
            data.forEach((item) => {
                html += ` <li>
                <p>${item.title}</p>
                <br>
                <img src="${item.img}" alt="">
                <br>
                <span>${item.price}</span>
            </li> `;
            });
            list.innerHTML = html;
        }

    });
});