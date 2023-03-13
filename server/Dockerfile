FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9

# Install cv2 dependencies
RUN apt-get update && \
    apt-get install ffmpeg libsm6 libxext6  -y

# Install dockerize for waiting other services to be available
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY ./requirements.txt /app/
COPY ./app /app
COPY ./model /model

RUN pip install --no-cache-dir --upgrade -r requirements.txt

ENV PYTHONPATH "${PYTHONPATH}:/"
ENV PORT=8000
