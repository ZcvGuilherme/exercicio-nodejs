from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def amigos():
    return render_template('amigos.html')

if __name__ == '__main__':
    app.run(debug=True)
