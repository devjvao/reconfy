FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY ./requirements.txt /app/
COPY ./app /app

RUN pip install --no-cache-dir --upgrade -r requirements.txt

ENV PYTHONPATH "${PYTHONPATH}:/"
ENV PORT=8000
