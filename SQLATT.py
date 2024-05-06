import sqlite3

# Conectar ao banco de dados
database = sqlite3.connect("usuarios.db")
cursor = database.cursor()

cursor.execute("update base_hc set id_groot = Null, nome = 'teste', empresa = 'x' where nome = 'Luiz Oliveira'")

'''cursor.execute("select * from usuarios")
dados = cursor.fetchall()
for dado in dados:
    print(dado)'''

database.commit()
database.close()
