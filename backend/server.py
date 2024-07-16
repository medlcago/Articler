from waitress import serve

from config.settings import PORT
from config.wsgi import application

if __name__ == "__main__":
    serve(application, port=PORT)
