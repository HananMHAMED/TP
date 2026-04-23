# Make sure you have the latest OpenAI library
# pip install --upgrade openai

import openai

# Set your API key

openai.api_key = "sk-...." # <-- replace with your key


# Define a system prompt (modifiable)
system_prompt = "You are an expert programming assistant that helps computer science students understand Python, algorithms, and debugging."

messages = [{"role": "system", "content": system_prompt}]

def ask_chatbot(question):
    # Chat loop
    
    messages.append({"role": "user", "content": question})

    # Create a chat completion using the new method
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7
    )

    
    # Extract and print the bot reply
    bot_reply = response.choices[0].message.content
    
    messages.append({"role": "assistant", "content": bot_reply})
    
    return bot_reply
    
    
