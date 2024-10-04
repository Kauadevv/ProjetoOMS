from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import sqlite3

app = Flask(__name__)
app.secret_key = "777 1dph"

# Função para conectar ao banco de dados
def conectar_bd():
    return sqlite3.connect('usuarios.db')

# Verificar se o usuário está logado se não, ele vai para a tela de login
def usuario_logado():
    return 'username' in session

# Rota para a página inicial do site
@app.route('/')
def homepage():
    if usuario_logado():
        database = conectar_bd()
        cursor = database.cursor()
        cursor.execute("SELECT * FROM base_hc")
        head_count = cursor.fetchall()
        database.close()
        return render_template('homepage.html', username=session['username'], usuarios=head_count)

    return redirect(url_for('login'))

# Rota para a página de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if verificar_login(username, password):
            session['username'] = username
            return redirect(url_for('homepage'))
        else:
            return render_template('login.html', error='Usuário ou senha inválidos')
    return render_template('login.html')


# Rota para criar um novo usuário
@app.route('/criar_usuario', methods=['GET', 'POST'])
def criar_usuario():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if not verificar_usuario_existente(username):
            criar_novo_usuario(username, password)
            return redirect(url_for('login'))
        else:
            return render_template('criar_usuario.html', error='Nome de usuário já existe')
    return render_template('criar_usuario.html')


# Rota para a página de contatos
@app.route("/contatos")
def contatos():
    if usuario_logado():
        return render_template("contatos.html", username=session['username'])
    return redirect(url_for('login'))


# Rota para a página de usuários
@app.route("/usuarios/<nome_usuario>")
def usuarios(nome_usuario):
    if usuario_logado():
        return render_template("login.html", nome_usuario=nome_usuario, username=session['username'])
    return redirect(url_for('login'))

# rota para a pagina de picking
@app.route("/picking")
def picking():
    return render_template("picking.html")

# rota para a pagina de packing
@app.route("/packing")
def packing():
    return render_template("packing.html")

# Rota para logout
@app.route("/logout")
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/salvar', methods=['POST'])
def salvar_dados_tabela():
    try:
        dados = request.json
        print("Dados recebidos:", dados)

        if not isinstance(dados, list):
            return jsonify({'error': 'Os dados devem ser uma lista de objetos JSON'}), 400

        database = conectar_bd()
        cursor = database.cursor()

        for linha in dados:
            #print("Linha:", linha)
            try:
                cursor.execute('''INSERT INTO presenteismo (id_groot, nome, team_leader, processo_mae, presenteismo, processo_atual, percent_process) 
                                  VALUES (?, ?, ?, ?, ?, ?, ?)''',
                               (linha['id_groot'], linha['nome'], linha['team_leader'], linha['processo_mae'], linha['presenteismo'], linha['processo_atual'], linha['percent_process']))
            except Exception as e:
                print("Erro ao inserir linha:", str(e))
                database.rollback()
                return jsonify({'error': str(e)}), 500

        database.commit()
        database.close()

        return jsonify({'message': 'Dados salvos com sucesso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Função para verificar se um usuário já existe no banco de dados 
def verificar_usuario_existente(username):
    database = conectar_bd()
    cursor = database.cursor()
    cursor.execute("SELECT usuario FROM usuarios WHERE usuario = ?", (username,))
    user = cursor.fetchone()
    database.close()
    return user is not None

# Função para criar um novo usuário
def criar_novo_usuario(username, password):
    database = conectar_bd()
    cursor = database.cursor()
    cursor.execute("INSERT INTO usuarios (usuario, senha) VALUES (?, ?)", (username, password))
    database.commit()
    cursor.close()

# Função para verificar o login
def verificar_login(username, password):
    database = conectar_bd()
    cursor = database.cursor()
    cursor.execute("SELECT usuario FROM usuarios WHERE usuario = ? AND senha = ?", (username, password))
    user = cursor.fetchone()
    database.close()
    return user is not None

if __name__ == '__main__':
    app.run(debug=True)
