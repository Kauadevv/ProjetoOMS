document.addEventListener("DOMContentLoaded", function() {
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirm_password");

    function validatePassword() {
        if (password.value !== confirm_password.value) {
            confirm_password.setCustomValidity("As senhas não coincidem");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.addEventListener('input', validatePassword);
    confirm_password.addEventListener('input', validatePassword);
});
