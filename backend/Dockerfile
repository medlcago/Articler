FROM python:3.11
WORKDIR /backend

RUN mkdir /backend/static && mkdir /backend/media

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "server.py"]