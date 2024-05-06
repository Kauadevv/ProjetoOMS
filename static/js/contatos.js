

        function logout() {
            window.location.href = "/logout";
        }

        function homepage() {
            window.location.href = "/";
        }

         function menu_lateral() {
            var menu = document.getElementById("menu");
            if (menu.style.left === "-250px") {
                menu.style.left = "0";
            } else {
                menu.style.left = "-250px";
            }
        }

        function fecharMenu() {
            var menu = document.getElementById("menu");
            menu.style.left = "-250px";
        }

