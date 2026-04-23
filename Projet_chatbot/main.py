
import streamlit as st
from chatbot import ask_chatbot

st.sidebar.title("Menu")

st.title("Welcome to the GPT-3.5 Turbo chatbot!\n")

question = st.chat_input("Ta question")

if "conversations" not in st.session_state:
    st.session_state.conversations = {}

if "current_chat" not in st.session_state:
    st.session_state.current_chat = None
    
# afficher les messages
if question:

    # si aucun chat ouvert → créer un nouveau chat
    if st.session_state.current_chat is None:

        chat_name = question[:30] + "....."

        st.session_state.conversations[chat_name] = []

        st.session_state.current_chat = chat_name

    messages = st.session_state.conversations[st.session_state.current_chat]

    messages.append({
        "role": "user",
        "content": question
    })

    reponse = ask_chatbot(question)

    messages.append({
        "role": "assistant",
        "content": reponse
    })
    
    st.rerun()

    
if st.sidebar.button("New Chat"):
    st.session_state.current_chat = None
    
theme = st.sidebar.toggle("Mode sombre")


st.sidebar.write("Historique")
for chat in st.session_state.conversations:
    
    if st.sidebar.button(chat):
        st.session_state.current_chat = chat
        
    
if st.session_state.current_chat:
    messages = st.session_state.conversations[st.session_state.current_chat]

    for msg in messages:

        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])


