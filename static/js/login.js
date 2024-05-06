function letras_visiveis() {
    var senha = document.getElementById("password");
    var icone_olho = document.getElementById("olho-icone");

    if (senha.type === "password") {
        senha.type = "text";
        icone_olho.classList.remove("fa-eye");
        icone_olho.classList.remove("far"); // Removendo a classe 'far' (regular)
        icone_olho.classList.add("fa-eye-slash");
        icone_olho.classList.add("fas"); // Adicionando a classe 'fas' (sólido)
    } else {
        senha.type = "password";
        icone_olho.classList.remove("fa-eye-slash");
        icone_olho.classList.remove("fas"); // Removendo a classe 'fas' (sólido)
        icone_olho.classList.add("fa-eye");
        icone_olho.classList.add("far"); // Adicionando a classe 'far' (regular)
    }
}
