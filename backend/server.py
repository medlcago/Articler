from django.conf import settings
from waitress import serve

from config.wsgi import application

if __name__ == "__main__":
    port = getattr(settings, "PORT")
    serve(application, port=port)
