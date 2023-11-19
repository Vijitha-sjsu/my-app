from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import sqlite3

# Database initialization function
def init_db():
    conn = sqlite3.connect('conversations.db')
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY,
            user_input TEXT,
            bot_response TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize the database
init_db()

app = Flask(__name__)
CORS(app)  

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    user_input = data['input']

    # Configure OpenAI
    openai.api_key = '' # Remved key as model gets disabled on pushing to Github due security reasons
    

    # Call OpenAI API
    try:
        response = openai.Completion.create(
            model='', # Remved model name as model gets disabled on pushing to Github due security reasons
            prompt=user_input,
            max_tokens=150
        )
        answer = response.choices[0].text.strip()

        # Save conversation to database
        conn = sqlite3.connect('conversations.db')
        cur = conn.cursor()
        cur.execute("INSERT INTO conversations (user_input, bot_response) VALUES (?, ?)", 
                    (user_input, answer))
        conn.commit()
        conn.close()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
  
